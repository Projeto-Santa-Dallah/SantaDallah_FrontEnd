<template>
    <form>
    <div v-for="(item, index) in filtroLista" :key="index">
      <input 
        type="radio" 
        name="filtro" 
        :id="'opt-' + index"
      >
      <label class="container" :for="'opt-' + index">
        {{ item.titulo }}
      </label>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  filtroLista: {
    type: Array,
    required: true,
  },
});

const filtroSelecionado = ref("");
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
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  margin: 15px 0;
  background-color: #EBEBEB;
  border-radius: 10px;
  font-weight: 600;
  display: block; /* pra label ocupar todo espaço */
}

</style>
