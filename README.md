# Złoty Bochen Bakery

Portfolio project for a fictional premium bakery. The goal is to show a freelance-ready business website, not just a pretty landing page: the flagship app includes product storytelling, local pickup locations, API routes, a Prisma data model, and a 3D cake configurator.

## What This Demonstrates

- **Flagship full-stack site:** Next.js, React, TypeScript, Tailwind CSS, Prisma, SQLite, API routes, and React Three Fiber.
- **Client-friendly case study:** `docs/` is a GitHub Pages portfolio page explaining the work and linking to demos.
- **Portfolio screenshots:** `docs/screenshots/` contains ready-to-use example shots from the running site.
- **Static version:** `docs/static/` shows a no-build HTML/CSS/JS version suitable for GitHub Pages.
- **PHP version:** `php-variant/` shows a cheap-hosting-friendly cake inquiry form.
- **Python backend:** `services/fastapi-orders/` shows a FastAPI service with SQLite-backed flavors, locations, and orders.
- **WordPress theme:** `wordpress-theme/zloty-bochen/` shows a client-editable theme with custom post types and saved inquiries.
- **Anonymized brand:** Złoty Bochen is fictional, so the public repository does not look like an official website for a real company.

## Project Structure

```text
src/                 Next.js flagship app
prisma/              SQLite schema and fictional seed data
docs/                GitHub Pages portfolio and static variant
php-variant/         Small server-rendered PHP inquiry form
services/            Standalone backend services, including FastAPI
wordpress-theme/     WordPress theme version for client-editable sites
```

## Database Story

The database is what turns this from a brochure into a business system.

- **Next.js + Prisma + SQLite:** shows typed database modeling for locations, flavors, and cake orders inside the flagship app.
- **FastAPI + SQLite:** shows the same backend idea in Python, with API endpoints that any frontend can consume.
- **WordPress + MySQL/MariaDB:** shows the client-friendly version, where cakes, locations, and inquiries live in the WordPress admin database.

For a bakery, this matters because prices, flavors, pickup locations, and order requests change all the time. A database lets the owner update content, review orders, avoid losing inquiries, and eventually build dashboards, status tracking, customer history, or email/SMS notifications.

## Local Development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Seed the demo database when needed:

```bash
npx prisma db push
npx prisma db seed
```

## Production Check

```bash
npm run lint
npm run build
```

## PHP Variant

```bash
cd php-variant
php -S localhost:8080
```

Open <http://localhost:8080>.

## FastAPI Backend

```bash
cd services/fastapi-orders
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Open <http://localhost:8000/docs>.

## WordPress Theme

Copy `wordpress-theme/zloty-bochen` into `wp-content/themes/zloty-bochen`, activate it in WordPress, then add cakes and locations in the admin. Inquiry form submissions are stored as private WordPress posts.

## Publishing Notes

- Keep `.env`, `dev.db`, and `prisma/dev.db` private; they are ignored by git.
- Use GitHub Pages from the `docs/` folder for the public case study.
- Use Vercel or another Node-capable host for the full Next.js app because API routes and Prisma are not supported by GitHub Pages.
- One-click Vercel import: <https://vercel.com/new/clone?repository-url=https://github.com/rogal01/zloty-bochen-bakery>
