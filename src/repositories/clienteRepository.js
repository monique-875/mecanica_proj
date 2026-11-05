import { pool } from "../config/database.js";

export async function findAll() {
  const [rows] = await pool.query("SELECT * FROM cliente ORDER BY nome");
  return rows;
}

export async function create(cliente) {
  const [result] = await pool.query(
    "INSERT INTO cliente (nome, cpf_criptografado, telefone, email) VALUES (?, ?, ?, ?)",
    [
      cliente.nome,
      cliente.cpf_criptografado,
      cliente.telefone || null,
      cliente.email || null,
    ],
  );

  return result.insertId;
}

export async function update(id, cliente) {
  await pool.query(
    "UPDATE cliente SET nome = ?, cpf_criptografado = ?, telefone = ?, email = ? WHERE id_cliente = ?",
    [
      cliente.nome,
      cliente.cpf_criptografado,
      cliente.telefone || null,
      cliente.email || null,
      id,
    ],
  );
}

export async function remove(id) {
  await pool.query("DELETE FROM cliente WHERE id_cliente = ?", [id]);
}