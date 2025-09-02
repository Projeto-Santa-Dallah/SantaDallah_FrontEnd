<script setup>
import { ref, reactive, watch, onMounted} from "vue";
import { useCategoriaStore } from "@/stores/categorias";
import { useTamanhoStore } from "@/stores/tamanhos";
const useCategorias = useCategoriaStore()
const useTamanho = useTamanhoStore()
onMounted(() => {
  useCategorias.getCategorias();
});
const openAddTamanho = ref(false);
const categoriaSelecionada = ref()
const tamanho = reactive({
  id: null,
  nome: "",
  qtdFatia: null,
  massakg: "",
  formato: "",
  categoria: ""
});

watch(openAddTamanho, (novoValor) => {
  if (!novoValor) {
    Object.assign(tamanho, {
      id: null,
      nome: "",
      qtdFatia: null,
      massakg: "",
      formato: "",
      categoria: null
    });
  }
});


async function adicionarTamanho() {
  try {
    tamanho.categoria = categoriaSelecionada.value;
    await useTamanho.salvarTamanho({ ...tamanho }); // chama o store
    openAddTamanho.value = false;
  } catch {
    console.log("Erro ao salvar tamanho:");
  }
}


onMounted(() => {
  useTamanho.getTamanhos();
});
</script>

<template>
  <div @click="openAddTamanho = true" class="produto-button">
    <button>+</button>
    <span>Adicionar novo tamanho</span>
  </div>

  <div class="container-add-produto" v-if="openAddTamanho">
    <div class="container">
      <div class="div-fechar">
        <button class="fechar" @click="openAddTamanho = false">x</button>
      </div>

      <form @submit.prevent="adicionarTamanho">
        <label for="nome">Nome*</label>
        <input v-model="tamanho.nome" id="nome" type="text" required />

        <label for="qtdFatia">Qtd de Fatias*</label>
        <input v-model="tamanho.qtdFatia" id="qtdFatia" type="number" required />

        <label for="massa">Massa (kg)*</label>
        <input v-model="tamanho.massakg" id="massa" type="text" required />

        <label for="formato">Formato*</label>
        <input v-model="tamanho.formato" id="formato" type="text" required />

        <label for="categoria">Categoria*</label>
        <select name="" id="" v-model="categoriaSelecionada">
          <option disabled value="">-- Escolha uma opção --</option>
          <option v-for="categoria in useCategorias.categorias" :key="categoria.value" :value="categoria.id">{{
            categoria.nome }}</option>
        </select>

        <button class="button" type="submit">Cadastrar Tamanho</button>
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
