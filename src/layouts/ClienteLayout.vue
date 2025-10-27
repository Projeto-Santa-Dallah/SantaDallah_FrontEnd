<script setup>
import { RouterView } from 'vue-router'
import HeaderPadrao from '@/components/header/HeaderPadrao.vue';
import PadrãoFooter from '@/components/footer/PadrãoFooter.vue';
</script>

<template>
  <HeaderPadrao />
 
  <div class="container">
  <RouterView />
   <PadrãoFooter/>
  </div>
</template>

<style scoped>

</style>
