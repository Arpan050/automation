import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import articleRoutes from "./routes/article.routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173",
    "https://automation-rosy.vercel.app",]
  })
);

app.use(express.json());

connectDB();

app.use("/articles", articleRoutes);

export default app;
