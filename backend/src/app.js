import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDB from './config/db.js';
// import chatRoutes from './routes/chatRoutes.js';




const app = express();

app.use(cors());
app.use(express.json());

console.log(`mongodb uri: ${process.env.MONGODB_URI}`);

connectDB();

export default app;