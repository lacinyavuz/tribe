# Feature Usage Tracker Prototype

This repository contains a lightweight prototype for tracking feature usage in real time. It is composed of a Node.js backend with a SQLite database and a React frontend built with Vite.

## Architecture
- **Node.js / Express** server (`server.js`) provides REST APIs to log feature events and retrieve aggregated usage data.
- **better-sqlite3** is used for a simple embedded database. Two tables are created: `features` and `events`.
- **React** frontend (`frontend/`) fetches usage data from the backend and visualises trends using `react-chartjs-2`.

The backend also serves the built frontend for production deployment.

## Setup
1. Install dependencies and build the frontend:
   ```bash
   npm run build
   ```
2. Start the server:
   ```bash
   npm start
   ```
   The server listens on port 3000.

During development you can run `npm start` and separately `npm --prefix frontend run dev` to enable hot reloading for the React app.

## API Overview
- `POST /api/events` – log a feature usage event. Body parameters: `feature`, `user`, `account`, `location`.
- `GET /api/usage` – retrieve aggregated counts per feature for a time range.
- `GET /api/trend` – hourly counts for a single feature within a time range.

This prototype is intended to demonstrate the basic data flow and can be extended with authentication, additional filtering, and persistent storage.
