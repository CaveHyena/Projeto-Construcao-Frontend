import mongoose from "mongoose";
import validator from "validator";

const agendamentoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  consultaId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  transacaoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  emailUsuario: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Forneça um e-mail válido"]
  },
});

export const Agendamento = mongoose.model("Agendamento", agendamentoSchema);
