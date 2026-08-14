# Redline Garage

An auto parts e-commerce catalog — browse categories, brands, and products, filter/sort the catalog, and save items to a wishlist. Built with Express, EJS, and PostgreSQL.

Live at [redline-garage.onrender.com](https://redline-garage.onrender.com)

## Tech stack

- **Backend:** Node.js, Express 5
- **Views:** EJS
- **Database:** PostgreSQL ([Neon](https://neon.tech)), via `pg`
- **Images:** `sharp` for processing product images fetched from the Pexels API

## Features

- Browse products by category and brand
- Filter products by category, brand, price range, and stock; sort by name or price
- Product detail pages with related products
- Wishlist (add/remove items, persisted in the database)

## Getting started

### Prerequisites

- Node.js
- A PostgreSQL database (e.g. a free [Neon](https://neon.tech) project)

### Setup

```bash
npm install
cp .env.example .env
```

Fill in `.env`:

```
DATABASE_URL=postgresql://<user>:<password>@<host>/<database>?sslmode=require
```

Seed the database (categories, brands, sample products):

```bash
npm run seed
```

Optionally fetch product images from Pexels (requires `PEXELS_API_KEY` in `.env`):

```bash
npm run images
```

Run the dev server:

```bash
npm run dev
```

The app runs on `http://localhost:3000` by default (or `$PORT` if set).

## Scripts

| Script | Description |
|---|---|
| `npm start` | Run the app |
| `npm run dev` | Run the app with nodemon (auto-restart) |
| `npm run seed` | Populate the database with categories, brands, and products |
| `npm run images` | Fetch and process product images |
