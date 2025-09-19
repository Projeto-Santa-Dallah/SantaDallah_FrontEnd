import { ref } from 'vue'
import { defineStore } from 'pinia'
import PedidosService from '@/service/pedidos'

const pedidosService = new PedidosService()

export const usePedidosStore = defineStore('pedidos', () => {
  const pedidos = ref([])
  const pedidoDetalhado = ref(null)

  const page = ref(1)
  const totalPages = ref(1)
  const pageSize = ref(10) // opcional, só referência

  // carregar lista de pedidos com paginação
  async function carregarPedidos(params = {}) {
    if (!params.page) params.page = page.value

    const data = await pedidosService.BuscarTodosOsPedidos(params)
    pedidos.value = data.results
    page.value = data.page
    totalPages.value = data.total_pages
    pageSize.value = data.page_size

    console.log(data)
  }

  // carregar um pedido específico
  const carregarPedidoDetalhado = async (id) => {
    pedidoDetalhado.value = await pedidosService.carregarPedidoDetalhado(id)
  }

  // excluir pedido
  async function excluirPedido(id) {
    await pedidosService.DeletarPedido(id)
    const index = pedidos.value.findIndex((pedido) => pedido.id === id)
    pedidos.value.splice(index, 1)
  }

  return {
    pedidos,
    pedidoDetalhado,
    page,
    totalPages,
    pageSize,
    carregarPedidos,
    carregarPedidoDetalhado,
    excluirPedido
  }
})
