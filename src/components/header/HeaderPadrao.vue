<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import ListaNav from '../header/ListaNav.vue';
import AcoesUsuario from '../header/AcoesUsuario.vue';
import PadraoCaminho from '../caminho/PadraoCaminho.vue';
</script>

<template>
  <header>
    <img class="logo" src="@/assets/imagens/logo.png" />
    <nav>
      <ListaNav />
    </nav>
    <AcoesUsuario/>
  </header>
  <PadraoCaminho/>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  background-color: rgba(0, 255, 255, 0);
  padding: 30px 100px;
}

.logo {
  width: 80px;
}
</style>
