import { findAll, clienteExiste, create, update, remove } from "../repositories/veiculoRepository.js";
export async function listar() {
  return findAll();
}
export async function criar(data) {
  const clienteId = data.cliente_id ?? data.id_cliente;
  if (!clienteId) {
    const error = new Error("cliente_id é obrigatório");
    error.status = 400;
    throw error;
  }
  if (!(await clienteExiste(clienteId))) {
    const error = new Error("Cliente não encontrado");
    error.status = 400;
    throw error;
  }
  return create({ ...data, cliente_id: clienteId });
}
export async function atualizar(id, data) {
  const clienteId = data.cliente_id ?? data.id_cliente;
  if (!clienteId) {
    const error = new Error("cliente_id é obrigatório");
    error.status = 400;
    throw error;
  }
  if (!(await clienteExiste(clienteId))) {
    const error = new Error("Cliente não encontrado");
    error.status = 400;
    throw error;
  }
  await update(id, { ...data, cliente_id: clienteId });
}
export async function remover(id) {
  await remove(id);
}

