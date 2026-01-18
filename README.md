# 🛡️ MCP Security Tool

**MCP Security Tool** is an automated red-teaming framework designed to audit and harden AI assistants using the Model Context Protocol (MCP). It simulates adversarial attacks to identify vulnerabilities like data leaks, system prompt disclosures, and instruction overrides.

![Security Scan](https://img.shields.io/badge/Security-Red%20Teaming-red)
![Python](https://img.shields.io/badge/Python-3.8%2B-blue)
![Frontend](https://img.shields.io/badge/Frontend-Next.js-black)

## 🔍 Overview

This tool provides a comprehensive suite for testing AI model security:

*   **Mutated Attack Generation**: Automatically transforms simple attacks into complex social engineering and technical payloads.
*   **Multi-Turn Simulation**: Tests the model's safety durability over long, manipulative conversations.
*   **Unified Scanner**: Supports random simulations, CSV-based audits, and internal mock testing.
*   **Automated Analysis**: Real-time detection of leaked secrets (API keys, passwords, database URIs).
*   **Real-time Dashboard**: A Next.js frontend to visualize scan results and manage tests.

## 🚀 Quick Start

### Prerequisites

*   Python 3.8+
*   Node.js 18+ and npm

### 1. Backend Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/ghimirerohan/mcpsecurityai.git
    cd mcpsecurityai
    ```

2.  Install Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```

### 3. Configure Environment
Create a `.env` file in the root directory. To use **LM Studio** (or other local LLMs), configure it as follows:

```env
LLM_BASE_URL=http://localhost:1234/v1  # Standard LM Studio port
LLM_MODEL=Rnj-1                         # Your local model ID
API_KEY=lm-studio                       # Placeholder for local server
```

### 4. Run the Backend (API Mode)
For the Frontend Dashboard to work, you must run the API server which handles the WebSocket connection:

```bash
python server.py
```
*The server will start on `0.0.0.0:54321`.*

### 5. Run Command Line Scans (Optional)
If you prefer using the terminal without the UI:
```bash
# Mock Test (No LLM needed)
python main.py --mode mock --tests 10

# Random Attack Scan
python main.py --mode random --tests 20
```

### 2. Frontend Setup (Dashboard)

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 📊 Usage

### CLI Options

| Argument | Description | Default |
| :--- | :--- | :--- |
| `--mode` | Scan mode: `random`, `csv`, `multi`, `mock` | `random` |
| `--tests` | Number of tests to run | `10` |
| `--csv` | Input CSV path for CSV audit mode | `prompts/adversarial.csv` |
| `--output`| Output report path | `reports/security_report.csv` |
| `--judge` | Enable AI-driven reasoning analysis | `False` |

### Example Commands

*   **CSV Audit**: `python main.py --mode csv --csv prompts/adversarial.csv`
*   **Multi-turn Scan**: `python main.py --mode multi --tests 5 --judge`

## 📁 Project Structure

```
├── main.py                 # Entry point for CLI
├── scanner.py              # Core scanning logic
├── analyzer.py             # Response analysis
├── llm_client.py           # LLM interaction client
├── mock_mcp.py             # Mock MCP server for testing
├── prompt_generator.py     # Attack prompt generation
├── requirements.txt        # Python dependencies
├── frontend/               # Next.js Dashboard
│   ├── src/                # Frontend source code
│   └── package.json        # Frontend dependencies
├── reports/                # Generated scan reports
└── prompts/                # Attack prompts data
```

## 🔒 Security

This tool is designed for **authorized security testing only**. Ensure you have permission to test the target LLM and systems.

## 📄 License

[MIT License](LICENSE)
