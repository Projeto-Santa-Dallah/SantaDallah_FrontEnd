<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { useTemplateStore } from '@/stores/template/template'

const TemplateStore = useTemplateStore()
const route = useRoute()
const menuOpen = ref(false)
// Detecta se a rota atual é do admin
const isAdminRoute = computed(() => route.path.startsWith('/admin'))

// Define os títulos com base no tipo de rota
const titulos = computed(() => {
  return isAdminRoute.value ? TemplateStore.adminTitles : TemplateStore.titles
})
</script>

<template>
  <nav class="nav-container">
    
    <!-- MENU HORIZONTAL (DESKTOP) -->
    <div class="nav-desktop">
      <RouterLink
        v-for="(title, index) in titulos" 
        :key="index" 
        :to="title.link" 
        class="router-link">
        <span class="nav-item">{{ title.text }}</span>
      </RouterLink>
    </div>

    <!-- MENU MOBILE -->
    <div class="nav-mobile">
      <button class="hamburger" @click="menuOpen = !menuOpen">
        <!-- SVG Hambúrguer (mostra quando menu fechado) -->
        <svg v-if="!menuOpen" width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 7.5H22.75M1 1H22.75M1 14H22.75" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <!-- SVG X (mostra quando menu aberto) -->
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div class="menu-mobile" v-if="menuOpen">
        <RouterLink
          v-for="(title, index) in titulos" 
          :key="index" 
          :to="title.link" 
          class="menu-item"
          @click="menuOpen = false"
        >
          {{ title.text }}
        </RouterLink>
      </div>
    </div>

  </nav>
</template>



<style scoped>
*{
      margin: 0;
    padding: 0;
}
/* ------------------------------------- */
/* ESTILOS DO MENU DESKTOP (ORIGINAL)    */
/* ------------------------------------- */

.nav-container {
  display: flex;
  align-items: center;
  margin-left: 80px;
}

/* Menu Desktop */
.nav-desktop {
  display: flex;
  align-items: center;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  text-decoration: none;
  color: black;
  margin-right: 20px;
}

.router-link {
  text-decoration: none;
  width: max-content;
}

.router-link-exact-active .nav-item {
  font-weight: bold;
}

/* ------------------------------------- */
/* MENU MOBILE (ESCONDIDO NO DESKTOP)    */
/* ------------------------------------- */

.nav-mobile {
  display: none; /* escondido no desktop */
  position: relative;
}

/* Botão hambúrguer */
.hamburger {
  width: 35px;
  height: 30px;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
}

/* Menu mobile */
.menu-mobile {
    position: fixed; /* Mantido fixed para alinhar na borda esquerda */
    top: 84px; /* Mantido como no código fornecido */
    left: 0;
    width: 100vw;
    background: white;
    /* box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15); */
    border-radius: 8px;
    /* padding: 10px 0; */
    display: flex;
    flex-direction: column;
    z-index: 999;
    border-bottom: 1px solid #A1A1A1;
    margin: 0;
    padding: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
 margin: 0px 22px; /* Mantido como no código fornecido */
 padding: 22px 0px; 
 text-decoration: none;
  color: black;
  font-size: 16px;
  border-bottom: 1px solid #A1A1A1;
}

.menu-item:hover {
  background: #f2f2f2;
}

/* Estilo para rota ativa no mobile (bold, igual ao desktop) */
.menu-item.router-link-exact-active {
  font-weight: bold;
}

/* ------------------------------------- */
/* RESPONSIVIDADE                        */
/* ------------------------------------- */

/* Mobile (<700px) */
@media (max-width: 700px) {

  .nav-container {
    margin-left: 0;
    justify-content: center; /* Centraliza o conteúdo horizontalmente na nav */
  }

  .nav-desktop {
    display: none; /* some o menu normal */
  }

  .nav-mobile {
    display: block; /* ativa o menu mobile */
  }
}

/* Desktop (>=700px) */
@media (min-width: 700px) {
  .nav-mobile {
    display: none;
  }
}

</style>