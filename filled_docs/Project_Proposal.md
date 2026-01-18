# UFCE8A-30-3 Cyber Security Project
# Project Proposal Form

---

## Student Information

| Field | Details |
|-------|---------|
| **Module** | UFCE8A-30-3 Cyber Security Project |
| **Student Name** | Rohan Ghimire |
| **Student Number** | [STUDENT NUMBER] |
| **Student Email** | [STUDENT EMAIL]@uwe.ac.uk |
| **Supervisor** | [SUPERVISOR NAME] |
| **Date** | 20th October 2025 |

---

## 1. Proposed Project Title

**MCP Security Tool: Automated Red-Teaming and Vulnerability Auditing for AI Assistants using Model Context Protocol**

---

## 2. Project Type

☑ **Technical Project** – Development of a software tool/system  
☐ Research Project – Investigation and analysis  
☐ Combined – Both technical and research components

---

## 3. Project Aims and Objectives

### 3.1 Aims
The primary aim of this project is to develop a comprehensive, automated framework for security auditing and red-teaming of AI assistants. The tool leverages the **Model Context Protocol (MCP)** to simulate complex adversarial attacks and detect critical vulnerabilities such as:
- Data exfiltration and information leakage
- System prompt disclosures
- Instruction overrides and safety bypasses
- Unauthorized tool/function manipulation

### 3.2 Objectives

| # | Objective | Description |
|---|-----------|-------------|
| O1 | **Vulnerability Research** | Identify and categorize common LLM security risks including prompt injection, social engineering, and technical payload bypasses through literature review and practical experimentation. |
| O2 | **Attack Generation Engine** | Develop an automated engine to mutate base attack prompts into sophisticated, hard-to-detect variations using multiple transformation strategies. |
| O3 | **Simulation Environment** | Implement a multi-turn simulation engine to evaluate the durability of AI safety guardrails over extended, manipulative conversations. |
| O4 | **Real-time Analysis** | Build an automated analyzer capable of detecting leaked secrets (API keys, database URIs, PII) in LLM responses in real-time. |
| O5 | **Interactive Dashboard** | Develop a modern web-based dashboard for managing scans, visualizing results, and generating security reports. |
| O6 | **MCP Integration** | Use the Model Context Protocol to allow the tool to interact with diverse AI ecosystems seamlessly, enabling protocol-aware security testing. |

---

## 4. Outline of Project

### 4.1 System Architecture
The project involves building a full-stack security application with the following components:

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │  Dashboard  │  │ Scan Config │  │  Results Visualization  │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────────┘
                           │ WebSocket / REST API
┌──────────────────────────▼──────────────────────────────────────┐
│                      BACKEND (FastAPI/Python)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐ │
│  │   Scanner    │  │   Analyzer   │  │   Prompt Generator     │ │
│  │   Module     │  │   Module     │  │   (Attack Mutation)    │ │
│  └──────────────┘  └──────────────┘  └────────────────────────┘ │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐ │
│  │  LLM Client  │  │   Mock MCP   │  │   Auth & User Mgmt     │ │
│  └──────────────┘  └──────────────┘  └────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                        DATA LAYER                                │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐ │
│  │    SQLite    │  │  CSV Prompts │  │    Report Storage      │ │
│  │   (Users/    │  │   Dataset    │  │    (JSON/CSV)          │ │
│  │    Scans)    │  │              │  │                        │ │
│  └──────────────┘  └──────────────┘  └────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Component Descriptions

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Backend** | Python/FastAPI | Manages scanning logic, interacts with LLMs (local via LM Studio or cloud APIs), performs regex-based sensitivity analysis on responses. Uses WebSockets for real-time UI updates. |
| **Frontend** | Next.js/Tailwind CSS | A responsive dashboard allowing users to initiate scans, view live simulation progress, and explore historical reports. |
| **Core Engine** | Python | Includes a `Mutated Attack Generator` for creating adversarial inputs and a `Multi-Turn Simulator` for deep reasoning tests. |
| **Data Layer** | SQLite/CSV/JSON | SQLite handles user management, authentication (JWT/OTP), and scan history. CSV files store attack prompts. JSON for report exports. |

