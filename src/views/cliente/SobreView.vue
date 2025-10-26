<script setup>
import { ref } from 'vue';
import axios from 'axios'
const form = ref({
  tefefone: '',
  nome: '',
  user_email: '',
  mensagem: ''
})

const sucesso = ref('')
const error = ref('')
const popup = ref(false)
const validacao = ref(false)
const enviarEmail = async () => {
  try {
    const response = await axios.post('/send-email/', form.value)
    sucesso.value = response.data.success || 'E-mail enviado com sucesso!'
    popup.value = true
    error.value = ''
    setTimeout(() => {
      popup.value = false
    }, 2500)
    form.value = { telefone: '', nome: '', user_email: '', mensagem: '' } // Limpa o formulário
  } catch (error) {
    validacao.value = true
    error.value = error.response.data || 'Erro ao comunicar servidor'
    console.log('Erro:', error.value)
    sucesso.value = ''
  }
}
</script>

<template>
  <h1>Sobre nós</h1>

  <section class="sobrehome">

    <div>
      <div class="circulo-grande">
        <img src="/src/assets/imagens/fotogrande.jpeg" alt="" class="fotoGrande">
        <div class='div-pequena'>
          <div class='circulo-pequeno'>
            <img src="/src/assets/imagens/fotopequena.jpeg" alt="" class='FotoPequena'>
          </div>
        </div>
      </div>

    </div>

    <div>
      <h3>Quem somos?</h3>
      <span>Olá, muito prazer! Somos o Anderson e a Geisiane criadores da Santa Dallah! Nosso Atelie
        surgiu com o intuito de trazer mais doçura e amor para o seu momento especial. O Anderson é
        o responsável pela criação e produção dos doces e a Geisiane pelo atendimento e todo
        administrativo.
      </span>
      <span>Uma bela dupla não é?! Sempre trabalhando juntos e pensando com muito amor e dedicação para
        levar o melhor para vocês.</span>
    </div>
  </section>


  <section>
    <div>
      <h2>Entre em Contato</h2>
      <span>Se você tiver alguma dúvida, sugestão ou comentário, pode nos enviar uma mensagem. Sua opinião é muito
        importante.</span>

      <div class="ContentMidias">
        <div class="ContentMidia">
          <div class="MidiasRedondo">
            <img src="/src/assets/imagens/phone.svg" alt="">
          </div>
          <div>
            <h3>Telefone</h3>
            <span class="spanMidia">(47) 99288-4976</span>
          </div>
        </div>
        <div class="ContentMidia">
          <div class="MidiasRedondo">
            <img src="/src/assets/imagens/mail-05.svg" alt="">
          </div>
          <div>
            <h3>Email</h3>
            <span class="spanMidia">santadallah@gmail.com</span>
          </div>
        </div>
        <div class="ContentMidia">
          <div class="MidiasRedondo">
            <img src="/src/assets/imagens/marker-pin-01.svg" alt="">
          </div>
          <div>
            <h3>Localização</h3>
            <span class="spanMidia">Rua Frederico Hubner, 37, America, Joinville SC, 89204-280, Brasil.</span>
          </div>
        </div>

      </div>

      <hr>
      <div class="redesSociais">
      <div >
       <h3>Redes Sociais</h3></div>
       
        <div class="iconsMidias">
         <a href="https://api.whatsapp.com/send/?phone=554791706002&text&type=phone_number&app_absent=0" target="_blank"> <img src="/src/assets/imagens/whatsapp 5.svg" alt="" ></a>
         <a href="https://www.instagram.com/santadallah/" target="_blank"><img src="/src/assets/imagens/instagram 6.svg" alt=""></a>
         <a href="https://www.facebook.com/santadallah/" target="_blank"><img src="/src/assets/imagens/facebook(1) 1.svg" ></a>
         <a href="https://www.tiktok.com/@santadallah" target="_blank" ><img src="/src/assets/imagens/tik-tok 1.svg" alt="" ></a>
        </div>
      </div>
    </div>
    <div class="form">
      <form action="" @submit.prevent="enviarEmail">
        <div class="DoisInput">
          <div>
            <label for="">Telefone:</label>
            <input type="text" placeholder="Insira seu telefone" v-model="form.tefefone" >
          </div>
          <div>
            <label for="">Nome:</label>
            <input type="text" placeholder="Insira seu nome" v-model="form.nome" >
          </div>

        </div>

        <label for="">Email</label>
        <input type="email" placeholder="Insira seu email" v-model="form.user_email" required>
         <span class="validacao-span" v-if="!form.user_email.trim()">Campo Obrigatório!</span>

        <label for="">Feedback</label>
        <textarea name="" id="" rows="6"  placeholder="Deixe uma mensagem" v-model="form.mensagem" required></textarea>
          <span class="validacao-span" v-if="!form.mensagem.trim()">Campo Obrigatório!</span>
        <button type="">Enviar</button>
      </form>
        <div v-if="validacao" class="error-servidor">
        <span>Erro ao enviar a mensagem. Servidor fora do ar!</span>
      </div>
    </div>
  </section>
  <transition name="fade">
    <div class="sucesso-form" v-if="popup">
      <div class="popup">
        <img src="/src/assets/imagens/Success Check.gif" alt="" />
        <h1>Sua mensagem foi registrada com sucesso!</h1>
      </div>
    </div>
  </transition>

