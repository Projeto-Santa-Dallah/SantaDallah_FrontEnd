<script setup>
import OrcamentoProduto from '@/components/administrador/grafico/OrcamentoProduto.vue'
import SaboresFavoritos from '@/components/administrador/grafico/SaboresFavoritos.vue'
import { ref, onMounted, watch} from 'vue';

const selectedColor = ref('purple');
// pega a data de hoje
const today = new Date()

// controla a data selecionada no calendário
const selectedDate = ref(today)


const attrs = ref([
  {
    key: 'today',
    highlight: {
      color: 'purple',
      fillMode: 'solid'
    },
    dates: today // aqui marca o dia de hoje
  }
])
</script>
<template>
    <div class="conteiner">
      <div class="container-esquerda">
      <div class="coluna-esquerda">
        <div class="circulos">
          <div>
          <div class="indicador">
            <div class="circulo circulo-escura">21</div>
            <span class="texto-escuro medio">Pedidos em aberto</span>
          </div>
  
          <div class="indicador">
            <div class="circulo circulo-rosa">10</div>
            <span class="texto-rosa medio">Orçamentos de casamento</span>
          </div>
          </div>
          <div>
          <div class="indicador">
            <div class="circulo circulo-roxa">15</div>
            <span class="texto-roxa medio">Orçamentos simples</span>
          </div>
  
          <div class="indicador indicador-final">
            <div class="circulo circulo-cinza">11</div>
            <span class="texto-cinza medio">Solicitação de orçamento</span>
          </div>
        </div>
        </div>
      </div>
  
      <div class="coluna-direita">
        <div class="grafico-container">
          <OrcamentoProduto/>
        </div>
      </div>
    </div>
  
  <div class="container-direita">
    <div class="calendario">
  <VCalendar
    v-model="selectedDate"
    borderless
    :initial-page="{ month: today.getMonth() + 1, year: today.getFullYear() }"
    :color="'purple'"
    :attributes="attrs"
  />
    </div>
        <div class="grafico-circulo">
          <SaboresFavoritos/>                                               
    </div>
   
  </div></div>
  </template>
  
  <style scoped>
    .calendario{
          display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 30vh;
  }
  .grafico-circulo{
        display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
        z-index: 9999;
  }
  .container-direita{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 23vw;
  }
  .circulos{
    display: flex;
    align-items: center;
    margin:5px 0px;
  }
  .conteiner {
    display:flex;
    padding: 30px 100px;
    gap: 40px;
  }
  
  .coluna-esquerda {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 60vw;
  }
  
  .titulo {
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 16px;
  }
  
  .indicador {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 22px;
    width: 30vw;
  }
  
  .indicador-final {
    margin-bottom: 24px;
  }
  
  .circulo {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 30px;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    color: white;
  }
  
  .circulo-escura {
    background-color: #191645;
  }
  
  .circulo-rosa {
    background-color: #BF99C8;
  }
  
  .circulo-roxa {
    background-color: #F0BAF4;
  }
  
  .circulo-cinza {
    background-color: #545454;
  }
  
  .texto-escuro {
    font-size: 0.875rem;
    color: #191645;
  }
  
  .texto-rosa {
    font-size: 0.875rem;
    color: #BF99C8;
  }
  
  .texto-roxa {
    font-size: 0.875rem;
    color: #F0BAF4;
  }
  
  .texto-cinza {
    font-size: 0.875rem;
    color: #545454;
  }
  
  .medio {
    font-size: 16px;
    font-family: "Inter", sans-serif;
    font-weight: 700;
  }
  
  .valor-saldo {
    margin-top: 10px;
    font-weight: 500;
    font-size: 18px;
  }
  
  .coluna-direita {
    display: flex;
    width: 100%;
  }
  
  .grafico-container {
    width: 100%;
    height: 55vh;
  }
  
  .grafico-imagem {
    width: 100%;
    height: auto;
    display: block;
  }
  </style>
  