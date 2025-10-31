// /stores/pagamentoStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCartStore } from './carrinhoStore'

export const usePagamentoStore = defineStore('pagamento', () => {
  const carrinho = useCartStore()

  const produto = ref([]) // pode ser 1 item ou vários
  const tipo_compra = ref(null)
  const valor_final = ref(0)

  // Define o tipo de compra e o produto(s)
  function realizarCompra(itemOuItens, tipo, valorFinal) {
    if (tipo === 'carrinho') {
      produto.value = [...carrinho.itens] // copia os itens atuais do carrinho
    } else {
      produto.value = itemOuItens // produto único
    }
    tipo_compra.value = tipo
    valor_final.value = valorFinal
  }

  // Limpa o carrinho ou o item após o pagamento
  function confirmarCompra() {
    if (tipo_compra.value === 'carrinho') {
      carrinho.itens = [] // limpa tudo
    } else if (produto.value && produto.value.id) {
      carrinho.removeItem(produto.value.id)
    }

    // limpa os dados da compra
    produto.value = []
    tipo_compra.value = null
    valor_final.value = 0
  }

  return {
    produto,
    tipo_compra,
    valor_final,
    realizarCompra,
    confirmarCompra
  }
})
