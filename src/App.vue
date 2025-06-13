<script setup>
import { RouterView } from 'vue-router'
import HeaderPadrao from './components/header/HeaderPadrao.vue';
import LoginComponente from './components/login/LoginComponente.vue';
import ProdutosAdm from './components/administrador/ProdutosAdm.vue';
</script>

<template>
  <HeaderPadrao />
  <RouterView />
  <LoginComponente/>
</template>
<style scoped>

</style>
