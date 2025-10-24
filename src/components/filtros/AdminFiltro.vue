<script setup>
import { useCategoriaFiltroStore } from "@/stores/CategoriaFiltros";
import ItensSelect from "./ItensSelect.vue";
import LoadingComponent from '@/components/carregamento/LoadingComponent.vue'
const CategoriaFiltrosStore = useCategoriaFiltroStore();

</script>

<template>
    <LoadingComponent v-if="CategoriaFiltrosStore.isLoading"/>
  <div class="filtros">
    <span class="subtitulo filtro-titulo">Estado dos pedidos </span>
    <ItensSelect :filtroLista="CategoriaFiltrosStore.admProdutos" />
     <slot></slot>
  </div>
</template>
<style scoped>
.filtros {
  display: flex;
  flex-direction: column;
  width: 25vw;
  margin-top: 20px;
  padding-left: 9vw;
}

.filtro-titulo {
  border-bottom: 1px solid #d9d9d9;
  margin-bottom: 5px;
}

.subtitulo {
  font-weight: 600;
  padding: 10px 0px;
  color: #191645;
  font-size: 16px;
}
</style>
