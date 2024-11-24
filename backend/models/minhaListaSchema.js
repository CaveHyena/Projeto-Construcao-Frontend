import mongoose from "mongoose";
import validator from "validator";

const minhaListaSchema = new mongoose.Schema({
  data: {
    type: Date,
    require: true
  },
  consultaId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  email: {
    type: String,
    require: true
  },
});

export const MinhaLista = mongoose.model("Minha-Lista", minhaListaSchema);
