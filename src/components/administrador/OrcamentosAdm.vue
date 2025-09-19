<script setup>
import { ref, onMounted } from 'vue'
import { useOrcamentosStore } from '@/stores/orcamentos'
import OrcamentoAdm from './OrcamentoAdm.vue'
import DescricaoOrcamento from './DescricaoOrcamento.vue'
import PaginacaoAdm from './PaginacaoAdm.vue'

const orcamentosStore = useOrcamentosStore()
const descricaoAberta = ref(false)
const idSelecionado = ref(0)

function openDescricao(id) {
  descricaoAberta.value = true
  idSelecionado.value = id
}
function fecharDescricao() {
  descricaoAberta.value = false
}

onMounted(async () => {
  await orcamentosStore.carregarOrcamentos() // chama a store que pega do backend
})
</script>

<template>
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
      @changePage="orcamentosStore.carregarOrcamentos({ page: $event })" 
    />
  </div>

  <div v-else class="descricao">
    <DescricaoOrcamento 
      @fechar="fecharDescricao" 
      :id="idSelecionado" 
      :orcamentos="orcamentosStore.orcamentos" 
    />
  </div>
</template>

<style scoped>
.orcamentos, .descricao {
  display: flex;
  flex-direction: column;
  padding: 0px 7vw 0px 50px;
  width: 71vw;
  margin-bottom: 100px;
}
.orcamento {
  width: 100%;
  padding: 5px 0;
}
span {
  color: #bf99c8;
  font-size: 16px;
}
h1 {
  margin-right: 10px;
  color: #191645;
  font-size: 24px;
}
.header {
  display: flex;
  align-items: center;
}

.titulo-orcamentos {
  font-size: 24px;
  font-weight: 600;
}
</style>
