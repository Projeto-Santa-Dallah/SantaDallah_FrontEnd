<script setup>
import { ref } from 'vue'
import AdminFiltro from "@/components/filtros/AdminFiltro.vue"
import AddOrcamento from "@/components/filtros/AddOrcamento.vue"
import OrcamentosAdm from "@/components/administrador/OrcamentosAdm.vue"
import CadastrarOrcamento from '@/components/filtros/CadastrarOrcamento.vue'

const openAddOrcamento = ref(false)

function openOrcamento() {
  openAddOrcamento.value = true
}
function closeOrcamento() {
  openAddOrcamento.value = false
}
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
          <span>(5 encontrados)</span>
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
</style>
