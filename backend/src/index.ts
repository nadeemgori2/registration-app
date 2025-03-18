import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import customerRoutes from "./routes/customerRoutes";

dotenv.config();

// Connect to MongoDB
connectDB();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/customers", customerRoutes);

// Define PORT
const PORT: number = parseInt(process.env.PORT || "5000", 10);

// Start the server with error handling
app
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Server startup error:", err);
  });
