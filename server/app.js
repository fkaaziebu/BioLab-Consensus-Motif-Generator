const express = require("express");
const analyzeRoutes = require("./routes/analyze");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// API ENDPOINTS
app.use(analyzeRoutes);

module.exports = app;
