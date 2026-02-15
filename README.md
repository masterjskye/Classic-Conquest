# Classic Conquest

A lightweight browser-based prototype of a turn-based strategy game.

## Project structure

- `backend/server.js` – Node.js HTTP backend that serves the frontend and provides `/api/health`.
- `frontend/index.html` – game page markup.
- `frontend/styles.css` – board and layout styling.
- `frontend/game.js` – game state, movement, turn logic, and enemy AI.

## Requirements

- Node.js 18+ (Node.js 20 recommended)
- npm

## Install dependencies

```bash
npm install
```

## Run the server

```bash
npm start
```

The app runs at `http://localhost:3000`.

## Open the game in a browser

Use either:

- `http://localhost:3000/`
- `http://localhost:3000/game`

## Clone and run locally

```bash
git clone https://github.com/masterjskye/Classic-Conquest.git
cd Classic-Conquest
npm install
npm start
```
