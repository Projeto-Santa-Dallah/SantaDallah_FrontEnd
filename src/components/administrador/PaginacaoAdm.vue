<script setup>
const props = defineProps({
  page: { type: Number, required: true },
  totalPages: { type: Number, required: true }
});

const emit = defineEmits(['changePage']);

function irParaPagina(novaPagina) {
  if (novaPagina >= 1 && novaPagina <= props.totalPages) {
    emit('changePage', novaPagina);
  }
}
</script>

<template>
  <div class="paginacao">
    <button :disabled="page === 1" @click="irParaPagina(page - 1)">Anterior</button>
    <span>Página {{ page }} de {{ totalPages }}</span>
    <button :disabled="page === totalPages" @click="irParaPagina(page + 1)">Próxima</button>
  </div>
</template>

<style scoped>
.paginacao {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

button{
    grid-column: span 2;
    background-color: #F8DDFA;
    color: black;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    margin-left: 20px;
    border-radius: 50px;
}

button:hover {
    background-color: #f285fa;
}
</style>
