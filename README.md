# MindGuardian AI — Blueprint 1.0 & 2.0 Baseline

MindGuardian AI is an AI-powered physiological stress detection platform designed to perform multimodal biometric monitoring and provide autonomous adaptive coping interventions.

This project baseline delivers **Blueprint 1.0** (FastAPI Backend & CORS Architecture) and **Blueprint 2.0** (Polished 24-Hour Hackathon React Dashboard Interface).

---

## 🚫 Scope Boundary & Out-of-Scope Declarations

**Blueprint 1.0 & 2.0 establish ONLY the clean architectural foundation and product interface.**

This baseline explicitly does **NOT** implement:
- ❌ Webcam access or optical frame capture
- ❌ Microphone access or audio stream recording
- ❌ AI models (Facial Action Unit, Vocal Jitter, HRV scoring)
- ❌ Fake AI data generators or simulated scores
- ❌ Database storage (PostgreSQL, MongoDB, SQLite)
- ❌ User authentication & session tokens
- ❌ Cloud infrastructure or serverless deployments

All interactive dashboard placeholders clearly indicate which future blueprint will activate their respective AI capabilities.

---

## 📁 Project Folder Hierarchy

```
mindGuardian-AI/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       └── endpoints/
│   │   │           ├── __init__.py
│   │   │           └── health.py        # GET /health implementation
│   │   │       └── __init__.py
│   │   │   └── __init__.py
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   └── config.py                # Pydantic Settings & CORS rules
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   └── health.py                # Health response Pydantic schema
│   │   └── __init__.py
│   ├── models/                           # Future AI Model Storage Placeholders
│   │   ├── face/
│   │   ├── voice/
│   │   ├── stress/
│   │   └── recommendation/
│   ├── main.py                          # FastAPI Entrypoint & CORS Middleware
│   ├── requirements.txt                 # Backend Python dependencies
│   └── .env.example                     # Environment template
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx               # Header & Live Clock
│   │   │   ├── HeroBanner.jsx           # Product Overview Banner
│   │   │   ├── BackendStatusCard.jsx    # Health verification & manual refresh
│   │   │   ├── LiveCameraPlaceholder.jsx# Camera feed frame (Blueprint 3.0 notice)
│   │   │   ├── StressGaugePlaceholder.jsx # Radial gauge visual (Blueprint 4.0 notice)
│   │   │   ├── RecommendationPlaceholder.jsx # Intervention panel (Blueprint 5.0 notice)
│   │   │   ├── SystemModuleCard.jsx     # Reusable module status card
│   │   │   ├── SystemModulesGrid.jsx    # 4 Module cards grid ("Waiting...")
│   │   │   ├── DevelopmentTimeline.jsx  # 24-Hour Hackathon Roadmap
│   │   │   └── Footer.jsx               # Technology stack & metadata footer
│   │   ├── services/
│   │   │   └── api.js                   # Axios single-fetch health client
│   │   ├── App.jsx                      # Master Dashboard Container
│   │   ├── index.css                    # Tailwind CSS directives & theme
│   │   └── main.jsx                     # React DOM entrypoint
│   ├── index.html                       # Base HTML file
│   ├── package.json                     # Frontend npm dependencies
│   ├── postcss.config.js
│   ├── tailwind.config.js               # Dark mode color palette tokens
│   └── vite.config.js                   # Vite dev server configuration
│
└── README.md
```

---

## ⚡ Quick Start Guide

### 1. Backend Setup (FastAPI)

1. Open a terminal and navigate to the `backend/` directory:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   - **Windows**:
     ```cmd
     python -m venv venv
     venv\Scripts\activate
     ```
   - **macOS/Linux**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Install requirements:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI development server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

5. Verify backend health endpoint:
   - Open browser or curl: `http://localhost:8000/health`
   - Expected Response:
     ```json
     {
       "status": "online",
       "project": "MindGuardian AI",
       "version": "1.0"
     }
     ```

---

### 2. Frontend Setup (React + Vite + Tailwind CSS)

1. Open a second terminal and navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the Vite dev server:
   ```bash
   npm run dev
   ```

4. Access the MindGuardian AI Dashboard:
   - Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔍 Verification Checklist (Success Deliverables)

- [x] Backend starts successfully on port 8000.
- [x] `GET http://localhost:8000/health` returns `{"status": "online", "project": "MindGuardian AI", "version": "1.0"}`.
- [x] React application compiles and runs on port 5173.
- [x] Dashboard renders all 9 sections in modern dark UI.
- [x] Backend status displays `Connected` upon initial startup.
- [x] Manual **Refresh Status** button executes on demand.
- [x] All 4 system module cards display status `"Waiting..."`.
- [x] Every placeholder explicitly displays its future blueprint activation badge.
- [x] Zero console errors and zero runtime warnings.
