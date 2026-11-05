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
export async function create(v) {
  const [r] = await pool.query(
    "INSERT INTO veiculo (id_cliente, placa, modelo, marca, ano) VALUES (?, ?, ?, ?, ?)",
    [v.id_cliente || v.cliente_id, v.placa, v.modelo, v.marca, v.ano || null],
  );
  return r.insertId;
}
export async function update(id, v) {
  await pool.query(
    "UPDATE veiculo SET id_cliente = ?, placa = ?, modelo = ?, marca = ?, ano = ? WHERE id_veiculo = ?",
    [
      v.id_cliente || v.cliente_id,
      v.placa,
      v.modelo,
      v.marca,
      v.ano || null,
      id,
    ],
  );
}
export async function remove(id) {
  await pool.query("DELETE FROM veiculo WHERE id_veiculo = ?", [id]);
}
