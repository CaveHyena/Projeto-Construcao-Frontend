import mongoose from "mongoose";
import validator from "validator";

const pagamentoSchema = new mongoose.Schema({
  transacaoId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
  },
  consultaId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
  },
  formaPagamento: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true
  },
  moeda: {
    type: String,
    required: true,
  },
  pagamentoStatus: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  emailUsuario: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Forneça um e-mail válido"],
  },
  horario: {
    type: String,
    required: true,
  },
});

export const Pagamento = mongoose.model("Pagamento", pagamentoSchema);
