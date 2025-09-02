<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { useCategoriaStore } from "@/stores/categorias";
import { useTamanhoStore } from "@/stores/tamanhos";
import { useProdutosStore } from "@/stores/produtos";
const useCategorias = useCategoriaStore()
const categoriaSelecionada = ref()
const useTamanhos = useTamanhoStore()
const tamanhoSelecionado = ref()
const useProdutos = useProdutosStore()

const openAddProduto = ref(false);
const produto = reactive({
  id: null,
  nome: "",
  descricao: "",
  tipo: null,
  validade: null,
  preco: "",
  sabor: "",
  tamanho: null,
  categoria: [],
  foto: []
});

watch(openAddProduto, (newValue) => {
  if (!newValue) {
    Object.assign(produto, {
      id: null,
      nome: "",
      descricao: "",
      tipo: null,
      validade: null,
      preco: "",
      sabor: "",
      tamanho: null,
      categoria: [],
      foto: []
    });
  }
});

async function adicionarProduto() {
  try {
    produto.categoria = categoriaSelecionada.value;
    produto.tamanho = tamanhoSelecionado.value;
    await useProdutos.salvarProduto({ ...produto}); // chama o store
    openAddProduto.value = false;
  } catch {
    console.log("Erro ao saLvar produto");
  }
}


onMounted(() => {
  useProdutos.getProduct();
  useCategorias.getCategorias();
  useTamanhos.getTamanhos();
});

</script>

<template>
  <div @click="openAddProduto = true" class="produto-button">
    <button>+</button>
    <span>Adicionar novo produto</span>
  </div>

  <div class="container-add-produto" v-if="openAddProduto">
    <div class="container">
      <div class="div-fechar">
        <button class="fechar" @click="openAddProduto = false">x</button>
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
        <label for="tamanho">Tamanho*</label>
        <select name="" id="" v-model="tamanhoSelecionado">
          <option disabled value="">-- Escolha uma opção --</option>
          <option v-for="tamanho in useTamanhos.tamanhos" :key="tamanho.id" :value="tamanho.id">{{
            tamanho.nome }}</option>
        </select>

        <!-- <label for="massa">Massa (kg)</label>
        <input v-model="produto.tamanho.massakg" id="massa" type="text" /> -->

        <!-- <label for="formato">Formato</label>
        <input v-model="produto.tamanho.formato" id="formato" type="text" /> -->

       <label for="categoria">Categoria*</label>
        <select name="" id="" v-model="categoriaSelecionada" multiple>
          <option disabled value="">-- Escolha uma opção --</option>
          <option v-for="categoria in useCategorias.categorias" :key="categoria.id" :value="categoria.id">{{
            categoria.nome }}</option>
        </select>

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
