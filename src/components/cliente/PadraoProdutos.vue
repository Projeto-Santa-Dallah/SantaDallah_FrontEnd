<script setup>
import { ref, onMounted } from 'vue'
import SlideComponent from './SlideComponent.vue'
import ProdutosHeader from './ProdutosHeader.vue'
import LoadingComponent from '@/components/carregamento/LoadingComponent.vue'
import { useProdutosStore } from '@/stores/produtos'

const produtosStore = useProdutosStore()
const carregando = ref(true)

function faixaDePreco(tamanhos) {
 if (!tamanhos || tamanhos.length === 0) return ''
 const precos = tamanhos.map(t => Number(t.preco))
 const min = Math.min(...precos)
 const max = Math.max(...precos)
 return `R$ ${min.toFixed(2).replace('.', ',')} - ${max.toFixed(2).replace('.', ',')}`
}

onMounted(async () => {
  carregando.value = true
  await produtosStore.carregarProdutos()  // 🔥 AGORA VEM DO STORE
  carregando.value = false
})
</script>

<template>
 <div v-if="carregando" class="carregando">
   <LoadingComponent/>
 </div>

 <div v-else class="produtos">
   <div v-for="p in produtosStore.produtos" :key="p.id" class="produto">
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
  justify-content: center;
  gap: 25px;
  width: 100%;
  margin-bottom: 100px;
}

/* CARD FIXO — NÃO DEFORMA MAIS */
.produto {
  width: 260px;   /* largura fixa */
  height: auto;   /* deixa o conteúdo ditar altura */
}

@media (max-width: 900px) {
  .produto {
    width: 230px;
  }

  .produto {
    width: 100%; 
    max-width: 230px;
  }
  a{
  display: flex;
  justify-content: center;
}
}
@media (max-width: 500px) {
  .produto {
    width: 100%; 
    max-width: 220px;
  }
}
@media (max-width: 470px) {
  .produto {
    width: 100%; 
    max-width: 195px;
    margin: 10px 0px;
  }
}
@media (max-width: 465px) {
  .produtos {
    gap: 0;
  }
}
@media (max-width: 390px) {
  .produto {
    width: 100%; 
    max-width: 188px;
    margin: 10px 0px;
  }
}
</style>
