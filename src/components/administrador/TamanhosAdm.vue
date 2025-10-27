<script setup>
import { onMounted, ref } from 'vue';
import TamanhoAdm from './TamanhoAdm.vue'
import { useTamanhoStore } from '@/stores/tamanhos';
import DescricaoTamanho from '@/components/administrador/DescricaoTamanho.vue'
import CadastrarTamanho from '@/components/filtros/CadastrarTamanho.vue'
import PaginacaoAdm from './PaginacaoAdm.vue'
import LoadingComponent from '@/components/carregamento/LoadingComponent.vue'

const tamanhoStore = useTamanhoStore();
const DescricaoAberta = ref(false)
const EditarAberto = ref(false)
const idSelecionado = ref(0)
const idEditar = ref(null)
const isLoading = ref(false)

// 🔹 Função com loading + scroll
async function carregarTamanhos(page = 1) {
  try {
    isLoading.value = true;
    await tamanhoStore.getTamanhos({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } finally {
    isLoading.value = false;
  }
}

function openDescricao(id) {
  DescricaoAberta.value = true;
  idSelecionado.value = id;
}
function fecharDescricao() {
  DescricaoAberta.value = false;
}
function editarTamanho(id) {
  idEditar.value = id;
  EditarAberto.value = true;
}
function fecharEdicao() {
  EditarAberto.value = false;
  idEditar.value = null;
}

onMounted(() => carregarTamanhos());
</script>

<template>
  <LoadingComponent v-if="isLoading" />

  <div v-if="!DescricaoAberta && !EditarAberto" class="tamanhos">
    <slot></slot>
    <div class="tamanho" v-for="tamanho in tamanhoStore.tamanhos" :key="tamanho.id">
      <TamanhoAdm :id="tamanho.id" :nome="tamanho.nome" :qtdFatia="tamanho.qtdFatia" :massakg="tamanho.massakg"
        :formato="tamanho.formato" :categoria="tamanho.categoria" @open="openDescricao" @editar="editarTamanho" />
    </div>

    <PaginacaoAdm :page="tamanhoStore.page" :totalPages="tamanhoStore.totalPages" @changePage="carregarTamanhos" />
  </div>

  <DescricaoTamanho v-else-if="DescricaoAberta" @fechar="fecharDescricao" :id="idSelecionado" />

  <CadastrarTamanho v-else-if="EditarAberto" :open="EditarAberto" :idEditar="idEditar" @close="fecharEdicao" />
</template>

<style scoped>
.tamanhos,
.descricao {
  display: flex;
  flex-direction: column;
  padding: 0 7vw 0 50px;
  width: 71vw;
  margin-bottom: 100px;
}

.tamanho {
  width: 100%;
  padding: 5px;
}
</style>
