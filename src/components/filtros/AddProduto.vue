<script setup>
import { ref, reactive, watch } from "vue";

const openAddProduct = ref(false);
const produto = reactive({
  id: null,
  nome: "",
  descricao: "",
  tipo: null,
  validade: null,
  preco: "",
  sabor: "",
  tamanho: {
    id: null,
    nome: "",
    qtdFatia: null,
    massakg: "",
    formato: "",
    categoria: null,
  },
  categoria: [
    {
      id: null,
      nome: "",
      descricao: "",
    }
  ]
});

watch(openAddProduct, (newValue) => {
  if (!newValue) {
    Object.assign(produto, {
      id: null,
      nome: "",
      descricao: "",
      tipo: null,
      validade: null,
      preco: "",
      sabor: "",
      tamanho: {
        id: null,
        nome: "",
        qtdFatia: null,
        massakg: "",
        formato: "",
        categoria: null,
      },
      categoria: [
        {
          id: null,
          nome: "",
          descricao: "",
        }
      ]
    });
  }
});
</script>

<template>
  <div @click="openAddProduct = true" class="produto-button">
    <button>+</button>
    <span>Adicionar novo produto</span>
  </div>

  <div class="container-add-produto" v-if="openAddProduct">
    <div class="container">
      <div class="div-fechar">
        <button class="fechar" @click="openAddProduct = false">x</button>
      </div>

      <form @submit.prevent="adicionarProduto">
        <!-- Nome -->
        <label for="nome">Nome*</label>
        <input v-model="produto.nome" id="nome" type="text" required />

        <!-- Descrição -->
        <label for="descricao">Descrição*</label>
        <textarea v-model="produto.descricao" id="descricao" required></textarea>

        <!-- Tipo -->
        <label for="tipo">Tipo*</label>
        <input v-model="produto.tipo" id="tipo" type="number" required />

        <!-- Validade -->
        <label for="validade">Validade (dias)*</label>
        <input v-model="produto.validade" id="validade" type="number" required />

        <!-- Preço -->
        <label for="preco">Preço*</label>
        <input v-model="produto.preco" id="preco" type="number" step="0.01" required />

        <!-- Sabor -->
        <label for="sabor">Sabor*</label>
        <input v-model="produto.sabor" id="sabor" type="text" required />

        <!-- Tamanho -->
        <label for="tamanhoNome">Tamanho (nome)</label>
        <input v-model="produto.tamanho.nome" id="tamanhoNome" type="text" />

        <label for="qtdFatia">Qtd de Fatias</label>
        <input v-model="produto.tamanho.qtdFatia" id="qtdFatia" type="number" />

        <label for="massa">Massa (kg)</label>
        <input v-model="produto.tamanho.massakg" id="massa" type="text" />

        <label for="formato">Formato</label>
        <input v-model="produto.tamanho.formato" id="formato" type="text" />

        <!-- Categoria principal (apenas 1 ou várias) -->
        <label for="categoria">Categoria*</label>
        <input v-model="produto.categoria[0].nome" id="categoria" type="text" />

        <button class="button" type="submit">Cadastrar Produto</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.centro {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fechar {
  background-color: transparent;
  border: none;
}

.div-fechar {
  color: white;
  border: none;
  border-radius: 5px;
  text-align: end;
  width: 100%;
}

/* Container do formulário */
.container-add-produto {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.produto-button {
  margin-left: calc(15vw - 30px);
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding-right: 9vw;
  margin-bottom: 20px;
  background-color: transparent;
  border: none;
  justify-content: end;
}

.produto-button button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #F0BAF4;
  border-color: #F0BAF4;
  color: rgb(255, 255, 255);
  margin-right: 11px;
}

.produto-button span {
  font-weight: 650;
}

/* Estilo para inputs */
.input-produto {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Estilo para o grid de inputs */
form {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
}

textarea {
  grid-column: span 2;
  /* Ocupa duas colunas */
}

.button {
  grid-column: span 2;
  /* Botão centralizado */
  background-color: #F0BAF4;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
}

.button:hover {
  background-color: #f285fa;
}
</style>
