<script setup>
</script>

<template>
  <div class="sem-itens">
    <h1>Seu carrinho está vazio</h1>
    <!-- <router-link class="sem-itens-botao" to="/produtos/all">
      Adicionar produtos
    </router-link> -->
  </div>
</template>

<style scoped>
.animacao-carregamento img {
  width: 250px;
}
.sem-itens {
  gap: 20px;
  width: 100vw;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.sem-itens-botao {
  font-weight: 600;
  color: white;
  background-color: #29375B;
  border-radius: 3rem;
  text-decoration: none;
  padding: 8px 25px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: 0.5s;
}
.sem-itens-botao:hover {
  transform: translateY(-10px);
}
</style>
