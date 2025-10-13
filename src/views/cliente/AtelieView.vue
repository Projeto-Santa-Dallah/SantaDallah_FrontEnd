<script setup lang="ts">
import { ref } from 'vue';

// Importa todas as imagens da pasta de forma estática
const imagens = import.meta.glob('@/assets/imagens/*.png', {
  eager: true,
  import: 'default',
});

// Função para gerar a URL real das imagens
function createUrlImage(src: string): string {
  return imagens[`/src/assets/imagens/${src}`];
}

// Lista de bolos e doces
const produtos = ref([
  { id: 1, nome: "Bolo de Brigadeiro", img: "bolo-brigadeiro.png" },
  { id: 2, nome: "Bolo de Casamento", img: "bolo-casamento.png" },
  { id: 3, nome: "Bolo Coração", img: "bolo-coracao.png" },
  { id: 4, nome: "Bolo Florido", img: "bolo-florido.png" },
  { id: 5, nome: "Bolo de Frutas Vermelhas", img: "bolo-frutas-vermelhas.png" },
  { id: 6, nome: "Bolo de Frutas", img: "bolo-frutas.png" },
  { id: 7, nome: "Bolo de Morango com Chocolate", img: "bolo-morango-chocolate.png" },
  { id: 8, nome: "Bolo de Pistache", img: "bolo-pistache.png" },
  { id: 9, nome: "Bolo Rosa", img: "bolo-rosa.png" },
  { id: 10, nome: "Bolo 3 Camadas", img: "bolo-3-camadas.png" },
  { id: 11, nome: "Bolo 4 Camadas", img: "bolo-4-camadas.png" },
  { id: 12, nome: "Doces de Casamento", img: "doces-casamento.png" },
]);
</script>

<template>
  <div class="masonry">
    <div class="item" v-for="(produto, index) in produtos" :key="index">
      <img :src="createUrlImage(produto.img)" :alt="produto.nome" />
      <!-- <span class="legenda">{{ produto.nome }}</span> -->
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.item img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  display: block;
}

.item:hover {
  transform: scale(1.03);
}

/* Legenda abaixo das imagens */
.legenda {
  display: block;
  margin-top: 8px;
  font-family: "Inter", sans-serif;
  color: white;
  text-align: center;
  font-size: 15px;
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
