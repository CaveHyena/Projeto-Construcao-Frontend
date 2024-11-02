import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "Primeiro nome deve conter pelo menos 3 letras."],
    maxLength: [30, "Primeiro nome não deve exceder 30 letras."],
  },
  lastName: {
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
  phone: {
    type: String,
    required: true,
    minLength: [9, "Número de telefone deve estar no formato (XX) XXXXX-XXXX"],
    maxLength: [9, "Número de telefone deve estar no formato (XX) XXXXX-XXXX"],
  },
  time: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
