// app.get("/path", (req,res) => {...})
// app.post("/path", (req,res) => {...})

import express from "express";
import dotenv from "dotenv";
import {getHealth} from "../src/routes/healthController.js"

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.get("/", getHealth); 

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});

// docker run -p 5050:5050 --env-file .env --name spendly-backend-container spendly-backend