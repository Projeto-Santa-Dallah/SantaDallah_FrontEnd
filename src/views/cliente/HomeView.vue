<template>
  <div class="container-home">
    <!-- Fundo com GIF -->
    <div class="fundo"></div>

    <!-- Conteúdo -->
    <div class="itens">
      <div class="titulos">
        <h1>
          Trazendo mais doçura e <br />
          amor para o seu <br />
          momento especial.
        </h1>
        <h2>
          Sempre trabalhando e pensando com muito amor e <br />
          dedicação para levar o melhor para vocês.
        </h2>
        <button>
          Saiba mais sobre os doces
          <svg
            width="26"
            height="24"
            viewBox="0 0 26 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.75 18L16.25 12L9.75 6"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-home {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
/* GIF de fundo */
.fundo {
  position: fixed; /* fica preso na tela */
  top: 0;
  left: 0;
  width:90%;
  height: 115vh; /* ocupa a altura da tela */
  margin-top: -10vh;
  margin-left: 163px;
  background: url("@/assets/imagens/home.gif") no-repeat center center;
  background-size: cover;
  z-index: -1; /* fica atrás do conteúdo */
}


/* Conteúdo */
.itens {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 99px;
  position: relative;
  z-index: 1; /* fica acima do fundo */
}

.bolo {
  height: 70vh;
}
.titulos{
  margin-top: 170px;
}
h1 {
  margin-top: 0;
  color: #191645;
  font-size: 48px;
}

h2 {
  font-size: 18px;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 550;
  margin-top: 20px;
  border: 1px solid #191645;
  background-color: #191645;
  color: white;
  border-radius: 50px;
  font-size: 18px;
  padding: 15px;
}

button:hover {
  cursor: pointer;
  background-color: rgb(9, 7, 36);
}
</style>
