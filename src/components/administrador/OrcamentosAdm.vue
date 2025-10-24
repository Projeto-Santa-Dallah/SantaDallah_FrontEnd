<script setup>
import { ref, onMounted } from 'vue'
import { useOrcamentosStore } from '@/stores/orcamentos'
import OrcamentoAdm from './OrcamentoAdm.vue'
import DescricaoOrcamento from './DescricaoOrcamento.vue'
import PaginacaoAdm from './PaginacaoAdm.vue'
import LoadingComponent from '@/components/carregamento/LoadingComponent.vue'

const orcamentosStore = useOrcamentosStore()
const descricaoAberta = ref(false)
const idSelecionado = ref(0)
const isLoading = ref(false)

function openDescricao(id) {
  descricaoAberta.value = true
  idSelecionado.value = id
}
function fecharDescricao() {
  descricaoAberta.value = false
}

// 🔹 Função com loading + scroll
async function carregarOrcamentos(page = 1) {
  try {
    isLoading.value = true
    await orcamentosStore.carregarOrcamentos({ page })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } finally {
    isLoading.value = false
  }
}

onMounted(() => carregarOrcamentos())
</script>

<template>
  <LoadingComponent v-if="isLoading" />
  <div v-if="!descricaoAberta" class="orcamentos">
    <div class="orcamentos-header">
      <div class="header">
        <h1 class="titulo-orcamentos">Orçamentos</h1>
        <span>({{ orcamentosStore.orcamentos.length }} encontrados)</span>
      </div>
    </div>

    <div class="orcamento" v-for="orcamento in orcamentosStore.orcamentos" :key="orcamento.id">
      <OrcamentoAdm
        :id="orcamento.id"
        :usuario="orcamento.usuario"
        :data="orcamento.data"
        :local="orcamento.local"
        @open="openDescricao"
      />
    </div>

    <PaginacaoAdm
      :page="orcamentosStore.page"
      :totalPages="orcamentosStore.totalPages"
      @changePage="carregarOrcamentos"
    />
  </div>

  <DescricaoOrcamento
    v-else
    @fechar="fecharDescricao"
    :id="idSelecionado"
    :orcamentos="orcamentosStore.orcamentos"
  />
</template>

<style scoped>
.orcamentos, .descricao {
  display: flex;
  flex-direction: column;
  padding: 0 7vw 0 50px;
  width: 71vw;
  margin-bottom: 100px;
}
.orcamento {
  width: 100%;
  padding: 5px 0;
}
span { 
  color: #bf99c8; 
}
h1 { 
  color: #191645; 
  font-size: 24px; 
  margin-right: 10px; 
}
.header { 
  display: flex; 
  align-items: center;
 }
.titulo-orcamentos { 
  font-weight: 600; 
}
</style>
