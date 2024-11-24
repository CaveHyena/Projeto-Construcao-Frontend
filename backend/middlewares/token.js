import jwt from 'jsonwebtoken';

// Função para verificar o token
export const TokenVerificar = async (req, res, next) => {
  const autorizacao = req.headers.authorization;

  if (!autorizacao) {
    return res.status(401).send({ message: "Autorização Inválida" });
  }

  const token = autorizacao.split(" ")[1];

  if (!token) {
    return res.status(400).send({ message: "Token malformado" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Acesso não autorizado" });
    }
    req.decoded = decoded;
    next();
  });
};

