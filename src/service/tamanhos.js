import axios from "axios";
export default class TamanhoApi {
 async buscarTodasOsTamanhos(params = {}) {
   const { data } = await axios.get(`/tamanhos/`, { params });
   return data;
 }
 async adicionarTamanho(tamanho) {
   const { data } = await axios.post("/tamanhos/", tamanho);
   return data;
 }
 async atualizarTamanho(tamanho) {
   const { data } = await axios.put(`/tamanhos/${tamanho.id}/`, tamanho);
   return data;
 }
  async buscarPorId(id) {
    const { data } = await axios.get(`/tamanhos/${id}`);
   return data;
 }
 async excluirTamanho(id) {
   await axios.delete(`/tamanhos/${id}/`);
 }
}
