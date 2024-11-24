import dotenv from "dotenv";
import { Consulta } from "../models/consultaSchema.js";
import { Agendamento } from "../models/agendamentoSchema.js";
import { MinhaLista } from "../models/minhaListaSchema.js";
import { Pagamento } from "../models/pagamentoSchema.js";
import Stripe from "stripe";
import mongoose from "mongoose";

dotenv.config({ path: "./config/config.env" });

const stripe = new Stripe(process.env.PAGAMENTO_SECRET);

// CRIAR PAYMENT INTENT STRIPE
export const CriarPaymentIntent = async (req, res) => {
  try {
    const { preco } = req.body;
    if (!preco || isNaN(preco)) {
      return res.status(400).send({ error: "O campo 'preco' é obrigatório e deve ser um número." });
    };
    const total = parseInt(preco) * 100;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "brl",
      payment_method_types: ["card"],
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// POST INFO DE PAGAMENTO NO BD
export const PagamentoInfo = async (req, res) => {
  try {
    const pagamentoInfo = req.body;
    const { consultasId, emailUsuario, transacaoId, nome } = pagamentoInfo;
    const umaConsultaId = req.query.consultaId;
    if (!nome) {
      return res.status(400).send({ error: "O campo 'nome' é obrigatório." });
    }
    if (!transacaoId) {
      return res.status(400).send({ error: "O campo 'transacaoId' é obrigatório." });
    }
    const consultaIds = consultasId?.map((id) => new mongoose.Types.ObjectId(id)) || [];
    const consultaIdUnico = umaConsultaId
      ? [new mongoose.Types.ObjectId(umaConsultaId)]
      : consultaIds;
    const novoAgendamento = {
      emailUsuario,
      consultaId: consultaIdUnico,
      transacaoId: new mongoose.Types.ObjectId(transacaoId), 
      nome,
    };
    const consultasQuery = { _id: { $in: consultaIds } };
    const consultas = await Consulta.find(consultasQuery);
    const updatedDoc = {
      $set: {
        totalMarcado: consultas.reduce((total, atual) => total + atual.totalMarcado, 0) + 1 || 0,
        horariosDisponiveis: consultas.reduce((total, atual) => total + atual.horariosDisponiveis, 0) - 1 || 0
      },
    };
    const atualizadoResult = await Consulta.updateMany(consultasQuery, updatedDoc, { upsert: true });
    const agendamentoResult = await Agendamento.create(novoAgendamento);
    const removidoResult = await MinhaLista.deleteMany({ consultaId: { $in: consultaIds }, emailUsuario });
    const pagamentoResult = await Pagamento.create(pagamentoInfo);
    res.send({ pagamentoResult, removidoResult, agendamentoResult, atualizadoResult });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// GET HISTORICO DE PAGAMENTOS
export const PagamentoHistorico = async (req, res) => {
  const emailUsuario = req.params.email;
  const query = { emailUsuario: emailUsuario };
  const result = await Pagamento.find(query).sort({horario: -1});
  res.send(result);
}

// TAMANHO DO HISTORICO
export const PagamentoHistoricoTamanho = async (req, res) => {
  const emailUsuario = req.params.email;
  const query = { emailUsuario: emailUsuario };
  const total = await Pagamento.countDocuments(query);
  res.send({total});
}