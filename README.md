# Złoty Bochen Bakery

Portfolio project for a fictional premium bakery. The goal is to show a freelance-ready business website, not just a pretty landing page: the flagship app includes product storytelling, local pickup locations, API routes, a Prisma data model, and a 3D cake configurator.

## What This Demonstrates

- **Flagship full-stack site:** Next.js, React, TypeScript, Tailwind CSS, Prisma, SQLite, API routes, and React Three Fiber.
- **Client-friendly case study:** `docs/` is a GitHub Pages portfolio page explaining the work and linking to demos.
- **Static version:** `docs/static/` shows a no-build HTML/CSS/JS version suitable for GitHub Pages.
- **PHP version:** `php-variant/` shows a cheap-hosting-friendly cake inquiry form.
- **Anonymized brand:** Złoty Bochen is fictional, so the public repository does not look like an official website for a real company.

## Project Structure

```text
src/                 Next.js flagship app
prisma/              SQLite schema and fictional seed data
docs/                GitHub Pages portfolio and static variant
php-variant/         Small server-rendered PHP inquiry form
```

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

## Publishing Notes

- Keep `.env`, `dev.db`, and `prisma/dev.db` private; they are ignored by git.
- Use GitHub Pages from the `docs/` folder for the public case study.
- Use Vercel or another Node-capable host for the full Next.js app because API routes and Prisma are not supported by GitHub Pages.
- One-click Vercel import: <https://vercel.com/new/clone?repository-url=https://github.com/rogal01/zloty-bochen-bakery>
