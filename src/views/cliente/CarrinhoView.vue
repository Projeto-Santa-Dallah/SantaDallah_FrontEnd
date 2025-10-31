<script setup>
import itensNoCarrinho from '@/components/cliente/itensNoCarrinho.vue'
import semItensNoCarrinho from '@/components/cliente/semItensNoCarrinho.vue'
import resumoCarrinho from '@/components/cliente/resumoCarrinho.vue'
import { useCartStore } from '@/stores/carrinhoStore'
import { useScreenSize } from "@/composables/useScreenSize"

const cart = useCartStore()
</script>

<template>
  <!-- <div class="container" v-if="cart.itensInCart > 0 && useScreenSize().isMobile">
    <resumoCarrinho inferior="disabled" />
    <itensNoCarrinho />
    <resumoCarrinho superior="disabled" />
  </div>

  <div class="container" v-else-if="cart.itensInCart > 0">
    <itensNoCarrinho />
    <resumoCarrinho />
  </div>

  <semItensNoCarrinho v-else /> -->
    <div v-if="cart.itens.length" class="container">
    <itensNoCarrinho />
    <resumoCarrinho />
  </div>
  <div v-else><semItensNoCarrinho /> </div>
  

</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  gap: 50px;
  margin-bottom: 150px;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    gap: 20px;
  }
}
</style>
