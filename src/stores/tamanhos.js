import { ref } from 'vue'
import { defineStore } from 'pinia'


import TamanhoApi from '@/service/tamanhos'


const tamanhosApi = new TamanhoApi()


export const useTamanhoStore = defineStore('tamanho', () => {
 const tamanhos = ref([])




 async function getTamanhos() {
   const data = await tamanhosApi.buscarTodasOsTamanhos()
   tamanhos.value = data.results
 }


  async function excluirTamanho(id) {
   await tamanhosApi.excluirTamanho(id)
   const index = tamanhos.value.findIndex((tamanho) => tamanho.id === id)
   tamanhos.value.splice(index, 1)
 }


 async function salvarTamanho(tamanho) {
   if (tamanho.id) {
     await tamanhosApi.atualizarTamanho(tamanho)
     const index = tamanhos.value.findIndex((t) => t.id === tamanho.id)
     tamanhos.value.splice(index, 1, tamanho)
   } else {
     const data = await tamanhosApi.adicionarTamanho(tamanho)
     tamanhos.value.splice(0, 0, data)
   }
 }

 return {
   tamanhos,
   getTamanhos,
   excluirTamanho,
   salvarTamanho
 }
})
