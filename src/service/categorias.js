import axios from "axios";
export default class CategoriaApi {
 async buscarTodasAsCategorias() {
   const { data } = await axios.get(`/categorias/`);
   return data;
 }
 async adicionarCategoria(categoria) {
   const { data } = await axios.post("/categorias/", categoria);
   return data;
 }
 async atualizarCategoria(categoria) {
   const { data } = await axios.put(`/categorias/${categoria.id}/`, categoria);
   return data.results;
 }
 async excluirCategoria(id) {
   await axios.delete(`/categorias/${id}/`);
 }
}
