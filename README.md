# 📊 Feature Usage Tracker

**Feature Usage Tracker** is a full-stack prototype that records feature interactions and displays them with charts.

![Vite Logo](client/public/vite.svg)
![React Logo](client/src/assets/react.svg)

## 🏗 Architecture
- **Node.js / Express** API in `server/` with a lightweight SQLite database powered by **better-sqlite3**.
- **React + Vite** frontend in `client/` using `react-chartjs-2` for visualisations.

## 🚀 Quick Start
For development, run the API and client separately:
   ```bash
   npm --prefix server run dev
   npm --prefix client run dev
   ```

## 📡 API Endpoints
- `POST /api/events` – log a feature usage event with optional `user`, `account` and `location` fields.
- `GET /api/usage` – aggregated counts per feature for a time range.
- `GET /api/trend` – hourly counts for a single feature within a time range.
- `GET /api/events` – raw event list with query filters.

## 📂 Project Structure
```
server/   # Express API and SQLite database
client/   # React frontend powered by Vite
```

## 🧪 Tests
Unit tests can be run with
```bash
npm --prefix server test
npm --prefix client test
```

This prototype demonstrates a basic flow and can be extended with authentication, persistent storage and more charts.
