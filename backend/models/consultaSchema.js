import mongoose from "mongoose";
import validator from "validator";

const consultaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  imagem: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  preco: {
    type: Number,
    required: true
  },
  emailVeterinario: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Forneça um e-mail válido"]
  },
  celularVeterinario: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return validator.isMobilePhone(v, 'pt-BR', { strictMode: false });
      },
      message: "Número de celular deve estar no formato (XX) 91234-5678"
    }
  },
  status: {
    type: String,
    required: true
  },
  dataEnvio: {
    type: String,
    required: true
  },
  textoAdicional: {
    type: String,
    required: true
  }
});

export const Consulta = mongoose.model("Consulta", consultaSchema);
