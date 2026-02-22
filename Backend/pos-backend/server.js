import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

import helmet from "helmet"; // MANUAL IMPROVEMENT: Security headers
import rateLimit from "express-rate-limit"; // MANUAL IMPROVEMENT: Rate limiting

dotenv.config();

const app = express();

// 1. Security Headers: Protects against XSS, clickjacking, and hides server technology
app.use(helmet());

// 2. Rate Limiting: Prevents DDoS/Brute Force by limiting requests per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 100, // Limit each IP to 100 requests per 15 mins
  message: {
    message: "Too many requests from this IP, please try again after 15 minutes"
  }
});
app.use("/api/", limiter); // Apply only to API routes

// Middleware
app.use(cors());
app.use(express.json());

// Database
connectDB();

// Routes
app.use("/api/products", productRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("POS Inventory API Running...");
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});