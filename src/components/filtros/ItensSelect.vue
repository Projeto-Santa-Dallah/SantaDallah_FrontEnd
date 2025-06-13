<script setup>
defineProps({
  filtroLista: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div v-for="(item, index) in filtroLista" :key="index">
    <div class="container">
      <span class="subtitulo">{{ item.titulo }}</span>
      <button class="pointer" @click="item.funcao" v-if="item.aberto">-</button>
      <button class="pointer" @click="item.aberto = !item.aberto" v-else>+</button>
    </div>

    <div class="opcoes" v-if="item.aberto">
      <div v-for="(item2, idx) in item.array" :key="idx" class="opcao-input">
        <input
          class="opcao"
          type="radio"
          :id="`${item.titulo}-${item2.nome}`"
          :name="item.titulo"
          :value="item2.value"
          v-model="item.model"
        />
        <label class="opcao-input-label" :for="`${item.titulo}-${item2.nome}`">
          {{ item2.nome }}
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pointer {
  cursor: pointer;
}
button {
  background-color: transparent;
  border: none;
}

.opcao-input {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.opcao-input input[type="radio"] {
  all: unset;
  border: 1.5px solid #d9d9d9;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  margin: 0 8px;
  cursor: pointer;
}

.opcao-input input[type="radio"]:checked {
  background-color: #F0BAF4;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.subtitulo {
  font-weight: 600;
  padding: 10px 0;
}
</style>
