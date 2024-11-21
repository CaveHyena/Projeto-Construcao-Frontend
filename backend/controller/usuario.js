import ManipuladoreDeErros from "../middlewares/error.js";
import { Usuario } from "../models/usuarioSchema.js";

const Cadastrar = async (req, res, next) => {
  const { nome, sobrenome, email, date, time, phone } = req.body; 
  if (!nome || !sobrenome || !email || !date || !time || !phone) {
    return next(new ManipuladoreDeErros("Por favor preencha todo o formulário de agendamento!", 400));
  }

  try {
    await Usuario.create({ nome, sobrenome, email, date, time, phone });
    res.status(201).json({
      success: true,
      message: "Visita marcada com sucesso!",
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ManipuladoreDeErros(validationErrors.join(', '), 400));
    }
    return next(error);
  }
};


export default Cadastrar;

