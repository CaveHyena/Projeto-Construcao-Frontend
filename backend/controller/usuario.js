import ErrorHandler from "../middlewares/error.js";
import { Usuario } from "../models/usuariosSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

// DEFINIR TOKEN
export const Token = async (req, res) => {
  const usuario = req.body;
  const token = jwt.sign(usuario, process.env.TOKEN_SECRET, {
    expiresIn: "24h"
  });
  res.send({ token });
};

// CRIAR USUARIO
export const Cadastrar = async (req, res, next) => {
  const { nome, email, fotoUrl, cargo, celular } = req.body; 
  try {
    await Usuario.create({ nome, fotoUrl, email, cargo, celular });
    res.status(201).json({
      success: true,
      message: "Cadastrado com sucesso!",
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }
    return next(error);
  }
};

// LISTAR TODOS USUARIOS
export const Usuarios = async (req, res) => {
  const result = await Usuario.find({});
  res.send(result);
}

// LISTAR USUARIO POR ID
export const UsuariosId = async (req, res) => {
  const id = req.params.id;
  const query = { _id: id };
  const result = await Usuario.findOne(query);
  res.send(result);
}

// LISTAR USUARIO POR EMAIL
export const UsuariosEmail = async (req, res) => {
  const email = req.params.email;
  const result = await Usuario.findOne({ email });
  res.send(result);
}

// REMOVER USUARIO
export const UsuarioRemover = async (req, res) => {
  const id = req.params.id;
  const result = await Usuario.deleteOne(id);
  res.send(result);
}

// ATUALIZAR USUARIO
export const UsuarioAtualizar = async (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  const filter = { _id: id};
  const opcoes = { upsert: true };
  const updatedDoc = {
    $set: {
      nome: updatedUser.nome,
      email: updatedUser.email,
      cargo: updatedUser.opcao,
      endereco: updatedUser.endereco,
      sobre: updatedUser.sobre,
      fotoUrl: updatedUser.fotoUrl,
      especializacoes: updatedUser.especializacoes ? updatedUser.especializacoes : null
    }
  };
  const result = await Usuario.updateOne(filter, updatedDoc, opcoes);
  res.send
}