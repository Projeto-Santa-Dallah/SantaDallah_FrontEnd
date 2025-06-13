<script setup>
import ProdutoAdm from "./ProdutoAdm.vue";

const produtos = [
  {
    id: 1,
    nome: "Banoffi",
    descricao: "Base de biscoito com castanha, doce de leite cozido, bananas frescas fatiadas e creme de baunilha",
    tipo: 1,
    validade: 4,
    preco: "75.00",
    sabor: "Banana e doce de leite",
    tamanho: {
      id: 1,
      nome: "P",
      qtdFatia: 6,
      massakg: "0.00",
      formato: "redondo",
      categoria: 1
    },
    categoria: [
      {
        id: 1,
        nome: "Torta",
        descricao: "Produto doce a base de farinha com recheios variados."
      }
    ]
  },
  {
    id: 2,
    nome: "Brigadeiro Tradicional",
    descricao: "brigadeiro com chocolate 50% com confeito padrão SPLIT.",
    tipo: 1,
    validade: 3,
    preco: "2.45",
    sabor: "Chocolate 50%",
    tamanho: null,
    categoria: [
      {
        id: 3,
        nome: "Brigadeiro",
        descricao: "Produto a base de leite condensado e manteiga, podendo ter variados sabores."
      },
      {
        id: 7,
        nome: "Recheio",
        descricao: "Sabores de recheio dos bolos vulcões"
      }
    ]
  }
];
</script>

<template>
  <div class="produtos">
    <div class="produto" v-for="(produto, index) in produtos" :key="produto.id">
      <ProdutoAdm
        :id="produto.id"
        :nome="produto.nome"
        :preco="produto.preco"
      />
    </div>
  </div>
</template>

<style scoped>
.produtos {
  display: flex;
  flex-direction: column;
  padding: 0px 7vw 0px 50px;
  width: 71vw;
  margin-bottom: 100px;
}

.produto {
  width: 100%;
  padding: 5px;
}

.produtos.two-products {
  justify-content: flex-start;
}
</style>
