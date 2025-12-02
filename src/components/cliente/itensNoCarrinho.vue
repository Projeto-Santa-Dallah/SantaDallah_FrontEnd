<script setup>
import itemCarrinho from "./itemCarrinho.vue";

import { useCartStore } from "@/stores/carrinhoStore";

const cart = useCartStore();

function faltamParaFreteGratis() {
  const falta = 250 - cart.valorNoCarrinho;
  return falta > 0 ? falta.toFixed(2).replace('.', ',') : '0,00';
}
</script>

<template>
  <div class="itens-area">
    <p class="itens-info">Todos os itens ({{ cart.itens.length }})</p>

    <div v-for="(item, index) in cart.itens" :key="index">
      <itemCarrinho
        :img="item.foto_url"
        :nome="item.nome"
        :preco="item.preco"
        :id="item.id"
        :sabor="item.sabor"
        :tamanho="item.tamanho"
        :quantidade="item.quantidade"
      />
    </div>
  </div>
</template>

<style scoped>
.itens-area {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 0px 0 0 0;
}

.itens-info {
    display: flex;
    align-items: center;
    height: 100px;
  margin-bottom: 10px;
  font-weight: 600;
}

.frete {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 25px;
}

.valor-frete {
  font-weight: 600;
}

@media (max-width: 768px) {
  .itens-area {
    margin: 0 20px;
  }
  .itens-info {
    font-size: 14px;
  }
}
</style>