<script setup>
import { ref, onMounted } from 'vue'
import SlideComponent from './SlideComponent.vue'
import ProdutosService from '@/service/produtos'
import LoadingComponent from '@/components/carregamento/LoadingComponent.vue'

const produtos = ref([])
const carregando = ref(true) // Adicionado para estado de carregamento

// Função para montar faixa de preços
function faixaDePreco(tamanhos) {
  if (!tamanhos || tamanhos.length === 0) return ''
  const precos = tamanhos.map(t => Number(t.preco))
  const min = Math.min(...precos)
  const max = Math.max(...precos)
  return `R$ ${min.toFixed(2).replace('.', ',')} - ${max.toFixed(2).replace('.', ',')}`
}

// Calcula parcelas (caso queira usar depois)
function parcelas(preco) {
  return preco ? `em até 3x de R$${Number(preco / 3).toFixed(2).replace('.', ',')}` : ''
}

// Buscar produtos do backend
onMounted(async () => {
  const service = new ProdutosService()
  try {
    const data = await service.BuscarTodosOsProdutos()
    produtos.value = data.results
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
  } finally {
    carregando.value = false // Define carregando como false após a busca
  }
})
</script>

<template>
  <div v-if="carregando" class="carregando">
    <LoadingComponent/>
  </div>

  <div v-else class="produtos">
    <div v-for="p in produtos" :key="p.id" class="produto">
      <SlideComponent
        :id="p.id"
        :img="p.foto_url"
        :nome="p.nome"
        :sabor="p.descricao"
        :faixaPreco="faixaDePreco(p.tamanhos)"
        :estrelas="5"
      />
    </div>
  </div>
</template>

<style scoped>
.produtos {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  flex-direction: row;
  padding: 0px 3vw 0px 50px;
  width: 71vw;
  margin-bottom: 100px;
}
.produto {
  width: 20vw;
  padding: 5px;
  min-width: 210px;
}

.carregando {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  font-size: 18px;
  font-weight: 500;
  color: #555;
}

@media (max-width: 1250px) {
  .produtos {
    justify-content: center;
  }
}
@media (max-width: 768px) {
  .produto {
    width: 180px;
    padding: 5px;
    min-width: 180px;
  }
  .produtos {
    width: 100%;
    padding: 0px 0px;
    gap: 0px;
  }
}
</style>