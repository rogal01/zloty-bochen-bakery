# Romanowski Bakery

Business website concept for a bakery/cake shop with a product offer, locations, responsive layout, and an online cake configurator.

This project is meant to show a practical full-stack website for a local business: not only a visual landing page, but also a configurable order flow, API routes, and database-backed content.

## Portfolio Summary

- Modern business website built with **Next.js**, **React**, and **TypeScript**.
- Product and location sections designed for a real local company.
- Cake configurator with shape, weight, flavor, text, pickup date, and price summary.
- 3D cake preview using React Three Fiber / Three.js.
- API routes for flavors, locations, and orders.
- Prisma schema for locations, flavors, and order records.
- Responsive structure suitable for desktop and mobile screenshots.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Prisma
- SQLite
- React Three Fiber / Three.js
- Lucide React

## Useme Screenshot Plan

1. Hero section.
2. Product/offers section.
3. Cake configurator with 3D preview.
4. Order/pickup step.
5. Mobile layout.

## Local Development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Production Check

```bash
npm run lint
npm run build
```

## Portfolio Notes

Before publishing this repository publicly:

- Commit the current untracked `src/components`, `src/app/api`, `src/lib`, and `prisma` files.
- Do not publish local database files with private/test orders.
- Replace placeholder images with final screenshots or generated assets if needed.
- Verify Polish text in the browser before taking screenshots.
