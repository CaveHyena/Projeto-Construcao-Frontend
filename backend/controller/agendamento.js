import { Agendamento } from "../models/agendamentoSchema.js";
import { Consulta } from "../models/consultaSchema.js";
import { Usuario } from "../models/usuariosSchema.js";

// GET CONSULTAS MAIS MARCADAS
export const ConsultasPopulares = async (req, res) => {
  const result = await Consulta.find().sort({ totalMarcado: - 1 }).limit(6);
  res.send(result)
}

// GET VETERINARIOS POPULARES
export const VeterinariosPopulares = async (req, res) => {
  const pipeline = [
    {
      $group: {
        _id: "$emailVeterinario",
        totalMarcado: { $sum: "$totalMarcado"}
      }
    },
    {
      $lookup: {
        from: "usuarios",
        localField: "_id",
        foreignField: "email",
        as: "veterinario"
      }
    },
    {
      $match: {
        "veterinario.cargo": "veterinario"
      }
    },
    {
      $project: {
        _id: 0,
        veterinario: {
          $arrayElemAt: ["$veterinario", 0]
        },
        totalMarcado: 1
      }
    },
    {
      $sort: {
        totalMarcado: -1
      }
    },
    {
      $limit: 3
    }
  ];
  const result = await Consulta.aggregate(pipeline);
  res.send(result);
}


// ADMIN STATUS
export const AdminStatus = async (req, res) => {
  const consultasAprovadas = await Consulta.find({ status: "aprovado" });
  const consultasPendentes = await Consulta.find({ status: "pendente" });
  const veterinarios = await Usuario.find({ cargo: "veterinario" });
  const consultasTotal = await Consulta.find();
  const totalMarcado = await Agendamento.find();
  const result = {
    consultasAprovadas: consultasAprovadas.length,
    consultasPendentes: consultasPendentes.length,
    veterinarios: veterinarios.length,
    consultasTotal: consultasTotal.length,
    totalMarcado: totalMarcado.length
  };
  res.send(result);
};

// GET TODOS VETERINARIOS
export const VeterinariosTodos = async (req, res) => {
  const result = await Usuario.find({ cargo: "veterinario" });
  res.send(result);
};

// GET CONSULTAS VETERINARIOS
export const ConsultasVeterinario = async (req, res) => {
  const email = req.params.email;
  const query = { emailUsuario: email };
  const pipeline = [
    {
      $match: query
    },
    {
      $lookup: {
        from: "consultas",
        localField: "consultaId",
        foreignField: "_id",
        as: "consultas"
      }
    },
    {
      $unwind: {
        path: "$consultas",
        preserveNullAndEmptyArrays: true 
      }
    },
    {
      $lookup: {
        from: "usuarios",
        localField: "consultas.emailVeterinario",
        foreignField: "email",
        as: "veterinario"
      }
    },
    {
      $project: {
        _id: 0,
        veterinario: {
          $arrayElemAt: ["$veterinario", 0]
        },
        consultas: 1
      }
    }
  ];
  const result = await Agendamento.aggregate(pipeline);
  res.send(result);
};


// POST SOLICITAR UM VETERINARIO
export const VeterinarioSolicitar = async (req, res) => {
  const data = req.body;
  const result = await Agendamento.create(data);
  res.send(result);
}

// GET VETERINARIOS EMAIL
export const VeterinariosEmail = async (req, res) => {
  const emailUsuario = req.params.email;
  const result = await Agendamento.findOne({ emailUsuario });
  res.send(result);
}