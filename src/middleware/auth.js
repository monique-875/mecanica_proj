import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer "))
    return res.status(401).json({ mensagem: "Token não informado" });
  try {
    req.user = jwt.verify(
      header.slice(7),
      process.env.JWT_SECRET || "secret-local",
    );
    next();
  } catch {
    res.status(401).json({ mensagem: "Token inválido ou expirado" });
  }
}
