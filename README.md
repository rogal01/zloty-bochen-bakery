# Zloty Bochen Bakery

A fictional bakery website built with Next.js, TypeScript, Prisma, SQLite, Tailwind CSS, and a 3D cake configurator.

## Requirements

- Node.js 20+
- npm

## Setup

```bash
npm install
copy .env.example .env
npm run db:push
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev      # local development
npm run build    # production build
npm run start    # run the production build
npm run lint     # lint the code
npm run db:push  # create/update the local SQLite database
npm run db:seed  # add starter bakery data
```

## Environment

The app uses SQLite through Prisma. For local development:

```env
DATABASE_URL="file:./dev.db"
```

The generated database file is ignored by git.

## Main Folders

```text
src/      Next.js app, API routes, components, and local data fallback
prisma/   Prisma schema and seed script
```

## Production

```bash
npm install
npm run db:push
npm run db:seed
npm run build
npm run start
```

For deployment, use a Node-capable host such as Vercel, Render, Railway, or a VPS.
