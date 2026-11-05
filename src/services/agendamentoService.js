import { findAll, create, updateData, remove } from "../repositories/agendamentoRepository.js";
export async function listar() {
  return findAll();
}
export async function criar(data) {
  if (!data.data_agendamento || !(data.veiculo_id ?? data.id_veiculo)) {
    const error = new Error("Veículo e data são obrigatórios");
    error.status = 400;
    throw error;
  }
  return create(data);
}
export async function atualizar(id, data) {
  if (!data.data_agendamento) {
    const error = new Error("data_agendamento é obrigatória");
    error.status = 400;
    throw error;
  }
  await updateData(id, data.data_agendamento);
}
export async function remover(id) {
  await remove(id);
}
