import axios from "axios";
export default class ClienteApi {
 async buscarTodasOsUsuarios() {
   const { data } = await axios.get(`/usuarios/`);
   return data;
 }
 async adicionarUsuario(usuario) {
   const { data } = await axios.post("/usuarios/", usuario);
   return data;
 }
 async atualizarUsuario(usuario) {
   const { data } = await axios.put(`/usuarios/${usuario.id}/`, usuario);
   return data.results;
 }
 async excluirUsuario(id) {
   await axios.delete(`/usuarios/${id}/`);
 }
}
