import express from "express";
import cors from "cors";
import os from 'os';
import mongoose from 'mongoose';
import { router } from './auth/authRouter.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', router);

app.get("/", (req, res) => {
    res.json({ message: "Привет изf Exprhhesrs!" });
});


const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://user:12345@cluster0.0rlqoqz.mongodb.net/?appName=Cluster0`);
    app.listen(PORT, () => {
      console.log("🚀 Сервер запущен на http://localhost:3000");
    });
  } catch (e) {
    console.error(e);
  }
}

start();
console.log(os.platform());
