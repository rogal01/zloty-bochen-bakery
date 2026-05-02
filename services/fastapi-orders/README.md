# Złoty Bochen FastAPI Orders Service

Python backend that mirrors the bakery domain with a small SQLite database. It is intentionally separate from the Next.js app so the portfolio can show a clean API/backend implementation in another language.

## Why This Exists

- Shows Python API work with FastAPI.
- Demonstrates database-backed CRUD-style thinking.
- Gives the same bakery concept a backend that could be consumed by any frontend: Next.js, WordPress, mobile app, or internal dashboard.

## Run Locally

```bash
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Open:

- <http://localhost:8000/docs> for Swagger API docs
- <http://localhost:8000/health>
- <http://localhost:8000/flavors>
- <http://localhost:8000/locations>
- <http://localhost:8000/orders>

The service creates `bakery.db` automatically and seeds fictional flavors and pickup locations on first run.
