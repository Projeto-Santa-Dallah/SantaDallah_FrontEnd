<script setup>
import { ref, reactive, watch } from "vue";

const openAddCategoria = ref(false);

const Categoria = reactive({
  id: null,
  nome: "",
  descricao: "",
  }
);

watch(openAddCategoria, (novoValor) => {
  if (!novoValor) {
    Object.assign(Categoria, {
    id: null,    
    nome: "",
    descricao: "",
    });
  }
});

function adicionarCategoria() {
  console.log("Categoria adicionado:", Categoria);
  openAddCategoria.value = false;
}
</script>

<template>
  <div @click="openAddCategoria = true" class="produto-button">
    <button>+</button>
    <span>Adicionar nova Categoria</span>
  </div>

  <div class="container-add-produto" v-if="openAddCategoria">
    <div class="container">
      <div class="div-fechar">
        <button class="fechar" @click="openAddCategoria = false">x</button>
      </div>

      <form @submit.prevent="adicionarCategoria">
        <label for="nome">Nome*</label>
        <input v-model="Categoria.nome" id="nome" type="text" required />
        <label for="descricao">Descricao</label>
        <input v-model="Categoria.descricao" id="descricao" type="text" />

        <button class="button" type="submit">Cadastrar Categoria</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Reutilizando os estilos do addProduto */

.fechar {
  background-color: transparent;
  border: none;
}
.div-fechar {
  text-align: end;
  width: 100%;
}

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
  color: white;
  margin-right: 11px;
}

.produto-button span {
  font-weight: 650;
}

form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.button {
  grid-column: span 2;
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
