<!-- AddOrcamento.vue -->
<template>
  <div @click="$emit('open')" class="pedido-button">
    <button>+</button>
    <span>Adicionar novo orçamento</span>
  </div>
</template>

<style scoped>
.pedido-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.pedido-button button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #F0BAF4;
  border: none;
  color: white;
  margin-right: 10px;
}

.pedido-button span {
  font-weight: 600;
}
</style>
