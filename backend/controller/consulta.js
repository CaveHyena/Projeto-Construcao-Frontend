import ErrorHandler from "../middlewares/error.js";
import { Consulta } from "../models/consultaSchema.js";
import { Veterinario } from "../models/veterinarioSchema.js";

// ADICIONAR CONSULTAS
export const AdicionarConsulta = async (req, res, next) => {
  const { titulo, emailVeterinario, imagem, descricao, status, dataEnvio, textoAdicional, preco } = req.body;

  try {
    await Consulta.create({ titulo, emailVeterinario, imagem, descricao, status, dataEnvio, textoAdicional, preco });
    res.status(201).json({
      sucesso: true,
      message: "Consulta adicionada com sucesso!",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }
    return next(error);
  }
};


// LISTAR SOMENTE AS CONSULTAS COM STATUS APROVADO
export const ListarConsultasStatusAprovado = async (req, res) => {
  const query = { status: "aprovado" };
  const result = await Consulta.find(query);
  res.send(result);
};

// GET CONSULTAS PELO EMAIL
export const ListarConsultasEmail = async (req, res) => {
  const email = req.params.email;
  const query = {emailVeterinario: email};
  const result = await Consulta.find(query);
  res.send(result);
};

// LISTAR TODAS CONSULTAS
export const ListarConsultas = async (req, res) => {
  const result = await Consulta.find();
  res.send(result);
}

// ATUALIZAR STATUS E TEXTOADCIONAL PELO ID 
export const AtualizarStatusTexto = async (req, res) => {
  const id = req.params.id;
  const { status, textoAdicional } = req.body;
  const query = { _id: id }; 
  const updateDoc = {
    status: status,
    textoAdicional: textoAdicional,
  };
  const options = { upsert: true };
  const result = await Consulta.updateOne(query, { $set: updateDoc }, options);
  res.send(result); 
};

// GET DETALHES DE UMA CONSULTA ESPECÍFICA COM ID
export const ListarConsultasDetalhes = async (req, res) => {
    const id = req.params.id;
    const result = await Consulta.findById(id);
    res.send(result);
};


// ATUALIZAR TODOS OS DADOS DE UMA CONSULTA
export const Atualizar = async (req, res) => {
  const id = req.params.id;
  const { nome, titulo, emailVeterinario, imagem, celularVeterinario, descricao, status, textoAdicional } = req.body;
  const query = { _id: id }; 
  const updateDoc = {
    nome: nome,
    titulo: titulo,
    emailVeterinario: emailVeterinario,
    imagem: imagem,
    celularVeterinario: celularVeterinario,
    descricao: descricao,
    status: status,
    textoAdicional: textoAdicional,
  };
  const options = { upsert: true };
  const result = await Consulta.updateOne(query, { $set: updateDoc }, options);
  res.send(result); 
}
   