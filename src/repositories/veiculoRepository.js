import { pool } from "../config/database.js";
export async function findAll() {
  const [rows] = await pool.query("SELECT * FROM veiculo ORDER BY id_veiculo");
  return rows;
}
export async function clienteExiste(id) {
  const [rows] = await pool.query(
    "SELECT 1 FROM cliente WHERE id_cliente = ? LIMIT 1",
    [id],
  );
  return Boolean(rows.length);
}
export async function create(dadosVeiculo) {
  const [resultado] = await pool.query(
    "INSERT INTO veiculo (id_cliente, placa, modelo, marca, ano) VALUES (?, ?, ?, ?, ?)",
    [dadosVeiculo.id_cliente || dadosVeiculo.cliente_id, dadosVeiculo.placa, dadosVeiculo.modelo, dadosVeiculo.marca, dadosVeiculo.ano || null],
  );
  return resultado.insertId;
}
export async function update(id, dadosVeiculo) {
  await pool.query(
    "UPDATE veiculo SET id_cliente = ?, placa = ?, modelo = ?, marca = ?, ano = ? WHERE id_veiculo = ?",
    [
      dadosVeiculo.id_cliente || dadosVeiculo.cliente_id,
      dadosVeiculo.placa,
      dadosVeiculo.modelo,
      dadosVeiculo.marca,
      dadosVeiculo.ano || null,
      id,
    ],
  );
}
export async function remove(id) {
  await pool.query("DELETE FROM veiculo WHERE id_veiculo = ?", [id]);
}
