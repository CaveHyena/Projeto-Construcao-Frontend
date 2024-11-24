import mongoose from "mongoose";
import validator from "validator";

const veterinarioSchema = new mongoose.Schema({
  nomeVeterinario: {
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
  especializacao: {
    type: String,
    required: true,
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

export const Veterinario = mongoose.model("Veterinario", veterinarioSchema);
