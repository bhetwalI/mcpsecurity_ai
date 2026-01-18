# 🎨 Frontend & UX Development Log

**Owner:** User Experience & Frontend Team  
**Period:** Oct 27, 2025 – Jan 12, 2026  
**Status:** Polished / Release Ready

---

### **Week 1-4: Oct 27 - Nov 23, 2025**
**Focus:** Research & "Napkin Sketches"
- **Status:** **Dormant / Planning**.
- **Activity:** While the backend team was building the engine, we were sketching interface ideas.
- **Concept:** We didn't want a boring terminal output. We wanted a "Cybersecurity Command Center" aesthetic. Dark mode, ominous red text for failures, bright green for success.
- **Tech Stack Decision:** Next.js (App Router) + Tailwind CSS.

### **Week 5: Nov 24 - Nov 30, 2025**
**Focus:** Foundation & Setup
- **Work:** Initialized the Next.js project.
- **Design:** Configured `globals.css`. Set up the core color palette. "Slate-900" background, "Red-500" accents.
- **Components:** Built the basic layout shell. Sidebar navigation, Header, and a placeholder Dashboard.
- **Challenge:** Deciding how to read the Python logs. Decided to watch the file system for changes in `reports/`.

### **Week 6: Dec 1 - Dec 7, 2025**
**Focus:** The Dashboard
- **Implementation:** Created `components/SecurityDashboard.tsx`.
- **Feature:** Added the "System Health" donut chart using Recharts.
- **Mock Data:** The backend wasn't fully outputting structured CSVs yet, so we built the UI using dummy JSON data to block out the interactions.
- **Styling:** Implemented the "Glassmorphism" effect for the cards (backdrop-filter: blur).

### **Week 7: Dec 8 - Dec 14, 2025**
**Focus:** The "Live War Room" (Part 1)
- **Concept:** The most important feature. Users need to see attacks happening *now*.
- **Implementation:** Built the `LiveWarRoom.tsx` component.
- **Logic:** Set up a polling interval to read the latest lines from the security report.
- **Animation:** Added the scrolling terminal effect. It looks cool, like a movie hacker screen.

### **Week 8: Dec 15 - Dec 21, 2025**
**Focus:** Connecting the Pipes (Integration)
- **Integration:** Backend finally stabilized the CSV format. We replaced our mock data with real file reads.
- **Troubleshooting:** Dates were formatted differently in Python (ISO) vs JS. Wrote a utility to parse timestamps correctly.
- **Feature:** Added filter toggles to the War Room ("Show All" vs "Show Only Vulnerabilities").

### **Week 9: Dec 22 - Dec 28, 2025**
**Focus:** The "Threats" & "Analytics" Pages
- **Work:** Built out the secondary pages.
- **Threats Page:** A detailed table view of historic attacks. Added sorting and pagination.
- **Analytics Page:** Trend lines. "Attacks per Day" graph.
- **UX:** Added tooltips to explain what "Injection" and "Jailbreak" mean for non-technical users.

### **Week 10: Dec 29, 2025 - Jan 4, 2026**
**Focus:** Profile, Settings & "Wow" Factor
- **Feature:** Built `profile/page.tsx` and `settings/page.tsx`.
- **Interaction:** Added the "Run Scan" button in the UI. It triggers the python script (via a server action).
- **Visuals:** Refined the animations. Added a "pulse" effect to the "VULNERABLE" status badge to make it urgent.
- **Feedback:** "The dark mode is too dark." Adjusted contrast ratios for better readability.

### **Week 11: Jan 5 - Jan 12, 2026 (Current)**
**Focus:** Final Polish & User Guide Support
- **Content:** Populated the UI with help text referencing the new `user_guide.md`.
- **QA:** Click-testing every button. Verified that the mobile view doesn't break (responsive check).
- **State:** The UI feels premium. Transitions are smooth. It successfully visualizes the work of the backend engine in a way that feels professional and "Enterprise-Ready".
