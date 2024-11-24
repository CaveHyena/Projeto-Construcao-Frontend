import express from "express";
import { CriarPaymentIntent, PagamentoInfo, PagamentoHistorico, PagamentoHistoricoTamanho } from "../controller/pagamento.js";
import { TokenVerificar } from "../middlewares/token.js";

const router = express.Router();

router.post("/stripe", CriarPaymentIntent);
router.post("/Info", TokenVerificar, PagamentoInfo);
router.get("/historico/:email", PagamentoHistorico);
router.get("/historico-tamanho/:email", PagamentoHistoricoTamanho)

export default router;