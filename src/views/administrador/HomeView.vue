<template>
    <div class="conteiner">
      <div class="coluna-esquerda">
        <div>
          <h2 class="titulo">Sobre a loja:</h2>
  
          <div class="indicador">
            <div class="circulo circulo-escura">21</div>
            <span class="texto-escuro medio">Pedidos em aberto</span>
          </div>
  
          <div class="indicador">
            <div class="circulo circulo-rosa">10</div>
            <span class="texto-rosa medio">Orçamentos de casamento</span>
          </div>
  
          <div class="indicador">
            <div class="circulo circulo-roxa">15</div>
            <span class="texto-roxa medio">Orçamentos simples</span>
          </div>
  
          <div class="indicador indicador-final">
            <div class="circulo circulo-cinza">11</div>
            <span class="texto-cinza medio">Solicitação de orçamento</span>
          </div>
        </div>
  
        <div class="saldo">
          Saldo do mês: <br />
          <span class="valor-saldo">R$ 15.000,00</span>
        </div>
      </div>
  
      <div class="coluna-direita">
        <div class="grafico-container">
          <img
            src="@/assets/imagens/grafico.png"
            alt="Gráfico de Orçamentos e Pedidos"
            class="grafico-imagem"
          />
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .conteiner {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 100px;
    gap: 40px;
  }
  
  .coluna-esquerda {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: max-content;
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
    margin-bottom: 12px;
    width: max-content;
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
  
  .saldo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #191645;
    color: white;
    font-size: 16px;
    font-family: "Inter", sans-serif;
    border-radius: 25px;
    padding: 12px 16px;
    width: 100%;
    height: 70px;
    font-weight: 400;
  }
  
  .valor-saldo {
    margin-top: 10px;
    font-weight: 500;
    font-size: 18px;
  }
  
  .coluna-direita {
    display: flex;
    width: 100%;
    justify-content: end;
  }
  
  .grafico-container {
    display: flex;
    height: min-content;
    justify-content: center;
    align-items: center;
    width: 700px;
    border: 1px solid #191645;
    border-radius: 16px;
    padding: 16px;
  }
  
  .grafico-imagem {
    width: 100%;
    height: auto;
    display: block;
  }
  </style>
  