import express from "express";
import cors from "cors";
import os from 'os';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Привет изf Exprhhesrs!" });
});

app.listen(3000, () => {
    console.log("🚀 Сервер запущен на http://localhost:3000");
});

console.log(os.platform());
