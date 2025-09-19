import { ref } from 'vue'
import { defineStore } from 'pinia'
import ProdutosService from '@/service/produtos'

const produtosService = new ProdutosService()

export const useProdutosStore = defineStore('produtos', () => {
  const produtos = ref([])
  const produtoDetalhado = ref(null)

  const page = ref(1)
  const totalPages = ref(1)
  const pageSize = ref(10) // opcional, referência

  // agora aceita params (ex: { categoria__id: 3, page: 2 })
  async function carregarProdutos(params = {}) {
    if (!params.page) params.page = page.value

    const data = await produtosService.BuscarTodosOsProdutos(params)
    produtos.value = data.results
    page.value = data.page
    totalPages.value = data.total_pages
    pageSize.value = data.page_size
  }

  const carregarProdutoDetalhado = async (id) => {
    produtoDetalhado.value = await produtosService.carregarProdutoDetalhado(id)
  }

  function getProduct(id) {
    if (!Array.isArray(produtos.value)) return null
    return produtos.value.find(produto => produto.id === id)
  }

  async function salvarProduto(produto) {
    if (produto.id) {
      await produtosService.AtualizarProduto(produto)
      const index = produtos.value.findIndex((p) => p.id === produto.id)
      produtos.value.splice(index, 1, produto)
    } else {
      const data = await produtosService.AdcionarProduto(produto)
      produtos.value.splice(0, 0, data)
    }
  }

  async function excluirProduto(id) {
    await produtosService.DeletarProduto(id)
    const index = produtos.value.findIndex((produto) => produto.id === id)
    produtos.value.splice(index, 1)
  }

  return {
    produtos,
    produtoDetalhado,
    page,
    totalPages,
    pageSize,
    carregarProdutos,
    carregarProdutoDetalhado,
    getProduct,
    salvarProduto,
    excluirProduto
  }
})
