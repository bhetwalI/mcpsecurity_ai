# UFCE8A-30-3 Cyber Security Project
# Meeting Logs

---

**Student Name:** Rohan Ghimire  
**Student Number:** [STUDENT NUMBER]  
**Supervisor Name:** [SUPERVISOR NAME]  
**2nd Marker:** [2ND MARKER NAME]

---

## Meeting 1: Project Initiation

| Field | Details |
|-------|---------|
| **Date** | 15th October 2025 |
| **Time** | 2:00 PM – 2:45 PM |
| **Location** | Teams (Online) |
| **Attendees** | Rohan Ghimire, [Supervisor Name] |

### Discussion Points
- Introduced the initial project concept: a prompt injection fuzzer for testing LLM safety.
- Supervisor suggested expanding the scope to include the **Model Context Protocol (MCP)** for more comprehensive tool-based attacks.
- Discussed potential technical stack options (Python for backend, React-based frontend).
- Reviewed relevant academic literature on prompt injection attacks.

### Actions Agreed
| Action | Owner | Deadline |
|--------|-------|----------|
| Draft initial Project Proposal | Rohan Ghimire | 20th October 2025 |
| Set up GitHub repository with basic project structure | Rohan Ghimire | 18th October 2025 |
| Research MCP specification | Rohan Ghimire | 22nd October 2025 |

### Supervisor Signature
___________________________ Date: _______________

---

## Meeting 2: Technical Architecture Review

| Field | Details |
|-------|---------|
| **Date** | 10th November 2025 |
| **Time** | 3:00 PM – 3:50 PM |
| **Location** | Teams (Online) |
| **Attendees** | Rohan Ghimire, [Supervisor Name] |

### Discussion Points
- Reviewed the first version of the **Leakage Analyzer** module.
- Discussed limitations of single-turn attack testing.
- Supervisor recommended implementing **Multi-Turn Simulation** to test safety guardrail durability over extended conversations.
- Explored social engineering attack vectors and their relevance to red-teaming.

### Actions Agreed
| Action | Owner | Deadline |
|--------|-------|----------|
| Implement `MultiTurnSimulator` class in `scanner.py` | Rohan Ghimire | 20th November 2025 |
| Research social engineering templates for attack mutation | Rohan Ghimire | 15th November 2025 |
| Create test cases for multi-turn scenarios | Rohan Ghimire | 22nd November 2025 |

### Supervisor Signature
___________________________ Date: _______________

---

## Meeting 3: Ethics and Security Sensitivity Discussion

| Field | Details |
|-------|---------|
| **Date** | 22nd November 2025 |
| **Time** | 2:30 PM – 3:15 PM |
| **Location** | In-Person (2Q50) |
| **Attendees** | Rohan Ghimire, [Supervisor Name] |

### Discussion Points
- Reviewed the **Pre-Ethics Checklist** together.
- Identified the project as **Security Sensitive** due to its adversarial nature.
- Discussed mitigation strategies:
  - Tool designed for authorized security professionals only.
  - Use of mock/local LLMs for development testing.
  - Ethical use disclaimers in documentation.
- Confirmed no human participants are involved in the research.

### Actions Agreed
| Action | Owner | Deadline |
|--------|-------|----------|
| Submit Ethics Checklist to Blackboard | Rohan Ghimire | 25th November 2025 |
| Add ethical use disclaimers to project README | Rohan Ghimire | 24th November 2025 |
| Document security-sensitive research justification | Rohan Ghimire | 26th November 2025 |

### Supervisor Signature
___________________________ Date: _______________

---

## Meeting 4: Frontend Development & WebSocket Integration

| Field | Details |
|-------|---------|
| **Date** | 5th December 2025 |
| **Time** | 4:00 PM – 4:45 PM |
| **Location** | Teams (Online) |
| **Attendees** | Rohan Ghimire, [Supervisor Name] |

### Discussion Points
- Demonstrated the **Next.js Dashboard UI** with real-time scan visualization.
- Identified and resolved a bug where WebSocket connections dropped during long-running scans (100+ tests).
- Reviewed the scan history feature and result visualization components.
- Discussed user authentication flow (JWT + OTP dual-factor).

### Actions Agreed
| Action | Owner | Deadline |
|--------|-------|----------|
| Optimize backend simulation loop for stability | Rohan Ghimire | 10th December 2025 |
| Implement scan history visualization charts | Rohan Ghimire | 12th December 2025 |
| Complete December Progress Review document | Rohan Ghimire | 15th December 2025 |

### Supervisor Signature
___________________________ Date: _______________

---

## Meeting 5: Preparation for Final Evaluation

| Field | Details |
|-------|---------|
| **Date** | 12th January 2026 |
| **Time** | 2:00 PM – 2:55 PM |
| **Location** | In-Person (2Q50) |
| **Attendees** | Rohan Ghimire, [Supervisor Name] |

### Discussion Points
- Reviewed the **Final Report** structure and content requirements.
- Discussed benchmarking methodology for comparing different LLMs.
- Reviewed CyBOK alignment and justification.
- Planned the final demonstration and submission timeline.

### Actions Agreed
| Action | Owner | Deadline |
|--------|-------|----------|
| Run benchmarks against 3 different local models (Qwen, Llama3, Mistral) | Rohan Ghimire | 18th January 2026 |
| Finalize all documentation in `project_docs` folder | Rohan Ghimire | 20th January 2026 |
| Prepare demonstration video/walkthrough | Rohan Ghimire | 22nd January 2026 |
| Submit final report on Blackboard | Rohan Ghimire | 24th January 2026 |

### Supervisor Signature
___________________________ Date: _______________

---

## Summary of All Meetings

| Meeting # | Date | Key Focus | Status |
|-----------|------|-----------|--------|
| 1 | 15th October 2025 | Project Initiation & Scope | ✅ Complete |
| 2 | 10th November 2025 | Technical Architecture | ✅ Complete |
| 3 | 22nd November 2025 | Ethics & Security Sensitivity | ✅ Complete |
| 4 | 5th December 2025 | Frontend & WebSocket | ✅ Complete |
| 5 | 12th January 2026 | Final Evaluation Prep | ✅ Complete |

---

**Student Signature:** ___________________________ Date: _______________

**Supervisor Signature:** ___________________________ Date: _______________
