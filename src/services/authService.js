import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findByEmail } from "../repositories/usuarioRepository.js";

export async function login(email, senha) {
  const usuario = await findByEmail(email);
  if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) return null;
  const token = jwt.sign(
    { id: usuario.id_usuario, nome: usuario.nome },
    process.env.JWT_SECRET || "secret-local",
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" },
  );
  return { token, nome: usuario.nome };
}
