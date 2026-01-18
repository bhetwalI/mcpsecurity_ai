# UFCE8A-30-3 Cyber Security Project
# Progress Review – December

---

## Student Information

| Field | Details |
|-------|---------|
| **Student Name** | Rohan Ghimire |
| **Student Number** | [STUDENT NUMBER] |
| **Date of Review** | 15th December 2025 |
| **Supervisor Name** | [SUPERVISOR NAME] |
| **Project Title** | MCP Security Tool: Automated Red-Teaming and Vulnerability Auditing for AI Assistants using Model Context Protocol |

---

## 1. Project Overview

The MCP Security Tool is an automated red-teaming framework designed to audit the security of AI assistants using the Model Context Protocol (MCP). The tool focuses on detecting critical vulnerabilities including:

- **Prompt Injections** – Malicious inputs designed to override system instructions
- **Data Leaks** – Unauthorized disclosure of sensitive information (API keys, PII, database URIs)
- **Safety Bypasses** – Techniques to circumvent AI safety guardrails

The framework employs automated attack mutation and multi-turn simulations to provide comprehensive security assessments.

---

## 2. Progress To Date

### 2.1 Literature Review ✅ Complete
- Completed comprehensive research into prompt injection attack vectors and jailbreaking techniques
- Identified and analysed key academic papers:
  - Perez & Ribeiro (2022) – *"Ignore Previous Instructions": Trojan Attacks on Transformers*
  - Greshake et al. (2023) – *Compromising LLM-Integrated Applications with Indirect Prompt Injection*
- Reviewed existing security tools and identified gaps in MCP-based testing

### 2.2 Requirements Analysis ✅ Complete
- Defined functional requirements for attack generation, real-time analysis, and user management
- Documented non-functional requirements including performance, extensibility, and usability
- Created user stories for security analysts and researchers

### 2.3 System Design ✅ Complete
- Designed high-level system architecture:
  - **Backend:** FastAPI (Python) for core logic and API
  - **Frontend:** Next.js with Tailwind CSS for dashboard
  - **Database:** SQLite for user management and scan history
  - **Communication:** WebSockets for real-time updates
- Created data models for Users, Scans, and Results

### 2.4 Implementation Status

| Component | Status | Details |
|-----------|--------|---------|
| **Scanner Module** (`scanner.py`) | ✅ Complete | Core scanning logic with multiple modes (random, CSV, multi-turn, mock) |
| **Analyzer Module** (`analyzer.py`) | ✅ Complete | Regex-based detection for 20+ sensitivity categories (API keys, passwords, PII) |
| **LLM Client** (`llm_client.py`) | ✅ Complete | Integration with LM Studio for local model testing |
| **Prompt Generator** (`prompt_generator.py`) | ✅ Complete | Mutated attack generation with social engineering templates |
| **Mock MCP Server** (`mock_mcp.py`) | ✅ Complete | Testing infrastructure without live LLM calls |
| **Backend API** (`server.py`) | ✅ Complete | FastAPI server with WebSocket support |
| **Frontend Dashboard** | 🔄 In Progress | Next.js skeleton with authentication (JWT + OTP) |
| **Scan History Visualization** | 🔄 In Progress | Charts and trend analysis components |

---

## 3. Key Milestones Achieved

| # | Milestone | Date Achieved |
|---|-----------|---------------|
| 1 | Successful integration of Model Context Protocol (MCP) for tool interaction | 28th November 2025 |
| 2 | Real-time leak detection using regex-based analyzer | 5th November 2025 |
| 3 | Functional Multi-Turn Simulation engine | 25th November 2025 |
| 4 | User authentication flow with dual-factor (OTP) verification | 1st December 2025 |
| 5 | WebSocket-based real-time frontend updates | 8th December 2025 |

---

## 4. Challenges Encountered

### 4.1 JSON Parsing Issues
**Problem:** Local LLMs (via LM Studio) frequently returned responses with reasoning tags (`<think>...</think>`) that broke standard JSON parsers.

**Solution:** Implemented a robust "reasoning-aware" parser in `llm_client.py` that:
- Strips reasoning tags before JSON extraction
- Handles malformed JSON gracefully with fallback parsing
- Logs raw responses for debugging purposes

### 4.2 WebSocket Connection Stability
**Problem:** WebSocket connections dropped during long-running scans (100+ test cases), causing frontend to lose real-time updates.

**Solution:** 
- Implemented proper connection lifecycle management in FastAPI
- Added automatic reconnection logic in the frontend
- Used background tasks for long-running operations to prevent timeout

### 4.3 Attack Mutation Quality
**Problem:** Initial attack mutations were too simple and easily filtered by basic AI safety measures.

**Solution:** Enhanced the `prompt_generator.py` with:
- Multiple mutation strategies (technical payload, social engineering, authority exploitation)
- Layered obfuscation techniques
- Context-aware prompt construction

---

## 5. Ethical Approval Status

| Item | Status |
|------|--------|
| Pre-Ethics Checklist submitted | ✅ Complete (25th November 2025) |
| Discussed with Supervisor | ✅ Complete (22nd November 2025) |
| Security Sensitive Classification | 🔄 Awaiting final sign-off |
| Formal Ethical Approval Required | NO (No human participants) |

---

## 6. Feedback and Reflection

### Supervisor Feedback
- Suggested focusing more on **Multi-Turn attacks** as they are less explored in current academic literature
- Recommended adding a **"Deep Reasoning (Judge)"** feature to analyze *why* a model failed a security check, enhancing report quality
- Positive feedback on the comprehensive regex-based analyzer

### Self-Reflection
- The decision to pivot from a simple fuzzer to a full MCP-based framework was correct but added significant complexity
- Time management has been challenging while balancing implementation with documentation
- Early integration of WebSockets was beneficial for demonstrating value to stakeholders

---

## 7. Plans for the Next Phase

| # | Task | Target Date | Priority |
|---|------|-------------|----------|
| 1 | Expand attack dataset with CSV-based audits | 22nd December 2025 | High |
| 2 | Implement comprehensive reporting (PDF/CSV export) | 28th December 2025 | High |
| 3 | Finalize Frontend Dashboard with visualizations | 5th January 2026 | High |
| 4 | Conduct large-scale benchmarks against multiple models | 15th January 2026 | Medium |
| 5 | Complete Final Report documentation | 20th January 2026 | High |
| 6 | Prepare demonstration walkthrough | 22nd January 2026 | Medium |

---

## 8. Appendix: Repository Statistics

| Metric | Value |
|--------|-------|
| **Total Commits** | 45+ |
| **Lines of Code (Backend)** | ~2,500 |
| **Lines of Code (Frontend)** | ~1,500 |
| **Test Cases Written** | 25 |
| **Attack Patterns Implemented** | 15+ |

---

**Student Signature:** ___________________________ Date: _______________

**Supervisor Signature:** ___________________________ Date: _______________

---

## For Supervisor Use Only

| Criteria | Rating (1-5) | Comments |
|----------|--------------|----------|
| Progress against plan | | |
| Quality of work | | |
| Initiative and independence | | |
| Communication and professionalism | | |

**Overall Assessment:** Pass / Concern / Fail

**Supervisor Signature:** ___________________________ Date: _______________
