import ErrorHandler from "../middlewares/error.js";
import { Usuario } from "../models/usuariosSchema.js";
import { Veterinario } from "../models/veterinarioSchema.js";


export const AdicionarVeterinario = async (req, res, next) => {
  const { nomeVeterinario, emailVeterinario, imagem, descricao, status, dataEnvio, textoAdicional, especializacao } = req.body;

  try {
    const novoVeterinario = await Veterinario.create({ nomeVeterinario, emailVeterinario, imagem, descricao, status, dataEnvio, textoAdicional, especializacao });

    res.status(201).json({
      success: true,
      message: "Veterinário adicionado com sucesso!",
      veterinario: novoVeterinario
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }
    return next(error);
  }
};

export const Veterinarios = async (req, res) => {
  const result = await Veterinario.find({});
  res.send(result);
}

