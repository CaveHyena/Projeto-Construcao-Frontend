import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import usuarioRouter from "./routes/usuarioRoute.js";
import { dbConnection } from "./database/dbConnection.js";

dotenv.config({ path: "./config/config.env" }); 

const app = express(); 

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/login", usuarioRouter);
app.get("/", (req, res, next) => {
  return res.status(200).json({ success: true })
});

dbConnection();

app.use(errorMiddleware);

export default app;
