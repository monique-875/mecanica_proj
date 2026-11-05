import { pool } from "../config/database.js";

export async function findAll() {
  const [rows] = await pool.query(`
    SELECT agendamentos.id_agendamento, agendamentos.id_cliente, agendamentos.id_veiculo,
           agendamentos.data_hora AS data_agendamento, agendamentos.status,
           agendamentos.observacao AS descricao_servico,
           veiculos.placa, veiculos.modelo, veiculos.marca,
           clientes.nome AS cliente_nome
    FROM agendamento AS agendamentos
    JOIN veiculo AS veiculos ON veiculos.id_veiculo = agendamentos.id_veiculo
    JOIN cliente AS clientes ON clientes.id_cliente = agendamentos.id_cliente
    ORDER BY agendamentos.data_hora ASC
  `);

  return rows;
}

export async function create(dadosAgendamento) {
  const veiculoId = dadosAgendamento.id_veiculo || dadosAgendamento.veiculo_id;

  const [veiculos] = await pool.query(
    "SELECT id_cliente FROM veiculo WHERE id_veiculo = ?",
    [veiculoId],
  );

  if (!veiculos.length) {
    const erro = new Error("Veículo não encontrado");
    erro.status = 400;
    throw erro;
  }

  const [resultado] = await pool.query(
    "INSERT INTO agendamento (id_cliente, id_veiculo, data_hora, status, observacao) VALUES (?, ?, ?, ?, ?)",
    [
      veiculos[0].id_cliente,
      veiculoId,
      dadosAgendamento.data_agendamento || dadosAgendamento.data_hora,
      dadosAgendamento.status || "Pendente",
      dadosAgendamento.descricao_servico || null,
    ],
  );

  return resultado.insertId;
}

export async function updateData(id, data_agendamento) {
  await pool.query(
    "UPDATE agendamento SET data_hora = ? WHERE id_agendamento = ?",
    [data_agendamento, id],
  );
}

export async function remove(id) {
  await pool.query("DELETE FROM agendamento WHERE id_agendamento = ?", [id]);
}