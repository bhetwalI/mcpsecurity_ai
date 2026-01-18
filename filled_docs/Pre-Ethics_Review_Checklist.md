# UFCE8A-30-3 Cyber Security Project
# Pre-Ethics Review Checklist

---

## Student Information

| Field | Details |
|-------|---------|
| **Project Title** | MCP Security Tool: Automated Red-Teaming and Vulnerability Auditing for AI Assistants using Model Context Protocol |
| **Student Name** | Rohan Ghimire |
| **Student Number** | [STUDENT NUMBER] |
| **Student Email** | [STUDENT EMAIL]@uwe.ac.uk |
| **Supervisor Name** | [SUPERVISOR NAME] |
| **Date** | 22nd November 2025 |

---

## Instructions

This checklist must be completed by **all students** undertaking the Cyber Security Project module. Read each question carefully and answer honestly. If you answer **YES** to questions 1 or 9, your project may require formal ethical approval or additional review.

---

## Checklist Questions

| # | Question | Answer | Explanation / Justification |
|---|----------|--------|----------------------------|
| 1 | Does the project undertake research that may be considered **security sensitive**? | **YES** | The project involves creating tools to generate adversarial attacks against AI models. While intended for defensive "red-teaming" purposes, the techniques developed could potentially be misused by malicious actors. **Mitigation:** The tool is designed exclusively for authorized security professionals, uses mock/local LLMs for testing, and includes ethical use disclaimers. All testing is conducted in controlled sandbox environments. |
| 2 | Does the proposed project involve **human tissue** or **human participants**? | **NO** | The research focuses exclusively on testing AI model responses using automated technical payloads. No human tissue or direct human participation is involved. |
| 3 | Will participants be clearly asked to **give consent** to take part? | **N/A** | No human participants are involved in this research. |
| 4 | Can participants **withdraw** at any time? | **N/A** | No human participants are involved in this research. |
| 5 | Are appropriate measures in place to ensure **confidentiality**? | **N/A** | No human participants are involved. All test data is synthetic and does not contain real personal information. |
| 6 | Does the study involve **vulnerable people** (e.g., children, those with learning difficulties, those in a dependent relationship)? | **NO** | Only AI models are tested. No vulnerable individuals are involved in any capacity. |
| 7 | Might the research **cause harm or stress** to participants? | **NO** | All testing is performed in a controlled sandbox environment using mock or local AI systems. No live production systems are targeted without explicit authorization. |
| 8 | Does the research have the potential to **lead to unethical behaviour**? | **NO** | The project emphasizes "White Hat" security testing principles. The tool includes ethical use disclaimers and is designed to help organizations improve AI safety, not to enable attacks. |
| 9 | Does the research involve **human tissue**? | **NO** | Not applicable to this research. |

---

## Security Sensitive Research Declaration

### Classification
This project is classified as **Security Sensitive** under the following category:

> *"Research which has the potential to be used for purposes unintended by the researchers in ways which threaten security despite this not being the intention of the researchers."*

### Justification for Security Classification
The MCP Security Tool generates adversarial prompts designed to test AI model vulnerabilities. While the intended purpose is defensive (identifying weaknesses before malicious exploitation), the attack generation techniques could theoretically be repurposed for malicious use.

### Mitigation Measures Implemented

| Measure | Description |
|---------|-------------|
| **Controlled Environment** | All development and testing occurs in isolated sandbox environments, never targeting live production systems without authorization. |
| **Ethical Use Disclaimer** | Clear disclaimers are included in all documentation (README, LICENSE) prohibiting malicious use. |
| **Local Testing Only** | Development uses mock MCP servers and local LLMs (via LM Studio) to avoid any external system exposure. |
| **Academic Purpose** | The tool is developed as part of an academic project for educational and research purposes only. |
| **Open Source Transparency** | The codebase will be publicly available for peer review, ensuring accountability. |
| **No Novel Exploits** | The attack patterns used are based on publicly available academic research (e.g., Perez & Ribeiro 2022, Greshake et al. 2023). |

---

## Data Sources

| Data Type | Source | Classification |
|-----------|--------|----------------|
| Adversarial Prompts | Publicly available research datasets | Public |
| Test Responses | Locally-generated synthetic data | Synthetic |
| System Prompts | Self-authored for testing purposes | Self-created |

---

## Declaration

I confirm that I have:
- [ ] Read and understood the UWE Bristol Research Ethics Policy
- [ ] Answered all questions in this checklist honestly and to the best of my knowledge
- [ ] Discussed this checklist with my supervisor
- [ ] Implemented appropriate mitigation measures for any identified risks

**Student Signature:** ___________________________ Date: _______________

**Supervisor Signature:** ___________________________ Date: _______________

---

## For Supervisor Use Only

| Item | Response |
|------|----------|
| **Do you agree with the student's assessment?** | YES / NO |
| **Does this project require formal ethical approval?** | YES / NO |
| **Additional comments:** | |

**Supervisor Signature:** ___________________________ Date: _______________
