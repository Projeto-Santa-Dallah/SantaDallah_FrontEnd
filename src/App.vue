<script setup>
import { RouterView } from 'vue-router'
import HeaderPadrao from './components/header/HeaderPadrao.vue';
import LoginComponente from './components/login/LoginComponente.vue';
import ProdutosAdm from './components/administrador/ProdutosAdm.vue';
</script>

<template>
  <HeaderPadrao />
  <div class="container">
  <RouterView />
  </div>
  <!-- <LoginComponente/> -->
</template>
<style scoped>
.container{
  margin-top: 84px;
}
</style>
