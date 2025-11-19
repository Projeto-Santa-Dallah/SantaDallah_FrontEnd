<script setup>
import ProdutosHeader from '@/components/cliente/ProdutosHeader.vue'
import AsideFiltro from '@/components/cliente/AsideFiltro.vue'
import PadraoProdutos from '@/components/cliente/PadraoProdutos.vue'
import { ref } from 'vue'

const mostrarFiltro = ref(false)
</script>

<template>
  <div>
    <ProdutosHeader />

    <!-- Botão Mobile -->
    <button class="btn-filtro-mobile" @click="mostrarFiltro = !mostrarFiltro">
      <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 7H16M1 1H19M7 13H13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Filtros
    </button>

    <main>
      <!-- MENU LATERAL MOBILE -->
      <div class="filtro-mobile" :class="{ ativo: mostrarFiltro }">
        <AsideFiltro />
      </div>

      <PadraoProdutos />
    </main>
  </div>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  width: 100vw;
}

/* Botão mobile escondido no desktop */
.btn-filtro-mobile {
  display: none;
}

@media (max-width: 800px) {
  main {
    flex-direction: column;
  }

  /* botão aparece */
  .btn-filtro-mobile {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 25px 25px;
    padding: 10px 16px;
    background: #f2f2f200;
    border: none;
    cursor: pointer;
    font-weight: 600;
  }

  /* Filtro vira painel mobile */
  .filtro-mobile {
    max-height: 0;
    overflow: hidden;
    transition: max-height .3s ease;
  }

  .filtro-mobile.ativo {
    max-height: 500px; /* suficiente p/ abrir */
  }
}
</style>
