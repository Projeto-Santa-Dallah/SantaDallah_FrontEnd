import axios from "axios";
export default class TamanhoApi {
 async buscarTodasOsTamanhos() {
   const { data } = await axios.get(`/tamanhos/`);
   return data;
 }
 async adicionarTamanho(tamanho) {
   const { data } = await axios.post("/tamanhos/", tamanho);
   return data;
 }
 async atualizarTamanho(tamanho) {
   const { data } = await axios.put(`/tamanhos/${tamanho.id}/`, tamanho);
   return data.results;
 }
 async excluirTamanho(id) {
   await axios.delete(`/tamanhos/${id}/`);
 }
}
