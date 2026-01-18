# 🔐 Authentication

> Two-Factor Authentication (2FA) with JWT and OTP

---

## Overview

MCP Security AI implements a secure two-factor authentication system:

1. **Primary Factor**: Email + Password
2. **Secondary Factor**: One-Time Password (OTP) sent via email

---

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        AUTHENTICATION FLOW                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────┐         ┌──────────┐         ┌──────────┐                │
│  │  Client  │         │  Server  │         │  Email   │                │
│  └────┬─────┘         └────┬─────┘         └────┬─────┘                │
│       │                    │                    │                       │
│       │  POST /auth/login  │                    │                       │
│       │ ──────────────────►│                    │                       │
│       │                    │                    │                       │
│       │                    │  Send OTP Email    │                       │
│       │                    │ ──────────────────►│                       │
│       │                    │                    │                       │
│       │ {message: "OTP.."}│                    │                       │
│       │ ◄──────────────────│                    │                       │
│       │                    │                    │                       │
│       │  POST /verify-otp  │                    │                       │
│       │ ──────────────────►│                    │                       │
│       │                    │                    │                       │
│       │ {access_token:...} │                    │                       │
│       │ ◄──────────────────│                    │                       │
│       │                    │                    │                       │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## User Roles

| Role | Description | Permissions |
|:-----|:------------|:------------|
| `user` | Standard user | Access dashboard, run scans |
| `admin` | Administrator | All user permissions + admin panel |

> **Note**: All new users are assigned the `user` role by default.

---

## JWT Token Structure

The JWT token contains the following claims:

```json
{
  "sub": "user@example.com",
  "role": "user",
  "name": "John Doe",
  "exp": 1704931200
}
```

| Claim | Description |
|:------|:------------|
| `sub` | Subject (user email) |
| `role` | User role |
| `name` | User's display name |
| `exp` | Expiration timestamp |

---

## Signup Flow

### Step 1: Register User

```bash
curl -X POST http://localhost:54321/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

**Response:**
```json
{
  "message": "User created. Please verify OTP sent to email.",
  "email": "john@example.com"
}
```

### Step 2: Verify OTP

Check your email for the OTP code, then:

```bash
curl -X POST http://localhost:54321/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "otp": "123456"
  }'
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

## Login Flow

### Step 1: Authenticate

```bash
curl -X POST http://localhost:54321/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

**Response:**
```json
{
  "message": "OTP sent to email",
  "email": "john@example.com"
}
```

### Step 2: Verify OTP

Same as signup flow - verify with the OTP sent to your email.

---

## Using the Token

Include the JWT token in the `Authorization` header:

```bash
curl -X GET http://localhost:54321/protected-endpoint \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## OTP Configuration

The OTP system uses SMTP for email delivery. Configure in your `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

---

## Security Considerations

| Feature | Implementation |
|:--------|:---------------|
| Password Hashing | bcrypt with salt |
| Token Algorithm | HS256 (HMAC-SHA256) |
| OTP Length | 6 digits |
| OTP Validity | Single use, cleared after verification |

---

## Database Schema

### Users Table

| Column | Type | Description |
|:-------|:-----|:------------|
| `id` | INTEGER | Primary key |
| `name` | VARCHAR | User's name |
| `email` | VARCHAR | Unique email address |
| `hashed_password` | VARCHAR | Bcrypt password hash |
| `role` | VARCHAR | User role (`user`/`admin`) |
| `otp_code` | VARCHAR | Temporary OTP code |

---

<div align="center">

[← API Reference](./README.md) | [WebSocket API →](./websocket.md)

</div>
