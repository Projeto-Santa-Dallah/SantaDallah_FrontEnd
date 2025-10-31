<script setup>
import { ref, onMounted } from 'vue';

// Variáveis de controle
const mostrarImagem = ref(true);
const dataHoraPagamento = ref('');

// Função para obter a data e hora atual no formato desejado
function obterDataHoraAtual() {
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const hora = String(data.getHours()).padStart(2, '0');
  const minuto = String(data.getMinutes()).padStart(2, '0');

  return `${dia}/${mes}/${ano} às ${hora}:${minuto}`;
}

// Quando o componente for montado, definimos a data e hora e a animação
onMounted(() => {
  dataHoraPagamento.value = obterDataHoraAtual();
  
  // Configura a imagem para desaparecer após 2 segundos (mostra o GIF de check, depois o de aprovado)
  setTimeout(() => {
    mostrarImagem.value = false;
  }, 2000);
});
</script>

<template>
  <div class="loading">
    <div class="animacao-carregamento">
      <img class="confirmacao" v-show="mostrarImagem" src="@/assets/imagens/LoadGif/check-mark-verified.gif" alt="Verificando..." width="50">
      <img class="confirmacao" v-show="!mostrarImagem" src="@/assets/imagens/LoadGif/pagamento-realizado.png" alt="Pagamento Aprovado" width="48">
      <span class="pagamento-realizado">Pagamento realizado com sucesso!</span>
      <span class="span-pqn">{{ dataHoraPagamento }}</span>
      <router-link to="/" class="button">Voltar ao site</router-link>
    </div>
  </div>
</template>

<style scoped>
.button {
  cursor: pointer;
  font-weight: 600;
  color: white;
  background-color: #29375B;
  border-radius: 3rem;
  text-decoration: none;
  padding: 8px 25px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: 0.5s;
  margin: 20px 0px;
}
.button:hover {
  transform: translateY(-10px);
}

.span-pqn {
  font-size: 12px;
}

.pagamento-realizado {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
}

.animacao-carregamento {
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  align-items: center;
  justify-content: center;
  padding: 20px 50px;
  height: min-content;
}

.confirmacao {
  margin: 10px;
}

.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden; /* Remove scroll */
}
</style>