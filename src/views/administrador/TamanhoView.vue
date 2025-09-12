<script setup>
import {ref} from 'vue'
import AdminFiltro from "@/components/filtros/AdminFiltro.vue";
import AddTamanho from "@/components/filtros/AddTamanho.vue";
import TamanhosAdm from "@/components/administrador/TamanhosAdm.vue";
import CadastrarTamanho from '@/components/filtros/CadastrarTamanho.vue'
const openAddTamanho = ref(false);

function openTamanho() {
  openAddTamanho.value = true;
}
function closeTamanho() {
  openAddTamanho.value = false;
}
</script>

<template>
  <div class="filtro-tamanhos">
    <AdminFiltro> <AddTamanho @open="openTamanho()" /></AdminFiltro>
    <CadastrarTamanho :open="openAddTamanho" @close="closeTamanho()" v-if="openAddTamanho"/>
    <TamanhosAdm v-else>
      <div class="tamanhos-header">
        <div class="header">
          <h1 class="titulo-tamanhos">Tamanhos</h1>
          <span> (58 encontrados)</span>
        </div>
      </div>
    </TamanhosAdm>
  </div>
</template>
<style scoped>
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
.filtro-tamanhos {
  display: flex;
  flex-direction: row;
  margin-top: 80px;
}
.titulo-tamanhos {
  font-size: 24px;
  font-weight: 600;
}
</style>
