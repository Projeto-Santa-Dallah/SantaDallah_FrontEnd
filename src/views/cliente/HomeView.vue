<script setup>
import { PassageUser } from '@passageidentity/passage-elements/passage-user'
import { ref, onMounted, watch, computed } from 'vue'
import { useAuth } from '@/composables/auth'
import axios from 'axios'
import { useTemplateStore } from '@/stores/template/template'
import { useRouter } from 'vue-router'

// Importação do carrossel
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

// 🎯 Array de feedbacks com fotos SVG
const feedbacks = ref([
  {
    nome: "Elizabeth Schulze",
    texto:
      "Trabalho impecável e atendimento incrível! Além de lindo, o bolo estava delicioso, nunca recebi tantos elogios como dessa vez. O MELHOR bolo de pistache com frutas vermelhas que já comi na vida.",
    foto: "/imagens/eliza.png"
  },
  {
    nome: "Camila Thais Barater",
    texto:
      "Melhor torta alemã que já provei. Amo os bolos, e já provei praticamente todos os sabores, deliciosos. Docinhos maravilhosos. Atendimento impecável! Cliente satisfeita desde 2020!",
    foto: "/imagens/cami.png"
  },
  {
    nome: "Daniela Deuschle",
    texto:
      "Adoro o atendimento, já sou cliente a alguns anos, sempre superam suas expectativas. Além de ficar muito bonito o bolo, ele é muito saboroso.",
    foto: "/imagens/dani.png"
  },
  {
    nome: "Mariana Silva",
    texto:
      "Bolos lindos e saborosos! Sempre que encomendo, todos ficam encantados. Atendimento nota 10!",
    foto: "/imagens/padrao-user.png"
  },
  {
    nome: "Renata Costa",
    texto:
      "Os docinhos são perfeitos e o bolo de aniversário ficou incrível! Atendimento muito atencioso, recomendo de olhos fechados.",
    foto: "/imagens/padrao-user.png"
  },
  {
    nome: "Paula Rodrigues",
    texto:
      "Cada detalhe é pensado com carinho. Os sabores são deliciosos e o atendimento é impecável. Sempre volto para novas encomendas!",
    foto: "/imagens/padrao-user.png"
  }
])
function createUrlImage(src) {
  return new URL(src, import.meta.url).href;
}
const slidesRef = ref(null)
const totalSlides = computed(() => feedbacks.value.length)
const slidesVisiveis = 3

const currentSlide = ref(0)

const visibleNums = computed(() => {
  const nums = []
  for (let i = 0; i < slidesVisiveis; i++) {
    const idx = currentSlide.value + i
    if (idx < totalSlides.value) nums.push(idx + 1)
  }
  return nums
})

function atualizarPagina(event) {
  const idx = event && typeof event.currentSlide === 'number' ? event.currentSlide : 0
  currentSlide.value = idx
}

function goToSlideIndex(index) {
  if (index < 0) index = 0
  if (index > totalSlides.value - 1) index = totalSlides.value - 1

  if (!slidesRef.value) {
    currentSlide.value = index
    return
  }

  if (typeof slidesRef.value.goToSlide === 'function') {
    slidesRef.value.goToSlide(index)
  } else if (typeof slidesRef.value.slideTo === 'function') {
    slidesRef.value.slideTo(index)
  }

  currentSlide.value = index
}

