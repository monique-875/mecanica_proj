import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import veiculoRoutes from "./routes/veiculoRoutes.js";
import agendamentoRoutes from "./routes/agendamentoRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/", authRoutes);
app.use("/clientes", clienteRoutes);
app.use("/veiculos", veiculoRoutes);
app.use("/agendamentos", agendamentoRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  if (error.code === "ER_DUP_ENTRY")
    return res.status(400).json({ mensagem: "Registro já cadastrado" });
  res
    .status(error.status || 500)
    .json({ mensagem: error.message || "Erro interno do servidor" });
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`),
);
