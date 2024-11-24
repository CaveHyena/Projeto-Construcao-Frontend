import express from "express";
import { AdicionarVeterinario, Veterinarios} from "../controller/veterinario.js";

const router = express.Router();

router.get("/", Veterinarios);
router.post("/adicionar", AdicionarVeterinario);

export default router;