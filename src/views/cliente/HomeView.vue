<script setup>
import { PassageUser } from '@passageidentity/passage-elements/passage-user'
import { ref, onMounted, watch } from 'vue'
import { useAuth } from '@/composables/auth'
import axios from 'axios'
import { useTemplateStore } from '@/stores/template/template'
import { useRouter } from 'vue-router'

// Importação do carrossel
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

const templateStore = useTemplateStore()
const router = useRouter()
const carregando = ref(false)

const pararCarregamento = () => {
  setTimeout(() => {
    carregando.value = false
  }, 10000)
}

const user = ref()

const getUserData = async () => {
  try {
    carregando.value = true
    const response = await axios.get('/usuarios/me')
    user.value = response.data
    pararCarregamento()
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error)
  }
}

watch(
  () => templateStore.isAdmin,
  (isAdmin) => {
    if (isAdmin === null || isAdmin === undefined) return
    if (isAdmin) router.replace('/homeAdmin')
    else router.replace('/')
  },
  { immediate: true }
)

useAuth()
onMounted(() => {
  getUserData()
})
</script>

<template>
  <div v-if="carregando && templateStore.isAdmin" class="loading">
    <img src="/src/assets/loading.gif" alt="">
  </div>

  <div class="container-home" v-else>
    <!-- Fundo com GIF -->
    <div class="fundo">
      <div class="img">
        <img src="@/assets/imagens/home.gif" alt="Animação decorativa" />
      </div>
    </div>

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
          <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.75 18L16.25 12L9.75 6" stroke="white" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Depoimento -->
    <div class="depoimento">
      <img src="@/assets/imagens/home-img.png" alt="Animação decorativa" />
      <div class="texto-depoimento">
        <h2>
          Nós da Santa Dallah somos um ateliê de doces artesanais movidos pela paixão em adoçar vidas e celebrar
          momentos especiais. Cada doce que sai da nossa cozinha é feito com os melhores ingredientes e um toque de
          carinho, garantindo uma experiência deliciosa e inesquecível. Transformamos açúcar, farinha e outros
          ingredientes em verdadeiras obras de arte comestíveis. Seja para um café da tarde, uma festa de aniversário,
          um casamento ou apenas para matar aquela vontade de um doce, a Santa Dallah tem a opção perfeita para você.
          Acreditamos que cada mordida deve ser uma celebração. Convidamos você a conhecer nosso universo de sabores e
          deixar a Santa Dallah adoçar seu dia!
        </h2>
        <span>- Ateliê de doces Santa Dallah</span>
      </div>
    </div>

    <!-- Carrossel VueperSlides -->
    <div class="carrossel">
      <vueper-slides
        class="no-shadow"
        :visible-slides="3"
        :slide-ratio="1 / 4"
        :dragging-distance="70"
        arrows-outside
      >
        <vueper-slide
          v-for="i in 9"
          :key="i"
          :title="'Doce #' + i"
          :content="'Descrição do doce número ' + i"
        />
      </vueper-slides>
    </div>
  </div>
</template>

<style scoped>
/* CARROSSEL */
.carrossel {
  margin: 100px auto;
  width: 90%;
  background: linear-gradient(135deg, #ffe8ef, #fcd0d9);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(255, 192, 203, 0.3);
}

/* Centraliza slides */
.vueperslides__track {
  align-items: center;
}

/* Estilo individual dos slides */
.vueperslide {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: #444;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Loading */
.loading {
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.loading img {
  width: 5%;
}

/* Estrutura geral */
.container-home {
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
}

/* Fundo com gif */
.fundo {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  pointer-events: none;
  overflow: hidden;
}

.fundo .img img {
  position: relative;
  width: 80%;
  height: auto;
  object-fit: contain;
  display: block;
  right: 0;
  margin-left: 20%;
}

/* Conteúdo */
.itens {
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 99px;
  position: relative;
  z-index: 1;
}

.depoimento {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 99px;
}

.depoimento img {
  width: 400px;
  padding-left: 200px;
}

.texto-depoimento {
  padding-left: 150px;
}

.texto-depoimento h2 {
  font-weight: 450;
}

.texto-depoimento span {
  font-weight: 600;
}

/* Títulos */
h1 {
  margin-top: 0;
  color: #191645;
  font-size: 48px;
}

h2 {
  font-size: 18px;
}

/* Botão */
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
