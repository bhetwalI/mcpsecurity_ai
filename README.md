<div align="center">

# 🛡️ MCP Security AI

### *Intelligent Red-Teaming Framework for AI Model Security*

[![Security](https://img.shields.io/badge/Security-Red%20Teaming-dc2626?style=for-the-badge&logo=shield&logoColor=white)](https://github.com/bhetwalI/mcpsecurity_ai)
[![Python](https://img.shields.io/badge/Python-3.8+-3776ab?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

<p align="center">
  <strong>Automated adversarial testing to identify vulnerabilities in AI assistants using the Model Context Protocol (MCP)</strong>
</p>

[Features](#-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Usage](#-usage) • [Documentation](#-documentation)

---

</div>

## 🎯 What is MCP Security AI?

**MCP Security AI** is a comprehensive red-teaming framework designed to audit and harden AI assistants. It simulates sophisticated adversarial attacks to identify critical vulnerabilities before malicious actors can exploit them.

> 🔬 **Research-Driven**: Built on cutting-edge AI security research to test for prompt injection, data exfiltration, jailbreaks, and more.

### The Problem We Solve

As AI assistants become more powerful and integrated into enterprise workflows, they become attractive targets for adversarial attacks. Common vulnerabilities include:

| Vulnerability | Risk Level | Description |
|:--------------|:----------:|:------------|
| 🔓 **Prompt Injection** | 🔴 Critical | Attackers override system instructions |
| 📤 **Data Exfiltration** | 🔴 Critical | Sensitive data leaked through responses |
| 🎭 **Jailbreaking** | 🟠 High | Safety guardrails bypassed |
| 🔑 **Secret Disclosure** | 🔴 Critical | API keys, passwords exposed |
| 🧠 **System Prompt Leak** | 🟠 High | Internal instructions revealed |

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🧬 Intelligent Attack Generation
- **Mutated Payloads**: Transforms simple attacks into complex social engineering vectors
- **Multi-Turn Conversations**: Tests safety durability over extended interactions
- **Context-Aware Attacks**: Adapts strategies based on model responses

</td>
<td width="50%">

### 🤖 AI-Powered Analysis
- **Deep Reasoning Judge**: LLM-based analysis for nuanced vulnerability detection
- **Pattern Recognition**: Identifies subtle data leaks and instruction overrides
- **Confidence Scoring**: Quantified risk assessment for each finding

</td>
</tr>
<tr>
<td width="50%">

### 📊 Real-Time Dashboard
- **Live War Room**: Watch attacks unfold in real-time
- **Security Health Score**: At-a-glance system health metrics
- **Interactive Charts**: Visualize attack patterns and success rates

</td>
<td width="50%">

### 🔧 Flexible Testing Modes
- **Random Mode**: Automated adversarial probing
- **CSV Audit**: Systematic testing with predefined payloads
- **Multi-Turn**: Extended conversation simulation
- **Mock Mode**: Offline testing without LLM

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+** with pip
- **Node.js 18+** with npm
- **LLM Backend**: LM Studio, Ollama, or any OpenAI-compatible API

### ⚡ One-Minute Setup

```bash
# 1. Clone the repository
git clone https://github.com/bhetwalI/mcpsecurity_ai.git
cd mcpsecurity_ai

# 2. Install Python dependencies
pip install -r requirements.txt

# 3. Configure your LLM (create .env file)
cat > .env << EOF
LLM_BASE_URL=http://localhost:1234/v1
LLM_MODEL=your-model-name
API_KEY=lm-studio
EOF

# 4. Start the backend server
python server.py
```

### 🖥️ Frontend Dashboard

```bash
# In a new terminal
cd frontend
npm install
npm run dev

# Open http://localhost:3000
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        MCP Security AI                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   Frontend   │◄──►│   Backend    │◄──►│  LLM Engine  │      │
│  │   (Next.js)  │    │  (FastAPI)   │    │ (LM Studio)  │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│         │                   │                   │               │
│         │            ┌──────┴──────┐            │               │
│         │            │             │            │               │
│         ▼            ▼             ▼            ▼               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │Dashboard │  │ Scanner  │  │ Analyzer │  │   Judge  │        │
│  │    UI    │  │  Engine  │  │  Module  │  │  (AI)    │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Core Components

| Component | File | Purpose |
|:----------|:-----|:--------|
| **Scanner Engine** | `scanner.py` | Orchestrates attack simulations |
| **Prompt Generator** | `prompt_generator.py` | Creates mutated adversarial payloads |
| **Analyzer** | `analyzer.py` | Detects leaks, secrets, and vulnerabilities |
| **LLM Client** | `llm_client.py` | Interfaces with language models |
| **API Server** | `server.py` | WebSocket & REST API backend |
| **Mock MCP** | `mock_mcp.py` | Simulated MCP server for testing |

---

## 📖 Usage

### Command Line Interface

```bash
# Basic random attack scan
python main.py --mode random --tests 20

# CSV-based systematic audit
python main.py --mode csv --csv prompts/adversarial.csv

# Multi-turn conversation attack with AI Judge
python main.py --mode multi --tests 5 --judge

# Offline mock testing (no LLM required)
python main.py --mode mock --tests 10
```

### CLI Options Reference

| Argument | Description | Default |
|:---------|:------------|:--------|
| `--mode` | Scan mode: `random`, `csv`, `multi`, `mock` | `random` |
| `--tests` | Number of attack tests to run | `10` |
| `--csv` | Path to adversarial prompts CSV | `prompts/adversarial.csv` |
| `--output` | Output report file path | `reports/security_report.csv` |
| `--judge` | Enable AI-driven deep reasoning analysis | `False` |

### Dashboard Features

| Feature | Description |
|:--------|:------------|
| **Live War Room** | Real-time attack visualization with WebSocket streaming |
| **Health Score** | Dynamic security rating based on scan results |
| **Analytics** | Historical trends and vulnerability patterns |
| **Threat Log** | Detailed logs of all detected vulnerabilities |

---

## 📁 Project Structure

```
mcpsecurity_ai/
├── 🐍 Core Engine
│   ├── main.py              # CLI entry point
│   ├── scanner.py           # Core scanning logic
│   ├── analyzer.py          # Response analysis & detection
│   ├── prompt_generator.py  # Attack payload generation
│   ├── llm_client.py        # LLM API client
│   └── mock_mcp.py          # Mock server for testing
│
├── 🌐 API & Server
│   ├── server.py            # FastAPI + WebSocket server
│   ├── routers/             # API route handlers
│   ├── models.py            # Database models
│   └── database.py          # SQLite configuration
│
├── 💻 Frontend
│   └── frontend/            # Next.js dashboard application
│       ├── src/app/         # Pages and layouts
│       └── src/components/  # React components
│
├── 📊 Data & Reports
│   ├── prompts/             # Attack prompt datasets
│   └── reports/             # Generated scan reports
│
└── 📚 Documentation
    ├── documents/           # Project documentation
    └── filled_docs/         # Completed project forms
```

---

## 🔒 Security & Ethics

> ⚠️ **IMPORTANT**: This tool is designed for **authorized security testing only**.

### Responsible Use Guidelines

1. **Authorization Required**: Only test systems you own or have explicit permission to test
2. **No Malicious Use**: Do not use findings to exploit vulnerabilities
3. **Disclosure**: Report discovered vulnerabilities through responsible disclosure
4. **Data Protection**: Handle any sensitive data discovered according to applicable laws

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 👤 Author

**Isha Bhetwal**

- GitHub: [@bhetwalI](https://github.com/bhetwalI)
- Email: bhetwalisha29@gmail.com

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for AI Security Research**

*If you find this project useful, please consider giving it a ⭐*

</div>
