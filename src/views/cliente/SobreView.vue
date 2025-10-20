<script setup></script>

<template>
  <h1>Sobre nós</h1>

  <section>
 
    <div>
      <div class="circulo-grande">
        <div class="fotoGrande"></div>
        <div class='div-pequena'>
            <div class='circulo-pequeno'>
                <div class='FotoPequena'>
                    
                </div>
            </div>
        </div>
      </div>

    </div>

    <div>
      <h3>Quem somos?</h3>
      <span
        >Olá, muito prazer! Somos o Anderson e a Geisiane criadores da Santa Dallah! Nosso Atelie
        surgiu com o intuito de trazer mais doçura e amor para o seu momento especial. O Anderson é
        o responsável pela criação e produção dos doces e a Geisiane pelo atendimento e todo
        administrativo.
      </span>
      <span
        >Uma bela dupla não é?! Sempre trabalhando juntos e pensando com muito amor e dedicação para
        levar o melhor para vocês.</span
      >
    </div>
  </section>
</template>

<style scoped>

h1{
    text-align: center;
    font-size:24px
}
section {
  display: flex;
  width: 70%;
  margin: auto;
  align-items: center;
}

section div {
  width: 50%;
}

h3 {
  font-size: 16px;
}

span {
  letter-spacing: 0.8px;
  display: block;
  margin-top: 15px;
  font-size: 16px;
}

.circulo-grande {
  width: 400px;
  height: 400px;
  background-color: blue;
  border-radius: 50%;
}

.fotoGrande {
  width: 350px;
  height: 350px;
  background-color: pink;
  border-radius: 50%;
  position:relative;
  left: 40px
}

.circulo-pequeno{
    width:260px;
    height:260px;
    background-color: yellow;
    border-radius: 50%;
    position:relative;
   top: -100px;
   left:180px

}

.FotoPequena{
    width: 220px;
    height: 220px;
    background-color: red;
    border-radius: 50%;
    position:relative;
    margin: auto;
    top:20px
}



  
</style>
