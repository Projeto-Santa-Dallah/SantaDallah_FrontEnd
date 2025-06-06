<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav>
<RouterLink to="/">Home</RouterLink>
<RouterLink to="/produtos">Produtos</RouterLink>
<RouterLink to="/produto">Produto</RouterLink>
<RouterLink to="/orcamentos">Orçamentos</RouterLink>
<RouterLink to="/sobre">Sobre</RouterLink>
<RouterLink to="/atelie">Ateliê</RouterLink>
<RouterLink to="/perfil">Perfil</RouterLink>
<RouterLink to="/carrinho">Carrinho</RouterLink>

<!-- Admin -->
<RouterLink to="/homeAdmin">Home Admin</RouterLink>
<RouterLink to="/produtosAdmin">Produtos Admin</RouterLink>
<RouterLink to="/orcamentoAdmin">Orçamento Admin</RouterLink>
<RouterLink to="/perfilAdmin">Perfil Admin</RouterLink>
      </nav>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
