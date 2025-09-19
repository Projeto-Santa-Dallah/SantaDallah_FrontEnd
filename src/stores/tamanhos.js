import { ref } from 'vue'
import { defineStore } from 'pinia'
import TamanhoApi from '@/service/tamanhos'

const tamanhosApi = new TamanhoApi()

export const useTamanhoStore = defineStore('tamanho', () => {
  const tamanhos = ref([])
  const page = ref(1)
  const totalPages = ref(1)
  const pageSize = ref(10) // opcional, para referência

  // agora aceita params (ex: { "categoria__id": 3, page: 2 })
  async function getTamanhos(params = {}) {
    if (!params.page) params.page = page.value

    const data = await tamanhosApi.buscarTodasOsTamanhos(params)
    tamanhos.value = data.results
    page.value = data.page
    totalPages.value = data.total_pages
    pageSize.value = data.page_size
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
    page,
    totalPages,
    pageSize,
    getTamanhos,
    excluirTamanho,
    salvarTamanho
  }
})
