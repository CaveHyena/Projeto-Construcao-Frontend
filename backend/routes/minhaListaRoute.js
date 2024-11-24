import express from "express";
import { AdicionarMinhaLista, ListarMinhaListaDetalhes, ListarMinhaListaEmail, RemoverMinhaLista } from "../controller/minhaLista.js";
import { TokenVerificar } from "../middlewares/token.js";

const router = express.Router();

router.post("/adicionar", TokenVerificar, AdicionarMinhaLista);
router.get("/exibir/:id", TokenVerificar, ListarMinhaListaDetalhes);
router.get("/:email", ListarMinhaListaEmail);
router.delete("/remover/:id", TokenVerificar, RemoverMinhaLista)

export default router;
