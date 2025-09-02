import { ref } from 'vue'
import { defineStore } from 'pinia'


import CategoriaApi from '@/service/categorias'


const categoriaApi = new CategoriaApi()


export const useCategoriaStore = defineStore('categoria', () => {
 const categorias = ref([])




 async function getCategorias() {
   const data = await categoriaApi.buscarTodasAsCategorias()
   categorias.value = data.results
 }


  async function excluirCategoria(id) {
   await categoriaApi.excluirCategoria(id)
   const index = categorias.value.findIndex((categoria) => categoria.id === id)
   categorias.value.splice(index, 1)
 }


 async function salvarCategoria(categoria) {
   if (categoria.id) {
     await categoriaApi.atualizarCategoria(categoria)
     const index = categorias.value.findIndex((c) => c.id === categoria.id)
     categorias.value.splice(index, 1, categoria)
   } else {
     const data = await categoriaApi.adicionarCategoria(categoria)
     categorias.value.splice(0, 0, data)
   }
 }




 return {
   categorias,
   getCategorias,
   salvarCategoria,
   excluirCategoria,
 }
})
