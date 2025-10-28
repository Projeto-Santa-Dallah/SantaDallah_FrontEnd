// src/composables/useViaCep.js
import { ref } from 'vue'

export function useViaCep() {
  const endereco = ref({
    cep: '',
    cidade: '',
    bairro: '',
    rua: '',
    estado: ''
  })

  const carregando = ref(false)
  const erro = ref('')

  async function buscarCep(cepDigitado) {
    erro.value = ''
    endereco.value = {
      cep: '',
      cidade: '',
      bairro: '',
      rua: '',
      estado: ''
    }


    const cepLimpo = cepDigitado.replace(/\D/g, '')


    if (cepLimpo.length !== 8) {
      erro.value = 'CEP inválido. Deve ter 8 dígitos.'
      return
    }

    carregando.value = true

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
      const dados = await resposta.json()

      if (dados.erro) {
        erro.value = 'CEP não encontrado.'
      } else {
        endereco.value = {
          cep: dados.cep,
          cidade: dados.localidade,
          bairro: dados.bairro,
          rua: dados.logradouro,
          estado: dados.uf
        }
      }
    } catch (e) {
      erro.value = 'Erro ao buscar o CEP. Verifique sua conexão.'
    } finally {
      carregando.value = false
    }
  }

  return {
    endereco,
    buscarCep,
    carregando,
    erro
  }
}
