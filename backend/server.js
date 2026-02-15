const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Game route
app.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`Classic Conquest running on http://localhost:${PORT}`);
});
