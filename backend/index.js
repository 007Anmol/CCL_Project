import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Middleware for parsing JSON and form-data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Basic route
app.get("/", (req, res) => {
  return res.status(234).send("Im Anmol");
});

// Book routes (handles books + file upload now)
app.use("/books", bookRoute);

// MongoDB connection
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("✅ App connected to the database");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("❌ MongoDB Connection Error:", error.message);
  });
