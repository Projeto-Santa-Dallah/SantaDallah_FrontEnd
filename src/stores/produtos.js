import { defineStore } from 'pinia'
import ProdutosService from '@/service/produtos'
import { ref } from 'vue'


const produtosService = new ProdutosService()


export const useProdutosStore = defineStore('produtos', () => {
 const produtos = ref([])
 const produtoDetalhado = ref(null)


   const carregarProdutos = async () => {
   produtos.value = await produtosService.BuscarTodosOsProdutos();
    console.log(produtos.value)
};

  const carregarProdutoDetalhado = async (id) => {
    produtoDetalhado.value = await produtosService.BuscarProdutoPorId(id)
  }


 function getProduct(id) {
   return produtos.value.find((produto) => produto.id === id)
 }


 function addProduto({
   nome,
   descricao,
   tipo,
   validade,
   preco,
   sabor,
   foto = [],
   tamanho = {},
   categoria = [],
 }) {
   const novoId = produtos.value.length > 0 ? produtos.value[produtos.value.length - 1].id + 1 : 1


   const novoProduto = {
     id: novoId,
     nome,
     descricao,
     tipo,
     validade,
     preco,
     sabor,
     foto,
     tamanho,
     categoria,
   }


   produtos.value.push(novoProduto)


   alert(`Produto adicionado: ${JSON.stringify(novoProduto, null, 2)}`)
 }


 return {
   produtos,
   produtoDetalhado,
   carregarProdutos,
   carregarProdutoDetalhado,
   getProduct,
   addProduto,
 }
})
