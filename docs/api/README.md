# 🌐 API Reference

> Complete REST & WebSocket API documentation for MCP Security AI

---

## 📡 Base URL

```
http://localhost:54321
```

---

## 🔐 Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

---

## 📋 Endpoints Overview

| Endpoint | Method | Auth | Description |
|:---------|:-------|:----:|:------------|
| [`/`](#get-) | GET | ❌ | Health check |
| [`/auth/signup`](#post-authsignup) | POST | ❌ | User registration |
| [`/auth/login`](#post-authlogin) | POST | ❌ | User login |
| [`/auth/verify-otp`](#post-authverify-otp) | POST | ❌ | OTP verification |
| [`/ws/scan`](#websocket-wsscan) | WebSocket | ❌ | Real-time scanning |

---

## Health Check

### `GET /`

Returns the API status.

#### Request

```bash
curl http://localhost:54321/
```

#### Response

```json
{
  "status": "MCP Security Tool API is running"
}
```

| Field | Type | Description |
|:------|:-----|:------------|
| `status` | string | API status message |

---

## Authentication Endpoints

> 📖 See [Authentication Documentation](./authentication.md) for detailed auth flow.

### `POST /auth/signup`

Register a new user account.

#### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

| Field | Type | Required | Description |
|:------|:-----|:--------:|:------------|
| `name` | string | ✅ | User's full name |
| `email` | string | ✅ | Valid email address |
| `password` | string | ✅ | Password (min 8 chars recommended) |

#### Response (201 Created)

```json
{
  "message": "User created. Please verify OTP sent to email.",
  "email": "john@example.com"
}
```

#### Errors

| Status | Description |
|:-------|:------------|
| `400` | Email already registered |

---

### `POST /auth/login`

Authenticate user and trigger OTP sending.

#### Request Body

```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Response (200 OK)

```json
{
  "message": "OTP sent to email",
  "email": "john@example.com"
}
```

#### Errors

| Status | Description |
|:-------|:------------|
| `401` | Invalid credentials |

---

### `POST /auth/verify-otp`

Verify OTP and receive JWT access token.

#### Request Body

```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

#### Response (200 OK)

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

| Field | Type | Description |
|:------|:-----|:------------|
| `access_token` | string | JWT token for authenticated requests |
| `token_type` | string | Always `"bearer"` |
| `user` | object | User profile information |
| `user.name` | string | User's name |
| `user.email` | string | User's email |
| `user.role` | string | User role (`"user"` or `"admin"`) |

#### Errors

| Status | Description |
|:-------|:------------|
| `400` | Invalid OTP |
| `404` | User not found |

---

## WebSocket API

### `WebSocket /ws/scan`

Real-time security scanning endpoint.

> 📖 See [WebSocket Documentation](./websocket.md) for detailed protocol.

#### Connection

```javascript
const ws = new WebSocket('ws://localhost:54321/ws/scan');
```

#### Message Flow

```
Client ──[Scan Config]──► Server
Server ──[Status]──────► Client
Server ──[Results]─────► Client (multiple)
Server ──[Complete]────► Client
```

---

## Response Codes

| Code | Status | Description |
|:-----|:-------|:------------|
| `200` | OK | Request successful |
| `201` | Created | Resource created |
| `400` | Bad Request | Invalid input data |
| `401` | Unauthorized | Invalid credentials |
| `404` | Not Found | Resource not found |
| `500` | Internal Server Error | Server error |

---

## Rate Limiting

Currently no rate limiting is implemented. For production deployments, consider adding rate limiting middleware.

---

<div align="center">

[← Back to Index](../index.md) | [Authentication →](./authentication.md)

</div>
