<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const imagens = ref([]);
const pagina = ref(1);
const carregando = ref(false);
const acabou = ref(false);

// função para carregar imagens do backend
async function carregarImagens() {
  if (carregando.value || acabou.value) return;
  carregando.value = true;

  try {
    // sua API já configurada no Axios
    const response = await axios.get(`media/images/?descricao=1&page=${pagina.value}`);

    const novosDados = response.data.results || response.data;

    if (novosDados.length === 0) {
      acabou.value = true;
    } else {
      imagens.value.push(...novosDados);
      pagina.value++;
    }
  } catch (err) {
    console.error("Erro ao carregar imagens:", err);
  } finally {
    carregando.value = false;
  }
}
// infinite scroll
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 300
  ) {
    carregarImagens();
  }
});

onMounted(() => {
  carregarImagens();
});
</script>

<template>
  <div class="masonry" v-motion-slide-visible-once-bottom :delay="300" :duration="500">
    <div class="item" v-for="img in imagens" :key="img.attachment_key">
      <img :src="img.url" :alt="img.description || 'imagem'" />
    </div>

  </div>
</template>

<style scoped>
.masonry {
  column-count: 4; /* Máximo de 4 colunas */
  column-gap: 18px;
  padding: 30px 40px;
}

.item {
  break-inside: avoid;
  margin-bottom: 18px;
  display: inline-block;
  width: 100%;
  animation: aparecer 0.6s ease forwards;
    position: relative;
}

@keyframes aparecer {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.item img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  display: block;
  z-index: 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  object-fit: cover;
  position: relative;
}

/* hover agora aplicado na imagem */
.item img:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 18px rgba(255, 255, 255, 0.15);
}


/* Responsividade */
@media (max-width: 1200px) {
  .masonry {
    column-count: 3;
  }
}

@media (max-width: 800px) {
  .masonry {
    column-count: 2;
  }
}

@media (max-width: 500px) {
  .masonry {
    column-count: 1;
  }
}
</style>
