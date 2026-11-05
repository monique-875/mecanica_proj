import { pool } from "../config/database.js";
export async function findAll() {
  const [rows] =
    await pool.query(`SELECT a.id_agendamento, a.id_cliente, a.id_veiculo,
    a.data_hora AS data_agendamento, a.status, a.observacao AS descricao_servico,
    v.placa, v.modelo, v.marca, c.nome AS cliente_nome
    FROM agendamento a
    JOIN veiculo v ON v.id_veiculo = a.id_veiculo
    JOIN cliente c ON c.id_cliente = a.id_cliente
    ORDER BY a.data_hora ASC`);
  return rows;
}
export async function create(a) {
  const veiculoId = a.id_veiculo || a.veiculo_id;
  const [veiculos] = await pool.query(
    "SELECT id_cliente FROM veiculo WHERE id_veiculo = ?",
    [veiculoId],
  );
  if (!veiculos.length) {
    const error = new Error("Veículo não encontrado");
    error.status = 400;
    throw error;
  }
  const dataHora = `${a.data_agendamento || a.data_hora}T00:00:00`;
  const [r] = await pool.query(
    "INSERT INTO agendamento (id_cliente, id_veiculo, data_hora, status, observacao) VALUES (?, ?, ?, ?, ?)",
    [
      veiculos[0].id_cliente,
      veiculoId,
      dataHora,
      a.status || "Pendente",
      a.descricao_servico || null,
    ],
  );
  return r.insertId;
}
export async function updateData(id, data_agendamento) {
  await pool.query(
    "UPDATE agendamento SET data_hora = ? WHERE id_agendamento = ?",
    [`${data_agendamento}T00:00:00`, id],
  );
}
export async function remove(id) {
  await pool.query("DELETE FROM agendamento WHERE id_agendamento = ?", [id]);
}
