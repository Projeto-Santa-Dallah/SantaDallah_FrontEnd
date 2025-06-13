import axios from 'axios'

export default class ProdutosService {
  async BuscarTodosOsProdutos() {
    const { data } = await axios.get('/produtos/')
    console.log('oi')
    return data
  }

  async carregarProdutoDetalhado(id) {
    const { data } = await axios.get(`http://seu-backend/api/produtos/${id}/`)
    return data
  }

  async AdcionarProduto(produto) {
    const { data } = await axios.post('/produtos/', produto)
    return data
  }

  async AtualizarProduto(produto) {
    const { data } = await axios.put(`/produtos/${produto.id}/`, produto)
    return data
  }

  async DeletarProduto(id) {
    const { data } = await axios.delete(`/produtos/${id}/`)
    return data
  }
}
