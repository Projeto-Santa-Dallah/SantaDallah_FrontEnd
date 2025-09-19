<script setup>
import { ref, onMounted } from 'vue'
import AdminFiltro from "@/components/filtros/AdminFiltro.vue"
import AddOrcamento from "@/components/filtros/AddOrcamento.vue"
import OrcamentosAdm from "@/components/administrador/OrcamentosAdm.vue"
import CadastrarOrcamento from '@/components/filtros/CadastrarOrcamento.vue'
import { useOrcamentosStore } from '@/stores/orcamentos' // a store que você vai criar

const openAddOrcamento = ref(false)
const orcamentosStore = useOrcamentosStore()

function openOrcamento() {
  openAddOrcamento.value = true
}
function closeOrcamento() {
  openAddOrcamento.value = false
}

onMounted(async () => {
  await orcamentosStore.carregarOrcamentos()
  console.log(orcamentosStore.orcamentos) // agora vai mostrar os dados
})
</script>

<template>
  <div class="filtro-orcamentos">
    <AdminFiltro>
      <AddOrcamento @open="openOrcamento()" />
    </AdminFiltro>

    <CadastrarOrcamento :open="openAddOrcamento" @close="closeOrcamento()" v-if="openAddOrcamento"/>

    <OrcamentosAdm v-else>
      <div class="orcamentos-header">
        <div class="header">
          <h1 class="titulo-orcamentos">Orçamentos</h1>
          <span>({{ orcamentosStore.orcamentos.length }} encontrados)</span>
        </div>
      </div>
    </OrcamentosAdm>
  </div>
</template>

<style scoped>
.filtro-orcamentos {
  display: flex;
  flex-direction: row;
  margin-top: 80px;
}

.titulo-orcamentos {
  font-size: 24px;
  font-weight: 600;
  color: #191645;
  margin-right: 10px;
}

span {
  color: #bf99c8;
  font-size: 16px;
}

.header {
  display: flex;
  align-items: center;
}
h1 {
  margin-right: 10px;
  color: #191645;
  font-size: 24px;
}
</style>
