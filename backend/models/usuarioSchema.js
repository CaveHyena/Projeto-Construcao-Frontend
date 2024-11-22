import mongoose from "mongoose";
import validator from "validator";

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    minLength: [3, "Primeiro nome deve conter pelo menos 3 letras."],
    maxLength: [30, "Primeiro nome não deve exceder 30 letras."],
  },
  sobrenome: {
    type: String,
    required: true,
    minLength: [3, "Sobrenome deve conter pelo menos 3 letras."],
    maxLength: [30, "Sobrenome não deve exceder 30 letras."],
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Forneça um e-mail válido"],
  },
  phone: {
    type: String,
    required: [true, "Número de celular é obrigatório."],
    validate: {
      validator: function(v) {
        return validator.isMobilePhone(v, 'pt-BR', { strictMode: false });
      },
      message: "Número de celular deve estar no formato (XX) 91234-5678"
    }
  }
});

export const Usuario = mongoose.model("Usuario", usuarioSchema);