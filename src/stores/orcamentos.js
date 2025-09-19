import { ref } from 'vue'
import { defineStore } from 'pinia'
import OrcamentosService from '@/service/orcamentos'

const orcamentosService = new OrcamentosService()

export const useOrcamentosStore = defineStore('orcamentos', () => {
  const orcamentos = ref([])
  const orcamentoDetalhado = ref(null)

  const page = ref(1)
  const totalPages = ref(1)
  const pageSize = ref(10)

  async function carregarOrcamentos(params = {}) {
    if (!params.page) params.page = page.value
    const data = await orcamentosService.BuscarTodosOsOrcamentos(params)
    orcamentos.value = data.results
    page.value = data.page
    totalPages.value = data.total_pages
    pageSize.value = data.page_size
  }

  const carregarOrcamentoDetalhado = async (id) => {
    orcamentoDetalhado.value = await orcamentosService.carregarOrcamentoDetalhado(id)
  }

  // SALVAR ORÇAMENTO (Criar ou Atualizar)
  async function salvarOrcamento(orcamento) {
    if (orcamento.id) {
      await orcamentosService.AtualizarOrcamento(orcamento)
      const index = orcamentos.value.findIndex(o => o.id === orcamento.id)
      orcamentos.value.splice(index, 1, orcamento)
    } else {
      const data = await orcamentosService.AdicionarOrcamento(orcamento)
      orcamentos.value.splice(0, 0, data) // adiciona no início da lista
    }
  }

  const excluirOrcamento = async (id) => {
    await orcamentosService.DeletarOrcamento(id)
    const index = orcamentos.value.findIndex(o => o.id === id)
    if (index !== -1) orcamentos.value.splice(index, 1)
  }

  return {
    orcamentos,
    orcamentoDetalhado,
    page,
    totalPages,
    pageSize,
    carregarOrcamentos,
    carregarOrcamentoDetalhado,
    salvarOrcamento,
    excluirOrcamento
  }
})
