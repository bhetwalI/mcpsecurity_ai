# ⚙️ Configuration Guide

> Environment setup and configuration options

---

## Environment Variables

Create a `.env` file in the project root:

```env
# LLM Configuration
LLM_BASE_URL=http://localhost:1234/v1
LLM_MODEL=qwen3-4b
OPENAI_API_KEY=lm-studio
JUDGE_MODEL=qwen3-4b

# Optional: Google Gemini
GEMINI_API_KEY=your-gemini-api-key

# JWT Configuration
SECRET_KEY=your-super-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# SMTP Configuration (for OTP emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

---

## LLM Backend Options

### Option 1: LM Studio (Recommended for Local)

1. Download [LM Studio](https://lmstudio.ai/)
2. Load a model (e.g., Qwen 3 4B)
3. Start the local server on port 1234

```env
LLM_BASE_URL=http://localhost:1234/v1
LLM_MODEL=your-model-id
OPENAI_API_KEY=lm-studio
```

### Option 2: Ollama

1. Install [Ollama](https://ollama.ai/)
2. Pull a model: `ollama pull llama2`
3. Start Ollama

```env
LLM_BASE_URL=http://localhost:11434/v1
LLM_MODEL=llama2
OPENAI_API_KEY=ollama
```

### Option 3: Google Gemini (Cloud)

1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Use a Gemini model name

```env
GEMINI_API_KEY=your-gemini-api-key
LLM_MODEL=gemini-1.5-flash
JUDGE_MODEL=gemini-1.5-flash
```

### Option 4: OpenAI (Cloud)

```env
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4-turbo-preview
OPENAI_API_KEY=sk-your-openai-key
```

---

## Configuration Reference

### LLM Settings

| Variable | Description | Default |
|:---------|:------------|:--------|
| `LLM_BASE_URL` | LLM API endpoint | `http://localhost:11434/v1` |
| `LLM_MODEL` | Model identifier | `tinyllama` |
| `OPENAI_API_KEY` | API authentication key | `ollama` |
| `JUDGE_MODEL` | Model for AI judge (can be more powerful) | Same as `LLM_MODEL` |
| `GEMINI_API_KEY` | Google Gemini API key | None |

### JWT Settings

| Variable | Description | Default |
|:---------|:------------|:--------|
| `SECRET_KEY` | JWT signing secret | ⚠️ **Must be set** |
| `ALGORITHM` | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token validity period | `30` |

### SMTP Settings

| Variable | Description | Example |
|:---------|:------------|:--------|
| `SMTP_HOST` | Mail server hostname | `smtp.gmail.com` |
| `SMTP_PORT` | Mail server port | `587` |
| `SMTP_USER` | SMTP username/email | `you@gmail.com` |
| `SMTP_PASSWORD` | SMTP password/app password | `xxxx-xxxx-xxxx` |

---

## Gmail App Password Setup

For Gmail SMTP:

1. Enable 2-Factor Authentication on your Google account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Use this 16-character password as `SMTP_PASSWORD`

---

## Port Configuration

| Service | Default Port | Description |
|:--------|:------------:|:------------|
| Backend API | `54321` | FastAPI server |
| Frontend | `3000` | Next.js dev server |
| LM Studio | `1234` | Local LLM |
| Ollama | `11434` | Ollama API |

---

## Running the Application

### Backend

```bash
# Install dependencies
pip install -r requirements.txt

# Start server
python server.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Production Considerations

> ⚠️ **Security Warning**: The following settings need attention for production:

### CORS Configuration

In `server.py`, restrict CORS origins:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],  # Not "*"
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Authorization", "Content-Type"],
)
```

### Secret Key

Generate a strong secret key:

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

### Database

Consider migrating from SQLite to PostgreSQL for production:

```python
SQLALCHEMY_DATABASE_URL = "postgresql://user:pass@localhost/dbname"
```

---

<div align="center">

[← Modules](../modules/README.md) | [Attack Categories →](./attack-categories.md)

</div>
