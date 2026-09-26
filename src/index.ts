import express from "express";
import produtoRoutes from "./routes/produtoRoutes";
import sequelize from "./config/database";

const app = express();

app.use(express.json());

app.use("/produtos", produtoRoutes);

sequelize.sync()
    .then(() => {
        console.log("Banco de dados conectado!");
    })
    .catch((error) => {
        console.error("Erro ao conectar com o banco:", error);
    });

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});