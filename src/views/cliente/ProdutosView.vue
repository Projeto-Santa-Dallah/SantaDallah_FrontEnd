<script setup>
import ProdutosHeader from '@/components/cliente/ProdutosHeader.vue'
import AsideFiltro from '@/components/cliente/AsideFiltro.vue'
import PadraoProdutos from '@/components/cliente/PadraoProdutos.vue'
</script>

<template>
  <div>
    <ProdutosHeader />
    <main>
      <AsideFiltro />
      <PadraoProdutos />
    </main>
  </div>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  width: 100vw;
}
@media (max-width: 768px) {
  main {
    flex-direction: column;
  }
}
</style>
