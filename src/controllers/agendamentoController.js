import * as service from "../services/agendamentoService.js";
export const listar = async (req, res, next) => {
  try {
    res.json(await service.listar());
  } catch (erro) {
    next(erro);
  }
};
export const criar = async (req, res, next) => {
  try {
    res.status(201).json({ id: await service.criar(req.body) });
  } catch (erro) {
    next(erro);
  }
};
export const atualizar = async (req, res, next) => {
  try {
    await service.atualizar(req.params.id, req.body);
    res.json({ mensagem: "Data atualizada" });
  } catch (erro) {
    next(erro);
  }
};
export const remover = async (req, res, next) => {
  try {
    await service.remover(req.params.id);
    res.json({ mensagem: "Agendamento removido" });
  } catch (erro) {
    next(erro);
  }
};
