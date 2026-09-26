import express from "express";
import produtoRoutes from "./routes/produtoRoutes";

const app = express();

app.use(express.json());

app.use("/produtos", produtoRoutes);

app.listen(3000);