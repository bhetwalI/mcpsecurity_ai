<div align="center">

# 📚 MCP Security AI Documentation

### Complete Technical Reference & API Documentation

---

</div>

## 📖 Documentation Index

Welcome to the **MCP Security AI** documentation. This comprehensive guide covers all aspects of the framework, from API endpoints to core module references.

---

## 🗂️ Table of Contents

| Section | Description |
|:--------|:------------|
| [API Reference](./api/README.md) | REST & WebSocket API endpoints |
| [Authentication](./api/authentication.md) | Auth endpoints, JWT, OTP verification |
| [WebSocket API](./api/websocket.md) | Real-time scanning WebSocket protocol |
| [Core Modules](./modules/README.md) | Scanner, Analyzer, LLM Client documentation |
| [Configuration](./guides/configuration.md) | Environment variables & setup |
| [Attack Categories](./guides/attack-categories.md) | Understanding attack types |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           MCP SECURITY AI                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐     │
│  │   Frontend UI   │◄──►│   FastAPI       │◄──►│   LLM Engine    │     │
│  │   (Next.js)     │    │   Backend       │    │  (LM Studio)    │     │
│  │   Port: 3000    │    │   Port: 54321   │    │  Port: 1234     │     │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘     │
│           │                     │                      │               │
│           │              ┌──────┴──────┐               │               │
│           │              │             │               │               │
│           ▼              ▼             ▼               ▼               │
│  ┌────────────┐  ┌────────────┐  ┌──────────┐  ┌────────────┐         │
│  │ Dashboard  │  │  Scanner   │  │ Analyzer │  │   Judge    │         │
│  │    UI      │  │  Engine    │  │  Module  │  │   (AI)     │         │
│  └────────────┘  └────────────┘  └──────────┘  └────────────┘         │
│                         │                             │               │
│                         ▼                             ▼               │
│                  ┌────────────┐              ┌────────────┐           │
│                  │  Prompt    │              │  SQLite    │           │
│                  │ Generator  │              │  Database  │           │
│                  └────────────┘              └────────────┘           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Links

### For Developers

- **[API Reference](./api/README.md)** - Complete REST API documentation
- **[WebSocket Protocol](./api/websocket.md)** - Real-time scan communication
- **[Module Reference](./modules/README.md)** - Core Python modules

### For Users

- **[Configuration Guide](./guides/configuration.md)** - Setup and environment
- **[Attack Categories](./guides/attack-categories.md)** - Understanding security tests

---

## 📊 API Overview

| Endpoint | Method | Description |
|:---------|:-------|:------------|
| `/` | GET | Health check |
| `/auth/signup` | POST | User registration |
| `/auth/login` | POST | User login (triggers OTP) |
| `/auth/verify-otp` | POST | Verify OTP & get JWT token |
| `/ws/scan` | WebSocket | Real-time security scanning |

---

## 🔧 Technology Stack

| Component | Technology | Purpose |
|:----------|:-----------|:--------|
| **Backend** | FastAPI | REST API & WebSocket server |
| **Frontend** | Next.js 14 | Dashboard UI |
| **Database** | SQLite + SQLAlchemy | User management |
| **Authentication** | JWT + OTP | Secure access control |
| **LLM Integration** | OpenAI-compatible API | Attack simulation |
| **AI Judge** | LLM-based analysis | Deep reasoning security analysis |

---

## 📁 Project Structure

```
mcpsecurity_ai/
├── docs/                    # 📚 Documentation (you are here)
│   ├── api/                 # API reference docs
│   ├── modules/             # Module documentation
│   └── guides/              # User guides
├── server.py                # FastAPI main server
├── routers/                 # API route handlers
│   └── auth.py              # Authentication routes
├── scanner.py               # Core scanning engine
├── analyzer.py              # Response analysis
├── llm_client.py            # LLM integration
├── prompt_generator.py      # Attack generation
├── models.py                # Database models
├── database.py              # SQLAlchemy config
└── frontend/                # Next.js dashboard
```

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

**[Back to GitHub](https://github.com/bhetwalI/mcpsecurity_ai)**

</div>
