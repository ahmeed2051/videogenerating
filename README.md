# Video Idea Workshop

Video Idea Workshop is a small full-stack demo that pairs a Python/Flask backend with a polished single-page frontend. It lets
content teams experiment with platform-specific concepts and instantly receive story beats, visual inspiration, and audio
recommendations tuned to their selections.


## Features

- 🎯 **Adaptive planner** – choose the theme, platform, audience level, and pacing to tailor the outline.
- ⚙️ **Flask API** – `/api/options` exposes planner options while `/api/ideas` returns generated storyboards.
- 🖥️ **Modern UI/UX** – responsive layout, focus states, and accessibility-friendly typography built with vanilla HTML/CSS/JS.
- 🧠 **Rich results** – each idea includes a hook, summary, scene-by-scene outline, visual and audio direction, and a clear call
  to action.
- ⚡ **Demo mode** – the “Try a live demo” button randomizes selections and generates an idea instantly.

## Getting started

### 1. Run the backend API

The backend lives in [`backend/app.py`](backend/app.py) and only depends on Flask.

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

The server listens on <http://localhost:5000> by default.

### 2. Serve the frontend

From the project root, launch a simple static server (any web server works – here’s one using Python):

```bash
cd .. # if you're still in backend/
python -m http.server 8000
```

Open <http://localhost:8000> in your browser. The frontend automatically talks to the backend at
<http://localhost:5000> when running on localhost.

## API reference

### `GET /api/options`
Returns option lists used to populate the planner controls.

```json
{
  "themes": {"education": "Education", "travel": "Travel", …},
  "platforms": {"youtube": "YouTube", "shorts": "YouTube Shorts", …},
  "tones": {"beginner": "Beginner", …},
  "pacings": {"steady": "Balanced", "fast": "Fast-paced", "calm": "Calming"}
}
```

### `POST /api/ideas`
Accepts a JSON payload (any missing fields fall back to defaults).

```json
{
  "theme": "education",
  "platform": "youtube",
  "tone": "beginner",
  "pacing": "steady"
}
```

Response example:

```json
{
  "title": "This micro-class might change your career overnight",
  "hook": "This micro-class might change your career overnight",
  "platform": {"name": "YouTube", "duration": "6-8 minutes", "cta": "…"},
  "tone": "Keep explanations crystal clear and friendly for first-time viewers.",
  "pacing": "Balanced",
  "summary": "Craft a YouTube piece built around…",
  "outline": [{"step": 1, "description": "…", "estimated_time": "12s of the 6-8 minutes runtime"}, …],
  "visuals": ["Clean infographics with animated callouts", …],
  "audio": ["Calm, upbeat background track at -18 LUFS", …],
  "call_to_action": "Drop a comment with the next problem you want solved",
  "generated_at": "2024-05-20T12:34:56.000000Z"
}
```

## Project structure

```
.
├── backend/           # Flask application and requirements
├── index.html         # Single-page UI
├── script.js          # Fetches data and renders results
└── styles.css         # Global design system and layout
```

## Development notes

- The frontend fetches relative URLs. When deployed together (e.g., behind a reverse proxy), serve the API under the same host or
  update `API_BASE` in [`script.js`](script.js).
- Basic CORS headers are applied in the Flask app so the static frontend can run on a different port during development.
- Feel free to extend [`VIDEO_THEMES`](backend/app.py) with additional genres or adjust copy decks to match your brand.
