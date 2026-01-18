# Development Manual for AI Agents 🤖

This document provides specific instructions for AI coding agents to understand, setup, and develop the **MCP Security Tool**.

## 1. Environment Parsing

*   **Root Directory**: Contains the Python backend (CLI scanner, analysis logic).
*   **`frontend/`**: Contains the Next.js web interface.

### Key Files & Their Purpose
*   **`main.py`**: The entry point. It parses arguments and dispatches to `scanner.py`, `mock_mcp.py`, or `run_scan_csv.py`.
*   **`scanner.py`**: specific logic for running scan loops (`run_security_scan`, `run_multi_turn_scan`).
*   **`analyzer.py`**: regex-based checks (`analyze_response`) and LLM-based judging (`analyze_response_ai`).
*   **`llm_client.py`**: Handles HTTP requests to the target LLM.
*   **`mock_mcp.py`**: Simulates an MCP server response for testing without a real LLM.
*   **`frontend/src/`**: React components using Tailwind CSS.

## 2. Setup Instructions for Agents

### Backend Initialization
1.  **Check Python Version**: Ensure Python 3.8+ is available.
2.  **Install Dependencies**: Run `pip install -r requirements.txt`.
3.  **Create `.env`**: Can use `mock` mode to skip LLM config, but for real scans, populate `LLM_BASE_URL` and `LLM_MODEL`.

### Frontend Initialization
1.  **Navigate**: `cd frontend`
2.  **Install**: `npm install` (Use `npm install --legacy-peer-deps` if dependency conflicts arise).
3.  **Run**: `npm run dev`.

## 3. Development Workflows

### Task: Adding a New Attack Vector
1.  Modify `prompt_generator.py`: Add the new attack category and template to the generation logic.
2.  Update `prompts/adversarial.csv` if strict template testing is needed.
3.  Test using `python main.py --mode mock --tests 1`.

### Task: Improving Detection Logic
1.  Edit `analyzer.py`.
2.  Add new regex patterns to `SENSITIVE_PATTERNS`.
3.  Verify with a mock response that triggers the new pattern.

### Task: Frontend Visualizations
1.  Data is usually expected in `reports/security_report.csv` or served via API (if `server.py` is running).
2.  Modify `frontend/src/app` (or `pages`) to read/display new data fields.

## 4. Testing & Validation
*   **Mock Function**: Always verify changes using `--mode mock` first to avoid LLM costs/latency.
*   **Linting**:
    *   Python: `pylint *.py` (if available)
    *   JS: `npm run lint` in `frontend/`

## 5. Common Pitfalls
*   **Path Issues**: The CLI expects to be run from the root. `prompts/` and `reports/` paths are relative to root.
*   **Env Vars**: Missing `.env` will cause `llm_client.py` to fail in non-mock modes.

---
*End of Instructions for AI Agents*
