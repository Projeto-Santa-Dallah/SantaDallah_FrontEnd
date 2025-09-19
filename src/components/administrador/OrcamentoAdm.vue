<script setup>
import { onMounted } from 'vue'
import { useOrcamentosStore } from '@/stores/orcamentos'

const orcamentosStore = useOrcamentosStore()

const props = defineProps({
  id: Number,
  usuario: String,
  local: String,
  data: String
})

onMounted(() => {
  // Se quiser, pode carregar detalhes do orçamento pela store
  // orcamentosStore.carregarOrcamentoDetalhado(props.id)
})
</script>

<template>
  <div class="orcamento-card">
    <div class="info-principal">
      <div class="usuario-container">
        <div class="flex">
          <span class="titulo">Usuário: </span>
          <span class="usuario">{{ usuario }}</span>
        </div>
        <div class="flex">
          <span class="titulo">Data: </span>
          <span class="data">{{ data }}</span>
        </div>
        <div class="flex">
          <span class="titulo">Local: </span>
          <span class="local">{{ local }}</span>
        </div>
        <span class="detalhes" @click="$emit('open', id)">ver detalhes</span>
      </div>
    </div>

    <div class="acoes">
      <svg @click="orcamentosStore.excluirOrcamento(props.id)" class="svg" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.6667 4.75016V4.11683C12.6667 3.23008 12.6667 2.7867 12.4941 2.44801C12.3423 2.15009 12.1001 1.90787 11.8022 1.75607C11.4635 1.5835 11.0201 1.5835 10.1333 1.5835H8.86667C7.97992 1.5835 7.53654 1.5835 7.19785 1.75607C6.89993 1.90787 6.65771 2.15009 6.50591 2.44801C6.33333 2.7867 6.33333 3.23008 6.33333 4.11683V4.75016M7.91667 9.10433V13.0627M11.0833 9.10433V13.0627M2.375 4.75016H16.625M15.0417 4.75016V13.6168C15.0417 14.947 15.0417 15.612 14.7828 16.1201C14.5551 16.5669 14.1918 16.9303 13.7449 17.158C13.2369 17.4168 12.5718 17.4168 11.2417 17.4168H7.75833C6.42821 17.4168 5.76315 17.4168 5.25511 17.158C4.80822 16.9303 4.44489 16.5669 4.21719 16.1201C3.95833 15.612 3.95833 14.947 3.95833 13.6168V4.75016"
          stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.usuario, .local, .data {
  margin-right: 5px;
  font-weight: 480;
}
.titulo {
  margin-right: 5px;
  font-weight: 700;
}
.flex {
  display: flex;
  margin-bottom: 3px;
}
.orcamento-card {
  display: flex;
  align-items: center;
  padding: 20px 30px;
  border-bottom: 1px solid #d9d9d9;
  transition: .3s;
}
.orcamento-card:hover {
  transform: translate3d(0, -3px, 0) scale(1.01);
  background: #fafafa;
}
.info-principal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
}
.usuario-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: 600;
}
.detalhes {
  color: #545454;
  text-decoration: underline;
  font-size: 14px;
  cursor:pointer;
}
.detalhes:hover {
  color: #8d4692;
}
.acoes {
  display: flex;
  justify-content: end;
  width: 100%;
  margin-top: 10px;
}
.svg {
  margin-left: 10px;
  cursor: pointer;
}
</style>
