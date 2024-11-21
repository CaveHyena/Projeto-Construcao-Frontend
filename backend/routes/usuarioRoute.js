import express from "express";
import Cadastrar from "../controller/usuario.js";

const router = express.Router();

router.post("/login/cadastrar", Cadastrar);

export default router;
