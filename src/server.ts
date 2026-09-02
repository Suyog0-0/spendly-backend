// app.get("/path", (req,res) => {...})
// app.post("/path", (req,res) => {...})

import express from "express";
import dotenv from "dotenv";
import { getHealth } from "./controllers/healthController.js";
import { connectDB } from "./config/db.js";

dotenv.config();
console.log("MongoURI is", process.env.MONGO_URI ? "SET" : "MISSING");
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.get("/", getHealth);

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});

// docker run -p 5050:5050 --env-file .env --name spendly-backend-container spendly-backend
