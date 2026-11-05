import { pool } from "../config/database.js";
export async function findByEmail(email) {
  const [rows] = await pool.query(
    "SELECT * FROM Usuarios WHERE email = ? LIMIT 1",
    [email],
  );
  return rows[0];
}
