<template>
  <form>
    <div v-for="(item, index) in filtroStore.filtros" :key="index">
      <input
        type="radio"
        name="filtro"
        :id="'opt-' + index"
        :value="item.value"
        v-model="filtroStore.filtroSelecionado"
        @change="filtroStore.selecionarFiltro(item.value)"
      />
      <label class="container" :for="'opt-' + index">
        {{ item.titulo }}
      </label>
    </div>
  </form>
</template>

<script setup>
import { useCategoriaFiltroStore } from "@/stores/CategoriaFiltros";
const filtroStore = useCategoriaFiltroStore();
</script>

<style scoped>
input[type="radio"] {
  display: none;
}
input[type="radio"]:checked + .container {
  background-color: #F0BAF4;
}
.container {
  cursor: pointer;
  text-align: start;
  padding: 15px 10px;
  margin: 15px 0;
  background-color: #EBEBEB;
  border-radius: 10px;
  font-weight: 600;
  display: block;
}
</style>
