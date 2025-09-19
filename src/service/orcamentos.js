import axios from 'axios'

export default class OrcamentosService {
  async BuscarTodosOsOrcamentos(params = {}) {
    const { data } = await axios.get('/orcamentos/', { params })
    return data
  }

  async carregarOrcamentoDetalhado(id) {
    const { data } = await axios.get(`/orcamentos/${id}/`)
    return data
  }

  async AdicionarOrcamento(orcamento) {
    const { data } = await axios.post('/orcamentos/', orcamento)
    return data
  }

  async AtualizarOrcamento(orcamento) {
    const { data } = await axios.put(`/orcamentos/${orcamento.id}/`, orcamento)
    return data
  }

  async DeletarOrcamento(id) {
    const { data } = await axios.delete(`/orcamentos/${id}/`)
    return data
  }
}
