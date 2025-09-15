<script setup>
import { onMounted, ref } from 'vue';
import TamanhoAdm from './TamanhoAdm.vue'
import { useTamanhoStore } from '@/stores/tamanhos';
import DescricaoTamanho from '@/components/administrador/DescricaoTamanho.vue'
const tamanhoStore = useTamanhoStore();
const DescricaoAberta = ref(false)
const idSelecionado = ref(0)

function openDescricao(id) {
  DescricaoAberta.value = true
  idSelecionado.value = id
}
function fecharDescricao(){
  DescricaoAberta.value = false
}
onMounted(() => {
  tamanhoStore.getTamanhos();
});

// const tamanhos = [
//   {
//     id: 1,
//     nome: 'P',
//     qtdFatia: 6,
//     massakg: '0.00',
//     formato: 'redondo',
//     categoria: {
//       id: 1,
//       nome: 'Torta',
//       descricao: 'Produto doce a base de farinha com recheios variados.'
//     }
//   },
//   {
//     id: 2,
//     nome: 'M',
//     qtdFatia: 8,
//     massakg: '0.50',
//     formato: 'quadrado',
//     categoria: {
//       id: 2,
//       nome: 'Bolo',
//       descricao: 'Bolo tradicional com cobertura.'
//     }
//   }
// ]
</script>

<template>
  <!-- <h1>{{idSelecionado}}</h1> -->
  <div v-if="DescricaoAberta == false" class="tamanhos">
    <slot></slot>
    <div class="tamanho" v-for="tamanho in tamanhoStore.tamanhos" :key="tamanho.id">
      <TamanhoAdm
        :id="tamanho.id"
        :nome="tamanho.nome"
        :qtdFatia="tamanho.qtdFatia"
        :massakg="tamanho.massakg"
        :formato="tamanho.formato"
        :categoria="tamanho.categoria"
        @open="openDescricao" 
      />
    </div>
  </div>
    <div class="descricao" v-else>
  <DescricaoTamanho @fechar="fecharDescricao" :id="idSelecionado" />
</div>
</template>

<style scoped>
.tamanhos, .descricao {
  display: flex;
  flex-direction: column;
  padding: 0px 7vw 0px 50px;
  width: 71vw;
  margin-bottom: 100px;
}

.tamanho {
  width: 100%;
  padding: 5px;
}
</style>