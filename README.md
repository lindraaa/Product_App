# Product_App

A small example full-stack product app with a Node/Express backend and a Vite + React frontend. It demonstrates basic CRUD for products and a minimal project structure so you can run and extend it quickly.

## Quick start

Prerequisites: Node.js (16+), npm or yarn.

1. Install backend dependencies and start the server

```bash
cd backend
npm install
node server.js
```

2. Install frontend dependencies and run the dev server

```bash
cd frontend
npm install
npm run dev
```

Open the frontend in your browser (Vite will show the URL, typically http://localhost:5173).

## Project structure

- `backend/` - Express server and API

  - `server.js` - entry point
  - `controllers/` - request handlers
  - `models/` - data models (simple file-based or DB config)
  - `routes/` - API routes

- `frontend/` - Vite + React app
  - `src/` - React source code
  - `public/` - static assets

## API (examples)

Assuming the backend runs on http://localhost:3000

- GET /products — list products
- POST /products — create a product
- GET /products/:id — get one product
- PUT /products/:id — update a product
- DELETE /products/:id — delete a product

## Notes

- This README is intentionally concise. For changes to environment, ports, or DB, check `backend/server.js` and `backend/config/db.js`.
- Add tests, environment files, and production scripts as needed.

## License

MIT
