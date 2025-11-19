<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

import ListaNav from '../header/ListaNav.vue';
import AcoesUsuario from '../header/AcoesUsuario.vue';
import PadraoCaminho from '../caminho/PadraoCaminho.vue';
</script>

<template>
  <div class="container-header">
  <header>
    <img class="logo" src="@/assets/imagens/logo.png" />
    <nav>
      <ListaNav />
    </nav>
    <AcoesUsuario/>
  </header>
</div>
<div class="container-header-mobile">
  <header>
    <div class="menu-pesquisar">
    <nav>
      <ListaNav />
    </nav>
     <div class="pesquisar">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
          stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    </div>
      <img class="logo" src="@/assets/imagens/logo.png" />
    <AcoesUsuario/>
  </header>
</div>
  <PadraoCaminho/>
</template>

<style scoped>

header {
  position: absolute;
  top:0;
  width: 84.5%;
  display: flex;
  align-items: center;
  background-color: rgba(0, 255, 255, 0);
  padding: 20px 100px;
  z-index: 99999999999999999999999999999999999999999999;
}

.menu-pesquisar{
  display: flex;
}
.pesquisar{
  padding: 0px 20px;
}
.logo {
  width: 80px;
}
.container-header-mobile {
    display: none;
  }
@media (max-width: 700px) {
  .container-header {
    display: none;
  }
  .container-header-mobile{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  header {
    height: 54px;
    width: 90%;
    padding: 0;
    padding: 15px;
    background-color: white;
    justify-content: space-between;
      border-bottom: 1px solid #D9D9D9;
  left:0;
  z-index: 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999;
  }
}
</style>