function paginaAnterior() {
  goToSlideIndex(currentSlide.value - 1)
}
function proximaPagina() {
  goToSlideIndex(currentSlide.value + 1)
}

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
  async (isAdmin) => {
    try {
      carregando.value = true
      if (isAdmin === null || isAdmin === undefined) return

      if (isAdmin) {
        await router.replace('/admin')
      } else {
        await router.replace('/')
      }
    } catch (error) {
      console.error('Erro ao verificar admin:', error)
    }
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
        <img src="/imagens/home.gif" alt="Animação decorativa" />
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
          <svg width="26" height="24" viewBox="0 0 26 24" fill="none">
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
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink">
          <rect width="42" height="42" fill="url(#pattern0_707_259)" />
          <defs>
            <pattern id="pattern0_707_259" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlink:href="#image0_707_259" transform="scale(0.0078125)" />
            </pattern>
            <image id="image0_707_259" width="128" height="128" preserveAspectRatio="none"
              xlink:href="data:image/png;base64,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" />
          </defs>
        </svg>

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
    <!-- Carrossel de feedbacks -->
    <div class="carrossel">
      <div class="titulo-feedbaacks"><h1>Feedbacks</h1></div>
      <vueper-slides ref="slidesRef" class="no-shadow custom-slides" :visible-slides="3" :slide-ratio="1 / 4"
        :dragging-distance="70" :slide-margin="20" :bullets="false" :arrows="false" :infinite="true" :center-mode="true"
        @slide="atualizarPagina">
        <vueper-slide v-for="(feedback, i) in feedbacks" :key="i">
          <template #content>
            <div class="feedback-slide">
              <div class="user-estrelas">
                <div class="user-depoimento"><img :src="createUrlImage(feedback.foto)" alt="Foto {{ feedback.nome }}"
                    class="feedback-foto" /> <span class="feedback-nome">{{ feedback.nome }}</span>
                </div> <div class="container-estrelas"><img src="/imagens/estrelas.png" alt="Foto estrelas"
                      class="estrelas" /></div>
              </div>
              <p class="feedback-texto">{{ feedback.texto }}</p>
            </div>
          </template>
        </vueper-slide>
      </vueper-slides>

      <div class="bolinhas">
        <div class="seta" @click="paginaAnterior"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 6L9 12L15 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>
        <div v-for="num in visibleNums" :key="num" class="bolinha" :class="{ ativo: currentSlide === (num - 1) }"
          @click="goToSlideIndex(num - 1)">
          {{ num }}
        </div>
        <div class="seta" @click="proximaPagina"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 18L15 12L9 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.carrossel {
  margin: 100px auto;
  width: 90%;
  padding: 40px;
  overflow: hidden;
  position: relative;
}

/* Centraliza verticalmente */
.vueperslides__track {
  align-items: center;
}

/* Slides */
.vueperslide {
  background: #191645;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  color: #fff;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  transform: scale(0.9);
  opacity: 0.85;
  padding: 50px 30px;
  text-align: center;
  height: 180px;
}

.vueperslide--active {
  transform: scale(1);
  z-index: 2;
  opacity: 1;
}

/* Texto dos feedbacks */
.titulo-feedbaacks{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
}
.titulo-feedbaacks h1{
  padding-bottom: 50px;
  font-size: 30px;
  color: black;
  font-weight: 510;
}
.feedback-slide {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.feedback-foto {
  width: 40px;
  height: 40px;
  margin-right: 15px;
  border-radius: 50%;
  object-fit: contain;
  margin-bottom: 10px;
}

.feedback-texto {
  font-size: 15px;
  line-height: 1.4;
  color: #ffffff;
  font-weight: 300;
  margin: 0;
  width: 100%;
  text-align: justify;

}

.feedback-nome {
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
}

.estrelas {
  width: 100px;
}

.container-estrelas, .user-estrelas {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
}

/* Indicadores */
.bolinhas {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  gap: 10px;
}

.bolinha {
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #191645;
  font-weight: 700;
  font-size: 12px;
  transition: all 0.2s ease;
  cursor: pointer;
  user-select: none;
}

.bolinha.ativo {
  border-radius: 50%;
  color: #fff;
  background: #191645;
  transform: scale(1.08);
  box-shadow: 0 6px 18px rgba(25, 22, 69, 0.25);
}

/* Setas */
.seta {
    display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #191645;
  cursor: pointer;
  user-select: none;
  padding: 6px;
  transition: color 0.15s;
}

.seta:hover {
  color: #555;
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

.user-depoimento {
  width: 100%;
  display: flex;
  align-items: center;
}

.depoimento img {
  width: 400px;
  padding-left: 40px;
}

.texto-depoimento {
  padding-left: 100px;
  padding-right: 40px;
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
  font-size: 16px;
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
