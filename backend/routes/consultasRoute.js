import express from "express";
import { AdicionarConsulta, ListarConsultasStatusAprovado, ListarConsultasEmail, ListarConsultas, AtualizarStatusTexto, ListarConsultasDetalhes, Atualizar } from "../controller/consulta.js";
import { TokenVerificar } from "../middlewares/token.js";
import { VeterinarioVerificar } from "../middlewares/veterinario.js";
import { AdminVerificar } from "../middlewares/admin.js";

const router = express.Router();

router.post("/adicionar", AdicionarConsulta);
router.get("/", ListarConsultas);
router.get("/:email", TokenVerificar, VeterinarioVerificar, ListarConsultasEmail);
router.get("/exibir/:id", ListarConsultasDetalhes);
router.get("/status/aprovado", ListarConsultasStatusAprovado);
router.put("/atualizar/:id", TokenVerificar, VeterinarioVerificar, Atualizar);
router.patch("/atualizar/status-texto/:id", TokenVerificar, AdminVerificar, AtualizarStatusTexto);


export default router;