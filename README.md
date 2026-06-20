# ⚡ Solstice Sidebar: AI Incident Desk

[![June Solstice Game Jam](https://img.shields.io/badge/Hackathon-June%20Solstice%20Game%20Jam-blueviolet)](https://dev.to/challenges/june-game-jam-2026-06-03)
[![Google Gemini Enabled](https://img.shields.io/badge/AI-Google%20Gemini%20Flash-blue)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

**Solstice Sidebar: AI Incident Desk** is a frantic, retro-corporate time-management strategy puzzle game built entirely using Vanilla HTML5, CSS3, and modern JavaScript. 

Developed in under 24 hours for the **June Solstice Game Jam**, this game subverts traditional cipher/puzzle tropes by casting you as an overworked corporate IT Incident Commander struggling to balance global resource loads and buggy holiday algorithms during the ultimate seasonal turning point.

---

## 🌌 The Concept & Narrative

It's June 21, 2026. The extreme daylight shifts of the June Solstice are causing intense data load line degradation across enterprise neural network nodes. Worse yet, your automated AI agents are malfunctioning as they attempt to over-optimize code for global June celebrations.

As automated technical emergencies flood your dashboard queue, **Daylight is your primary ticking resource**. If you mismanage an issue or freeze under pressure, your core metrics will collapse. Surviving until exactly **12:00 AM Midnight** acts as the narrative turning point: the alarms freeze, the sun resets its course, and you must submit a text-based handover log to your manager—who is simulated or live-evaluated in real time by **Google Gemini Flash AI**.

---

## 🕹️ Core Mechanics & How to Play

### 🎮 The Rules:
1. **The Solstice Clock:** The round lasts exactly 90 real-world seconds. The clock scales rapidly from `08:00 PM` to `12:00 AM Midnight`.
2. **Dynamic Alert Queue:** Random bugs stream into your left sidebar as warnings (Yellow) or critical errors (Flashing Red). 
3. **Passive Metric Degradation:** Every active error left hanging in the queue passively drains your system parameters every second.
4. **The Action Grid:** Select a ticket from the queue, read the technical anomaly report, and click the correct strategic remediation protocol button from the grid before your health pools flatline.

### 📊 Vital Conditions:
* **Win Condition:** Keep your infrastructure stable until the timer hits `12:00 AM Midnight` to trigger the final text report evaluation interface.
* **Loss Condition (Fired):** Letting `Corporate Approval` or `AI Core Stability` drop down to **0%** triggers an instant network meltdown and terminal termination.

---

## ⚙️ June Celebration Incidents & Solutions Matrix

| Subsystem AI | The Event / Holiday Anomaly | Correct Remediation Protocol |
| :--- | :--- | :--- |
| **Flip-Flop-Bot-3000** | Malfunctioning pathfinding due to dense *National Flip-Flop Day* beach crowds and chaotic foot-traction friction vectors. | **Deploy Friction Grip Patch v1.2** |
| **Wasabi-Mind** | Over-optimizing its creative weights for *International Sushi Day* and threatening to serve strawberry-mayonnaise-wasabi fusion capsules. | **Throttle Novelty Generation Weights** |
| **Sol-Power-Beta** | Experiencing processing fatigue and existential dread because the *Northern Solstice* sun won't sink below the horizon. | **Inject Simulated Darkness Packets** |

---

## 🤖 Google Gemini AI Live Integration

The narrative climax of the game hooks directly into the **Google Gemini API** (`gemini-1.5-flash:generateContent`). 

Upon completing your shift at midnight, you must draft an official **Shift Handover Summary Report**. The engine takes your text, bundles it with your final stability scores, and posts it to Gemini Flash. The model acts as a dry, passive-aggressive corporate manager, dynamically writing a completely unique, humorous performance evaluation and grading your shift out of 100.

### 🔑 Adding Your API Key:
1. Launch the web app.
2. Click the **⚙️ Configure Gemini API Key** configuration node on the login window layout.
3. Paste your API key string generated from **Google AI Studio**. The key is stored safely and strictly inside your browser's local sandbox context (`localStorage`).
4. *No Key? No Problem:* If left blank, the app relies on an embedded array fallback simulator so the game loop remains 100% playable right out of the box for judges.

---

## 🛠️ Architecture & Setup

This game engine relies on lightweight, responsive native web execution—completely free of bulky node frameworks, bundlers, canvas physics, or high-asset dependency sizes.

```bash
# Clone the repository
git clone [https://github.com/YOUR_USERNAME/solstice-sidebar.git](https://github.com/YOUR_USERNAME/solstice-sidebar.git)

# Move into the project workspace directory
cd solstice-sidebar

# Run a local HTTP server instance to test (or double-click index.html directly!)
python -m http.server 8080
