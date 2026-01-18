from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from database import get_db
from models import User
from auth_utils import get_password_hash, verify_password, create_access_token, generate_otp, send_otp_email

router = APIRouter(prefix="/auth", tags=["authentication"])

# Schemas
class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class VerifyOTP(BaseModel):
    email: EmailStr
    otp: str

# Routes
@router.post("/signup")
def signup(user: UserSignup, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pw = get_password_hash(user.password)
    # Create user but maybe they need to verify first? 
    # For this task: "all new sign in are User role by default". 
    # Let's create them, but require OTP for initial login or immediately verify?
    # Requirement: "2 factor in both login and sign in"
    # Logic: Validate Signup -> Send OTP -> (Verify -> Token)
    
    new_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_pw,
        role="user",
        otp_code=generate_otp()
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Send OTP
    send_otp_email(new_user.email, new_user.otp_code)
    
    return {"message": "User created. Please verify OTP sent to email.", "email": user.email}

@router.post("/login")
def login(creds: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == creds.email).first()
    if not user or not verify_password(creds.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Generate and save OTP
    otp = generate_otp()
    user.otp_code = otp
    db.commit()
    
    # Send OTP
    send_otp_email(user.email, otp)
    
    return {"message": "OTP sent to email", "email": user.email}

@router.post("/verify-otp")
def verify_otp(data: VerifyOTP, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.otp_code != data.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")
    
    # Clear OTP
    user.otp_code = None
    db.commit()
    
    # Create Token
    access_token = create_access_token(data={"sub": user.email, "role": user.role, "name": user.name})
    
    return {"access_token": access_token, "token_type": "bearer", "user": {"name": user.name, "email": user.email, "role": user.role}}
