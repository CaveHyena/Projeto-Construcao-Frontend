import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import appointmentRouter from "./routes/appointmentRoute.js";
import { dbConnection } from "./database/dbConnection.js";

const app = express(); // Instância do aplicativo Express, para iniciar e configurar o servidor

dotenv.config({ path: "./config/config.env" }); // Carrega variáveis de ambiente do arquivo .env para process.env

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/appointment", appointmentRouter);

app.get("/", (req, res, next)=>{return res.status(200).json({
  sucesso: true,
  message: "HELLO WORLD AGAIN"
})})

dbConnection();

app.use(errorMiddleware);

export default app;
