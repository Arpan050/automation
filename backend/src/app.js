import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import articleRoutes from './routes/article.routes.js';
// import chatRoutes from './routes/chatRoutes.js';


const app = express();

app.use(cors());
app.use(express.json());

console.log(`mongodb uri: ${process.env.MONGODB_URI}`);

connectDB();


app.use("/articles", articleRoutes);

export default app;