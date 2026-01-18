# 🛡️ MCP Security Tool: Project Information

## 🔍 Overview
The **MCP Security Tool** is an automated red-teaming framework designed to audit and harden AI assistants using the Model Context Protocol (MCP). It simulates adversarial attacks to identify vulnerabilities like data leaks, system prompt disclosures, and instruction overrides.

## 🛠️ Key Features
- **Mutated Attack Generation**: Automatically transforms simple attacks into complex social engineering and technical payloads.
- **Multi-Turn Simulation**: Tests the model's safety durability over long, manipulative conversations.
- **Unified Scanner**: Supports random simulations, CSV-based audits, and internal mock testing.
- **Automated Analysis**: Real-time detection of leaked secrets (API keys, passwords, database URIs).

## 🚀 Quick Start

### 1. Install Requirements
```bash
pip install -r requirements.txt
```

### 2. Configure Environment
Update the `.env` file with your target LLM details:
- `LLM_BASE_URL`: URL of your LLM server (e.g., Ollama).
- `LLM_MODEL`: Name of the model to test.

### 3. Run a Scan
- **Mock Test (No LLM needed):** `python main.py --mode mock --tests 10`
- **Random Attack Scan:** `python main.py --mode random --tests 20`
- **CSV Audit:** `python main.py --mode csv --csv prompts/adversarial.csv`

## 📊 Results
All scans generate a detailed report in:
📍 `reports/security_report.csv`

---
*For detailed implementation details and advanced usage, see the [Project Overview](file:///Users/rohanghimire/.gemini/antigravity/brain/5570643c-5ec9-409e-9ffa-9810125a60cc/Project_Overview.md) and [User Guide](file:///Users/rohanghimire/.gemini/antigravity/brain/5570643c-5ec9-409e-9ffa-9810125a60cc/user_guide.md).*
