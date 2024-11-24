import express from "express";
import { ConsultasPopulares, VeterinariosPopulares, AdminStatus, VeterinariosTodos, ConsultasVeterinario, VeterinarioSolicitar, VeterinariosEmail } from "../controller/agendamento.js";
import { TokenVerificar } from "../middlewares/token.js";
import { AdminVerificar } from "../middlewares/admin.js";

const router = express.Router();

router.get("/admin-status", TokenVerificar, AdminVerificar, AdminStatus);
router.get("/consultas-populares", ConsultasPopulares);
router.get("/consultas-veterinarios/:email", TokenVerificar, ConsultasVeterinario);
router.get("/veterinarios", VeterinariosTodos);
router.get("/veterinarios-populares", VeterinariosPopulares);
router.get("/veterinarios/:email", VeterinariosEmail);
router.post("/veterinario-solicitar/", VeterinarioSolicitar);



export default router;