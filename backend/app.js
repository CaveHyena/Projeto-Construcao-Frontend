import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import { dbConnection } from "./database/dbConnection.js";
import usuariosRouter from "./routes/usuariosRoute.js";
import veterinariosRouter from "./routes/veterinariosRoute.js";
import consultasRouter from "./routes/consultasRoute.js";
import minhaListaRouter from "./routes/minhaListaRoute.js";
import pagamentoRouter from "./routes/pagamentoRoute.js";
import agendamentoRouter from "./routes/agendamentoRoute.js";

dotenv.config({ path: "./config/config.env" });

const app = express(); // Instância do aplicativo Express, para iniciar e configurar o servidor;

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/usuarios", usuariosRouter);
app.use("/veterinarios", veterinariosRouter);
app.use("/consultas", consultasRouter);
app.use("/minha-lista", minhaListaRouter);
app.use("/pagamento", pagamentoRouter);
app.use("/agendamento", agendamentoRouter);

app.get("/", (req, res, next)=>{return res.status(200).json({
  sucesso: true
})})

dbConnection();

app.use(errorMiddleware);

export default app;
