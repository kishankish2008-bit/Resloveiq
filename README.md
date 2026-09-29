# ResolveIQ — AI Incident Intelligence & Organizational Memory

> *"ResolveIQ doesn't just remember incidents. It learns how your team resolves them."*

Built for **HackwithHyderabad 3.0**, ResolveIQ is an AI-powered incident intelligence platform designed for software engineering teams. Its central differentiator is **Hindsight**, a persistent organizational memory system that indexes failure signatures, correlated telemetry patterns, and engineer feedback to reduce Mean Time to Recovery (MTTR) on recurrent production incidents.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (runs on port 3000)
npm run dev

# 3. Production build
npm run build
```

---

## 🏗️ Architecture & Navigation

The platform features 7 core sections in a collapsible layout:

1. **Command Overview**: High-level telemetry, PostgreSQL connection pool saturation, and live anomaly narrative.
2. **Active Incident**: Direct diagnostic focal view for anomaly triage and mitigation (`INC-042` / `INC-050`).
3. **Incident History**: Timeline archive of resolved incidents, MTTR metrics, and engineer action logs.
4. **Hindsight Memory**: Organizational memory explorer with search, vector nodes, and database seed trigger.
5. **Learning Loop**: Visual 6-stage lifecycle (`Detect` → `Recall` → `Correlate` → `Diagnose` → `Resolve` → `Retain`).
6. **System Status**: Telemetry inspector with live health check pings (`/api/health`) and connectivity status.
7. **Settings**: Workspace controls, telemetry display thresholds, Groq reasoning density, and user preferences.

---

## 🔌 API Endpoints Contract

- `POST /api/analyze`: Analyzes active incident telemetry against historical Hindsight memory.
- `POST /api/resolve`: Records confirmed incident remediation, feedback, and retains learnings in Hindsight.
- `GET /api/health`: Health status of backend services, Groq AI, and Hindsight Memory store.
- `POST /api/seed`: Seeds historical production incidents into the Hindsight memory store.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4
- **Animation**: Motion v12
- **Icons**: Custom Precision SVG System + Lucide React
- **Brand Colors**: Soft Porcelain White (`#F7F8F5`), Deep Evergreen (`#245C52`), Muted Eucalyptus (`#91B4A5`), Antique Gold (`#C8A66A`), and Muted Terracotta (`#BF6259`).
