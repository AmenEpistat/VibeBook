import express from "express";
import cors from "cors";
import os from 'os';
import mongoose from 'mongoose';
import 'dotenv/config';
import { router } from './auth/authRouter.js';
import cookieParser from 'cookie-parser';
import errorMiddleware from './common/middleware/errorMiddleware.js'

const PORT = process.env.PORT;

const app = express();

app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/auth', router);
app.use(errorMiddleware);

app.get("/", (req, res) => {
	res.json({ message: "Привет изf Exprhhesrs!" });
});


const start = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		app.listen(PORT, () => {
			console.log("🚀 Сервер запущен на http://localhost:3000");
		});
	} catch (e) {
		console.error(e);
	}
}

start();
console.log(os.platform());
