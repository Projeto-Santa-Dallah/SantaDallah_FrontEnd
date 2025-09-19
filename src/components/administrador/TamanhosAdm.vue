<script setup>
import { onMounted, ref } from 'vue';
import TamanhoAdm from './TamanhoAdm.vue'
import { useTamanhoStore } from '@/stores/tamanhos';
import DescricaoTamanho from '@/components/administrador/DescricaoTamanho.vue'
import CadastrarTamanho from '@/components/filtros/CadastrarTamanho.vue'
import PaginacaoAdm from './PaginacaoAdm.vue'


const tamanhoStore = useTamanhoStore();

const DescricaoAberta = ref(false)
const EditarAberto = ref(false)

const idSelecionado = ref(0)
const idEditar = ref(null)

function openDescricao(id) {
  DescricaoAberta.value = true
  idSelecionado.value = id
}

function fecharDescricao(){
  DescricaoAberta.value = false
}

function editarTamanho(id) {
  idEditar.value = id
  EditarAberto.value = true
}

function fecharEdicao() {
  EditarAberto.value = false
  idEditar.value = null
}

onMounted(() => {
  tamanhoStore.getTamanhos();
});
</script>

<template>
  <div v-if="!DescricaoAberta && !EditarAberto" class="tamanhos">
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
        @editar="editarTamanho"
      />
    </div>
     <PaginacaoAdm 
  :page="tamanhoStore.page" 
  :totalPages="tamanhoStore.totalPages" 
  @changePage="tamanhoStore.getTamanhos({ page: $event })" 
/>
  </div>

  <div class="descricao" v-else-if="DescricaoAberta">
    <DescricaoTamanho @fechar="fecharDescricao" :id="idSelecionado" />
  </div>

  <div v-else-if="EditarAberto">
    <CadastrarTamanho 
      :open="EditarAberto"
      :idEditar="idEditar"
      @close="fecharEdicao"
    />
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
