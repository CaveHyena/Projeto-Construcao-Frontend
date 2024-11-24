import mongoose from "mongoose";
import validator from "validator";

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Forneça um e-mail válido"],
  },
  celular: {
    type: String,
    required: [true, "Número de celular é obrigatório."],
    validate: {
      validator: function(v) {
        return validator.isMobilePhone(v, 'pt-BR', { strictMode: false });
      },
      message: "Número de celular deve estar no formato (XX) 91234-5678"
    }
  },
  fotoUrl: {
    type: String,
    required: true,
    default: 'https://cdn-icons-png.flaticon.com/512/3404/3404932.png'
  },
  cargo: {
    type: String,
    default: "usuario"
  }
});

export const Usuario = mongoose.model("Usuario", usuarioSchema);
