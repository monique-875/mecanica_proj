import { login } from "../services/authService.js";
export async function loginController(req, res) {
  const result = await login(req.body.email, req.body.senha);
  result
    ? res.json(result)
    : res.status(401).json({ mensagem: "E-mail ou senha inválidos" });
}
