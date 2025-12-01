<script setup>
const props = defineProps({
  page: { type: Number, required: true },
  totalPages: { type: Number, required: true },
});

const emit = defineEmits(["changePage"]);

function irParaPagina(novaPagina) {
  if (novaPagina >= 1 && novaPagina <= props.totalPages) {
    emit("changePage", novaPagina);
  }
}
</script>

<template>
  <div class="paginacao">
    <button
      :disabled="page === 1"
      @click="irParaPagina(page - 1)"
    >
      Anterior
    </button>

    <span>Página {{ page }} de {{ totalPages }}</span>

    <button
      :disabled="page === totalPages"
      @click="irParaPagina(page + 1)"
    >
      Próxima
    </button>
  </div>
</template>

<style scoped>
.paginacao {
  margin: 35px 0;
  display: flex;
  justify-content: center;
  gap: 12px;
  align-items: center;
  user-select: none;
}

span {
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #333;
}

/* BOTÕES PADRÃO */
button {
  background-color: #F8DDFA;
  padding: 10px 18px;
  border: none;
  border-radius: 50px;
  color: #191645;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}

/* HOVER ATIVO */
button:hover:not(:disabled) {
  background-color: #f285fa;
}

/* DESATIVADO */
button:disabled {
  background-color: #e6e6e6;
  color: #7b7b7b;
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