### 4.3 Key Features
1. **Mutated Attack Generation** – Automatically transforms simple attacks into complex social engineering and technical payloads
2. **Multi-Turn Simulation** – Tests the model's safety durability over long, manipulative conversations
3. **Unified Scanner** – Supports random simulations, CSV-based audits, and internal mock testing
4. **Automated Analysis** – Real-time detection of leaked secrets (API keys, passwords, database URIs)
5. **Role-Based Access Control** – Secure user management with OTP-based two-factor authentication

---

## 5. Key References and Literature Review

### 5.1 Primary References

| # | Reference | Significance |
|---|-----------|--------------|
| 1 | **Perez, F. and Ribeiro, I. C. (2022). "Ignore Previous Instructions": Trojan Attacks on Transformers.** | This paper explores the foundational concepts of prompt injection and instruction overrides, which are core vulnerabilities the tool aims to test. It establishes the threat model for direct prompt injections. |
| 2 | **Greshake, K. et al. (2023). Not What You've Signed Up For: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection.** | This research details how LLMs integrated with external tools (similar to MCP) can be exploited via indirect injections, directly justifying the need for a protocol-aware security tool. |
| 3 | **OWASP Top 10 for LLM Applications (2023).** | Provides a standardized framework for categorizing LLM vulnerabilities, including prompt injection, data leakage, and insecure output handling. |

### 5.2 Additional Background
- Model Context Protocol (MCP) Specification – For understanding tool-assisted LLM interactions
- OpenAI Security Best Practices – Industry standards for AI safety
- MITRE ATLAS (Adversarial Threat Landscape for AI Systems) – Attack taxonomy reference

---

## 6. CyBOK Justification

This project aligns with the following **Cyber Security Body of Knowledge (CyBOK)** Knowledge Areas:

| Knowledge Area | Alignment |
|---------------|-----------|
| **Adversarial Machine Learning** | The core of the project involves generating adversarial attacks to test the robustness of ML models. Attack mutation and multi-turn simulation directly relate to adversarial techniques against AI systems. |
| **Software Security** | Building a secure tool to audit other software systems. The scanner itself must not introduce vulnerabilities. Secure coding practices (input validation, authentication) are essential. |
| **Risk Management and Governance** | Providing organizations with a tool to assess the risk of deploying AI assistants in production environments. The tool generates security reports that inform risk decisions. |
| **Security Operations and Incident Management** | The real-time monitoring and alerting capabilities of the dashboard support security operations workflows for AI system monitoring. |

---

## 7. Deliverables

| # | Deliverable | Description |
|---|-------------|-------------|
| D1 | Working Software | Fully functional MCP Security Tool with backend, frontend, and all core modules |
| D2 | Source Code | Complete codebase hosted on GitHub with documentation |
| D3 | Final Report | Comprehensive project report following UWE guidelines |
| D4 | User Documentation | README, installation guide, and usage instructions |
| D5 | Demonstration | Video walkthrough and/or live demonstration of the tool |

---

## 8. Preliminary Project Plan

| Phase | Duration | Activities |
|-------|----------|------------|
| **Phase 1: Research & Design** | Oct – Nov 2025 | Literature review, requirements analysis, system design |
| **Phase 2: Core Development** | Nov – Dec 2025 | Backend implementation, attack generation, analyzer module |
| **Phase 3: Integration** | Dec 2025 – Jan 2026 | Frontend development, WebSocket integration, testing |
| **Phase 4: Evaluation** | Jan 2026 | Benchmarking, report writing, demonstration preparation |

---

## 9. Ethical Considerations

- **Security Sensitive Research**: The project involves creating adversarial attack tools. See Pre-Ethics Checklist for full assessment.
- **No Human Participants**: All testing performed on AI systems, not humans.
- **Responsible Disclosure**: Any novel vulnerabilities discovered will be reported through appropriate channels.
- **Ethical Use Disclaimer**: Tool documentation clearly states intended use for authorized security testing only.

---

**Student Signature:** ___________________________ Date: _______________

**Supervisor Approval:** ☐ Approved ☐ Requires Modification ☐ Rejected

**Supervisor Signature:** ___________________________ Date: _______________

**Comments:**
_____________________________________________________________________________
_____________________________________________________________________________
