<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ImagemProduto from '@/components/cliente/ImagemProduto.vue'
import InformacoesProduto from '@/components/cliente/InformacoesProduto.vue'
import ComentariosProduto from '@/components/cliente/ComentariosProduto.vue'
import ProdutosService from '@/service/produtos.js'
import LoadingComponent from '@/components/carregamento/LoadingComponent.vue'
// instancia o service
const service = new ProdutosService()

// rotas e estado do produto
const route = useRoute()
const produto = ref(null)
const carregando = ref(true)

// 🧮 Função para montar faixa de preços
function faixaDePreco(tamanhos) {
  if (!tamanhos || tamanhos.length === 0) return ''
  const precos = tamanhos.map(t => Number(t.preco))
  const min = Math.min(...precos)
  const max = Math.max(...precos)
  return min === max
    ? `R$ ${min.toFixed(2).replace('.', ',')}`
    : `R$ ${min.toFixed(0)} - ${max.toFixed(0)}`
}

// 🔍 Busca o produto detalhado no backend
onMounted(async () => {
  try {
    const id = Number(route.query.id || route.params.id)
    const data = await service.carregarProdutoDetalhado(id)

    // adapta o formato do backend pro frontend
    produto.value = {
      id: data.id,
      nome: data.nome,
      descricao: data.descricao || '',
      sabor: data.sabor,
      tipo: data.tipo,
      validade: data.validade,
      estrelas: 5, // fixo por enquanto
      categoria: data.categoria || [],
      foto: data.foto?.length
        ? data.foto
        : [
            {
              url: data.foto_url || '',
              description: '',
              uploaded_on: ''
            }
          ],
      tamanhos: data.tamanhos || []
    }
  } catch (error) {
    console.error('Erro ao carregar produto:', error)
  } finally {
    carregando.value = false
  }
})
</script>

<template>
  <div v-if="carregando" class="carregando">
      <LoadingComponent/>
  </div>

  <div v-else-if="produto">
    <main>
      <!-- imagem principal -->
      <ImagemProduto :imagem="{ file: produto.foto[0]?.url }" />

      <!-- informações -->
      <InformacoesProduto
        :nome="produto.nome"
        :descricao="produto.descricao"
        :sabor="produto.sabor"
        :preco="faixaDePreco(produto.tamanhos)"
        :id="produto.id"
        :image="produto.foto"
        :tamanhos="produto.tamanhos"
        :estrelas="produto.estrelas"
      />
    </main>

    <ComentariosProduto />
  </div>

  <div v-else class="carregando">
    <p>Produto não encontrado.</p>
  </div>
</template>

<style scoped>
main {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  gap: 40px;
}

.carregando {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  font-size: 18px;
  font-weight: 500;
  color: #555;
}

@media (max-width: 768px) {
  main {
    margin-top: 40px;
    flex-direction: column;
    align-items: center;
  }
}
</style>
