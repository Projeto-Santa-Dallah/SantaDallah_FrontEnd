import axios from 'axios'

export default class PedidosService {
  async BuscarTodosOsPedidos(params = {}) { // ← corrigido
    const { data } = await axios.get('/pedidos/', { params })
    return data
  }

  async carregarPedidoDetalhado(id) {
    const { data } = await axios.get(`/pedidos/${id}/`)
    return data
  }

  async AdcionarPedido(pedido) {
    const { data } = await axios.post('/pedidos/', pedido)
    return data
  }

  async AtualizarPedido(pedido) {
    const { data } = await axios.put(`/pedidos/${pedido.id}/`, pedido)
    return data
  }

  async DeletarPedido(id) {
    const { data } = await axios.delete(`/pedidos/${id}/`)
    return data
  }
}

