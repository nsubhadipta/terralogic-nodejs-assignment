"use strict";
const express = require("express");
const path = require('path');
const fs = require('fs');
const connectDB = require("./config/db");
require("dotenv").config();  
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const router = express.Router();

connectDB();

app.use('/api', router);

//Dynamic Route Path
const routesPath = path.join(__dirname, '/routes');
const routeFiles = fs.readdirSync(routesPath);

routeFiles.forEach((routeFile) => {
  if (routeFile !== 'index.js' && routeFile.endsWith('.js')) {
    const routeModule = require(path.join(routesPath, routeFile));
    routeModule(router); 
  }
});


// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
});


app.get("/api/health", (req, res) => {
  try {
    res.json({ status: 1, message: "Backend Server is Running! 🚀" });
  } catch (error) {
    res.status(403).json({ error: "error occured", message: error });
  }
});

app.get("*", function (req, res) {
  res.status(404).send("Invalid URL..");
});

app.listen(PORT, function () {
  console.log(`Server running on http://localhost:${PORT} 🎉`);
});