</template>

<style scoped>
h1 {
  text-align: center;
  font-size: 24px
}

h2 {
  font-size: 24px
}

section {
  display: flex;
  width: 70%;
  margin: auto;
  align-items: center;
  margin-bottom: 25vh;
}

section div {
  width: 50%;
}

h3 {
  font-size: 16px;
  margin: 0;
}

span {
  letter-spacing: 0.8px;
  display: block;
  margin-top: 15px;
  margin-bottom: 30px;
  font-size: 16px;
}

.circulo-grande {
  width: 400px;
  height: 400px;
  background-color: #BF99C8;
  border-radius: 50%;
}

.fotoGrande {
  width: 350px;
  height: 350px;
  background-color: pink;
  border-radius: 50%;
  position: relative;
  left: 40px;
  object-fit: cover;
}

.circulo-pequeno {
  width: 260px;
  height: 260px;
  background-color: white;
  border-radius: 50%;
  position: relative;
  top: -100px;
  left: 180px
}

.FotoPequena {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  position: relative;
  margin: auto;
  top: 20px;
  object-fit: cover;
  left: 18px
}

.MidiasRedondo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #BF99C8;
}

section .ContentMidias {
  display: flex;
  gap: 20px;
  flex-direction: column;
  width: 100%;
}

.spanMidia {
  margin-top: 0px;
  margin-bottom: 0px;
}

section .ContentMidia {
  display: flex;
  gap: 15px;
  width: 100%;
}

hr {
  margin-top: 30px;
  color: #D9D9D9;
}

.DoisInput {
  display: flex;
  width: 100%;
  gap: 20px;
}

.form{
  display: flex;
  justify-content:end;
  align-items: center;

}

form {
  width: 80%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #BF99C8;
  border-radius: 50px;
  padding: 30px;
}



.DoisInput input {
  width: 100%;
}

form input {
  width: 100%;
  height: 35px;
  border-radius: 25px;
  border: 1px solid #BF99C8;
  margin-bottom: 15px;
  padding-left: 10px;
}

textarea{
   width: 100%;
  border-radius: 25px;
  border: 1px solid #BF99C8;
  margin-bottom: 15px;
   resize: none;
   padding-left: 15px;
   padding-top: 10px;
}

label{
  display: flex;
  width: 100%;
}

button{
  width: 25%;
  height: 10%;
  font-size: 16px;
  border-radius: 50px;
  color: white;
  background-color: #BF99C8;
  cursor: pointer;
  border: none;
  margin-top: 40px;
  font-weight: 600;
}

.sobrehome{
height: 50vh;
display: flex;
align-items: center;
}

input:focus,
textarea:focus {
  outline: 1px solid #BF99C8;
}

input::placeholder, textarea::placeholder{
  padding: 10px;
  font-size: 14px;
}

.validacao-span {
  margin: 0;
  color: #da1a1a;
  font-size: 12px;
}
.error-servidor{
  width: 100%;
 text-align: center;
  padding: 10px;
}

.error-servidor span{
  font-size: 14px;
  font-weight: 500;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active em versões mais antigas */ {
  opacity: 0;
}

.popup {
  width: 450px;
  background-color: #ffffff;
  padding: 25px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  border-radius: 25px;
  
}

.popup img {
  width: 100px;
}

.sucesso-form {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.MidiasRedondo{
  display: flex;
  align-items: center;
  justify-content: center;
}

.redesSociais{
  width: 100%;
  display: flex;
  flex-direction: row;
}

.iconsMidias{
  display: flex;
  justify-content: end;
  gap: 10px;
}
</style>
