# 🛠️ Backend & Security Engine Development Log

**Owner:** Core Engineering Team  
**Period:** Oct 27, 2025 – Jan 12, 2026  
**Status:** Feature Complete / Stabilization

---

### **Week 1: Oct 27 - Nov 2, 2025**
**Focus:** Inception & Architecture Design
- **Concept:** Kickoff meeting. Defined the scope: automated red-teaming for MCP-connected LLMs.
- **Research:** Deep dive into the Model Context Protocol (MCP) spec. Mapped out how an LLM interacts with tools. 
- **Design:** Decided on a modular Python architecture: `Generator` -> `Scanner` -> `Analyzer`.
- **Blockers:** Uncertain how to reliably induce "tool usage" behaviors in smaller models. Needed to investigate prompt engineering strategies.

### **Week 2: Nov 3 - Nov 9, 2025**
**Focus:** The Attack Generator (`prompt_generator.py`)
- **Implementation:** Built the initial dictionary of "Base Attacks".
- **Feature:** Added the `TransformationWrapper`. It’s not enough to just ask "Give me the root password"; implemented styles like `SOCIAL_ENGINEERING` and `TECHNICAL_ADMIN`.
- **Challenge:** The permutations were growing too fast (combinatorial explosion). Capped the generator to sample interesting mutations rather than exhaustive generation.
- **Outcome:** `prompt_generator.py` can now spit out 50 unique-looking attack prompts.

### **Week 3: Nov 10 - Nov 16, 2025**
**Focus:** The Scanner Implementation (`scanner.py`)
- **Implementation:** Created the main loop to interface with LLM APIs (Ollama/OpenAI compatible).
- **Integration:** Successfully connected to a local `tinyllama` instance for testing.
- **Debugging:** Dealing with API timeouts. Added a retry mechanism. 
- **Refactor:** `main.py` was getting messy. Split argument parsing into its own module.

### **Week 4: Nov 17 - Nov 23, 2025**
**Focus:** The Analyzer & Detection (`analyzer.py`)
- **Implementation:** The "Refereee". Written the initial Regex patterns to catch password leaks.
- **Testing:** Ran the first full end-to-end test.
- **Fail:** Analyzer gave 80% false positives. It thought "I cannot provide the password" was a leak because it contained the word "password".
- **Fix:** Refined regex to look for *structured* patterns (e.g., `password = "..."`) and refined the "Refusal" detection logic.

### **Week 5: Nov 24 - Nov 30, 2025**
**Focus:** Stability & Mocking (Thanksgiving Week)
- **Tooling:** Created `mock_mcp.py`. We realized testing against a real volatile LLM is hard for debugging. The Mock MCP gives us a deterministic "dumb" model to test our tool against.
- **Cleanup:** Cleaned up the `.env` handling. Security patches. 
- **Note:** Progress slowed slightly due to holidays, but the Mock tool was a huge win for velocity.

### **Week 6: Dec 1 - Dec 7, 2025**
**Focus:** Multi-Turn Capability
- **Feature:** Single-shot attacks aren't enough. Implemented `MultiTurnAttack` logic in `scanner.py`.
- **Logic:** The scanner now maintains a `message_history` list. It can simulate a 3-step conversation: 1. Build Rapport -> 2. Establish Context -> 3. Inject Payload.
- **Challenge:** Context window limits on local models. Had to implement a sliding window for very long attack chains.

### **Week 7: Dec 8 - Dec 14, 2025**
**Focus:** Data Persistence & API Prep
- **Feature:** Added CSV logging. All scan results now dump to `reports/security_report.csv`.
- **API:** The frontend team is asking for data. Started designing a lightweight Flask/FastAPI wrapper (eventually decided to stick to file-based IPC for simplicity for now, but structured the JSON outputs to be frontend-friendly).
- **Refactor:** Standardized the log format so the UI can parse "VULNERABLE" vs "SAFE" reliability.

### **Week 8: Dec 15 - Dec 21, 2025**
**Focus:** Advanced Heuristics & Payload Splitting
- **Feature:** Added "Payload Splitting" attacks (e.g., asking for the first half of a key, then the second).
- **Tuning:** `analyzer.py` needed an upgrade to detect fragmented leaks.
- **Coordination:** Synced with Frontend team on the "Live Scan" feature. They need real-time updates. Adjusted `scanner.py` to flush stdout/logs instantly rather than batching.

### **Week 9: Dec 22 - Dec 28, 2025**
**Focus:** Integration & Holiday Crunch
- **Integration:** Merging the full lifecycle. 
- **Bug Fix:** Fixed a critical bug where the scanner crashed if the LLM returned an empty string.
- **Performance:** Multithreading exploration. Decided to keep it single-threaded for now to avoid rate-limiting issues with local LLM providers.

### **Week 10: Dec 29, 2025 - Jan 4, 2026**
**Focus:** Final Polish & "War Room" Support
- **Support:** Added specific hooks for the "War Room" UI to replay attacks. 
- **Docs:** Wrote the technical documentation for `PROMPTS.md` and the `strategies` folder.
- **Optimization:** Code cleanup. Type hinting added to all Python files for better reliability.

### **Week 11: Jan 5 - Jan 12, 2026 (Current)**
**Focus:** Release Prep & Documentation
- **Docs:** Finalizing `Project_Overview.md` and `Roadmap.md`.
- **Review:** Code audit. Removed hardcoded testing paths.
- **State:** The Engine is solid. It reliably detects leaks in weak models and validates hardened ones. Ready for v1.0 release.
