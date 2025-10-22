<script setup>
import { RouterView } from 'vue-router'
import HeaderPadrao from '@/components/header/HeaderPadrao.vue';
</script>

<template>
  <HeaderPadrao />
  <div class="container">
  <RouterView />
  </div>
</template>
