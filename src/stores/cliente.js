import { ref } from 'vue'
import { defineStore } from 'pinia'

import ClienteApi from '@/service/clientes'


const clienteApi = new ClienteApi()


export const useClienteStore = defineStore('cliente', () => {
 const clientes = ref([])




 async function getClientes() {
   const data = await clienteApi.buscarTodasOsUsuarios()
   clientes.value = data.results 
   console.log(clientes.value)
 }


//   async function excluirCategoria(id) {
//    await categoriaApi.excluirCategoria(id)
//    const index = categorias.value.findIndex((categoria) => categoria.id === id)
//    categorias.value.splice(index, 1)
//  }


//  async function salvarCategoria(categoria) {
//    if (categoria.id) {
//      await categoriaApi.atualizarCategoria(categoria)
//      const index = categorias.value.findIndex((c) => c.id === categoria.id)
//      categorias.value.splice(index, 1, categoria)
//    } else {
//      const data = await categoriaApi.adicionarCategoria(categoria)
//      categorias.value.splice(0, 0, data)
//    }
//  }




 return {
 getClientes,
 clientes
 }
})
