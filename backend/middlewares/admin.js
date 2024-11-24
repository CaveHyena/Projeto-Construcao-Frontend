import { Usuario } from "../models/usuariosSchema.js";

// VERIFICAR SE É ADMIN
export const AdminVerificar = async (req, res, next) => {
  const email = req.decoded.email;
  const query = { email: email };
  const usuario = await Usuario.findOne(query);
  if (usuario.cargo === "admin") {
    next();
  } else {
    return res.status(401).send({ message: "Acesso não autorizado"})
  };
};