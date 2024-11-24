import ErrorHandler from "../middlewares/error.js";
import { MinhaLista } from "../models/minhaListaSchema.js";

// ADICIONAR ITEM A MINHA-LISTA
export const AdicionarMinhaLista = async (req, res, next) => {
  const { email, consultaId, data } = req.body;

  try {
    // Verificar se o item já existe
    const itemExistente = await MinhaLista.findOne({ email, consultaId });

    if (itemExistente) {
      return res.status(400).json({
        sucesso: false,
        message: "Item já está na sua lista.",
      });
    }

    // Criar o item se não existir
    await MinhaLista.create({ data, email, consultaId });
    res.status(201).json({
      sucesso: true,
      message: "Item adicionado à Minha Lista com sucesso!",
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }
    return next(error);
  }
};

// GET ITEM DA MINHA-LISTA PELO ID
export const ListarMinhaListaDetalhes = async (req, res) => {
  const id = req.params.id;
  const email = req.query.email;
  const query = {
    consultaId: id, 
    email: email
  };
  const result = await MinhaLista.findOne(query, { consultaId: 1 });
  res.send(result);
};

// GET MINHA-LISTA USANDO EMAIL
export const ListarMinhaListaEmail = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  const projection = { consultaId: 1 }; 
  const minhaListas = await MinhaLista.find(query, projection);
  const consultasIds = minhaListas.map((minhaLista) => minhaLista.consultaId);
  const query2 = { consultaId: { $in: consultasIds } };
  const result = await MinhaLista.find(query2);
  res.send(result);
};

// REMOVER ITEM DA MINHA-LISTA USANDO ID DA CONSULTA
export const RemoverMinhaLista = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { consultaId: id };
    const result = await MinhaLista.deleteOne(query);
    if (result.deletedCount === 0) {
      return res.status(404).send({ success: false, message: "Item não encontrado." });
    }
    res.status(200).send({ success: true, message: "Item removido com sucesso." });
  } catch (error) {
    res.status(500).send({ success: false, message: "Erro interno do servidor." });
  }
};



