import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const itens = ref([])
  const cep = ref('')
  const tipoEntrega = ref('entrega') // "entrega" ou "retirada"
  const valorFrete = ref(0)

  // ➕ Adicionar item
  function addItem(item) {
    const existente = itens.value.find(obj => obj.id === item.id)
    if (existente) existente.quantidade++
    else itens.value.push({ ...item, quantidade: 1 })
  }

  // ➖ Remover item
  function removeItem(itemId) {
    const item = itens.value.find(i => i.id === itemId)
    if (!item) return
    if (item.quantidade > 1) item.quantidade--
    else itens.value = itens.value.filter(i => i.id !== itemId)
  }

  // 💰 Subtotal
  const valorNoCarrinho = computed(() =>
    itens.value.reduce((soma, item) => soma + item.preco * item.quantidade, 0)
  )

  // 🚚 Calcular frete (simulado)
  async function calcularFrete() {
    if (!cep.value) return alert("Informe o CEP para calcular o frete!")
    if (tipoEntrega.value === 'retirada') {
      valorFrete.value = 0
      return
    }

    // Simulação de cálculo de frete (poderia ser uma API real)
    const cepNum = parseInt(cep.value.replace(/\D/g, ''))
    if (cepNum >= 89000000 && cepNum <= 89999999) valorFrete.value = 15 // Santa Catarina
    else if (cepNum >= 80000000 && cepNum <= 87999999) valorFrete.value = 25 // Sul
    else valorFrete.value = 40 // Outras regiões
  }

  // 💸 Total final
  const valorFinal = computed(() => valorNoCarrinho.value + valorFrete.value)

  return {
    itens,
    addItem,
    removeItem,
    valorNoCarrinho,
    valorFrete,
    valorFinal,
    cep,
    tipoEntrega,
    calcularFrete
  }
})
