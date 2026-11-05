import { findAll, create, update, remove } from "../repositories/clienteRepository.js";

function exposed(cliente) {
  const cpf = Buffer.isBuffer(cliente.cpf_criptografado)
    ? ""
    : cliente.cpf_criptografado || "";

  return { ...cliente, cpf, cpf_criptografado: undefined };
}
export async function listar(busca) {
  const rows = await findAll(busca);
  return rows.map(exposed);
}
export async function criar(data) {
  if (!data.nome || !data.cpf) {
    const error = new Error("Nome e CPF são obrigatórios");
    error.status = 400;
    throw error;
  }
  return create({
    ...data,// copia todas as propriedades de um objeto para dentro de outro.
    cpf_criptografado: data.cpf,
  });
}
export async function atualizar(id, data) {
  if (!data.nome || !data.cpf) {
    const error = new Error("Nome e CPF são obrigatórios");
    error.status = 400;
    throw error;
  }
  await update(id, {
    ...data,
    cpf_criptografado: data.cpf,
  });
}
export async function remover(id) {
  await remove(id);
}
