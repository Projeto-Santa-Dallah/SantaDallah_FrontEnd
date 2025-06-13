<template>
  <div class="container-home">
    <div class="fundo"><img src="@/assets/imagens/fundo.png" /></div>
    <div class="itens">
      <div class="titulos">
        <h1>Trazendo mais doçura e <br/> amor para o seu <br/> momento especial.</h1>
        <h2>
          Sempre trabalhando e pensando com muito amor e <br/> dedicação para levar o melhor
          para vocês.
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
      <img class="bolo" src="@/assets/imagens/boloHome.png" />
    </div>
  </div>
</template>
<style scoped>
.container-home {
  width: 100%;
  height: 100%;
}
.bolo {
  height: 70vh;
}
.itens {
    display: flex;
    justify-content: space-between;
    align-items: center;
  padding: 0px 99px;
}
h1{
    margin-top: 0;
    color:#191645;
    font-size: 40px;
}
h2{
    font-size:16px ;
}
button{
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight:550;
    margin-top: 20px;
    border:1px solid #191645;
    background-color: #191645;
    color: white;
    border-radius: 50px;
    font-size: 16px;
    padding: 15px;
}
button:hover{
    cursor: pointer;
    background-color:rgb(9, 7, 36);
}
.fundo {
  z-index: -33;
  display: flex;
  justify-content: end;
  top: 0;
  position: absolute;
  width: 100vw;
  height: 100vh;
}
.fundo img {
  height: 100%;
}
</style>
