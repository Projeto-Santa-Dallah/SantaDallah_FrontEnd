<script setup>
import { RouterLink } from 'vue-router'
import {computed} from 'vue'
import { useTemplateStore } from '@/stores/template/template';
const TemplateStore= useTemplateStore()
const titulos=computed(() =>{
  return TemplateStore.isAdmin?TemplateStore.adminTitles:TemplateStore.titles
})
</script>

<template>
  <nav>
    <RouterLink
      v-for="(title, index) in titulos" 
      :key="index" 
      :to="title.link" 
      class="router-link">
      <span class="nav-item">{{ title.text }}</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  margin-left: 80px;
}

.nav-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  text-decoration: none;
  color: black;
  margin-right: 20px;
}

.router-link {
  text-decoration: none;
}
.router-link-exact-active .nav-item {
  font-weight: bold;
}
</style>
