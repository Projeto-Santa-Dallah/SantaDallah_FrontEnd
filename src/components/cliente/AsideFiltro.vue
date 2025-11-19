<script setup>
import { useCategoriaFiltroStore } from "@/stores/CategoriaFiltros";
import ItensSelect from "../filtros/ItensSelect.vue";
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
  padding-left: 5vw;
}

@media (max-width: 800px) {
  .filtros {
    width: 80%;
    padding-left: 0px;
    margin-top: 10px;
    padding: 30px;
  }
    .filtro-mobile, .ativo{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px;
  }
}
  .filtro-mobile, .ativo{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px;
  }
</style>