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
  z-index: 9999999999999999999999999999999999999999999999999999999;
}

.logo {
  width: 80px;
}
</style>
