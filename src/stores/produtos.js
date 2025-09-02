import { defineStore } from 'pinia'
import ProdutosService from '@/service/produtos'
import { ref } from 'vue'


const produtosService = new ProdutosService()


export const useProdutosStore = defineStore('produtos', () => {
 const produtos = ref([])
 const produtoDetalhado = ref(null)


 async function carregarProdutos() {
  const data = await produtosService.BuscarTodosOsProdutos()
  // garante que seja sempre um array
  produtos.value = Array.isArray(data.results) ? data.results : []
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
   carregarProdutos,
   carregarProdutoDetalhado,
   getProduct,
   salvarProduto,
   excluirProduto
 }
})


