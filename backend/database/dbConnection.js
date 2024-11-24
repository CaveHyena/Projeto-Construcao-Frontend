import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "TESTE",
    })
    .then(() => {
      console.log("Conectado ao banco de dados!");
    })
    .catch((err) => {
      console.log(`Ocorreu algum erro ao conectar ao banco de dados: ${err}`);
    });
};
