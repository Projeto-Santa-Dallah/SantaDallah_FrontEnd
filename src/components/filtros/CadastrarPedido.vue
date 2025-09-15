<script setup>
import { ref, reactive, onMounted } from "vue";
import { useProdutosStore } from "@/stores/produtos";
import { useCategoriaStore } from "@/stores/categorias";
import { useTamanhoStore } from "@/stores/tamanhos";

defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

const useProdutos = useProdutosStore();
const useCategorias = useCategoriaStore();
const useTamanhos = useTamanhoStore();

onMounted(() => {
  useProdutos.carregarProdutos();
  useCategorias.getCategorias();
  useTamanhos.getTamanhos();
});

const confirmacao = ref(false);

const pedido = reactive({
  nome: "",
  categoria: null,
  descricao: "",
  sabor: "",
  tipo: "",
  validade: "",
  preco: null,
  tamanho: null,
  fotos: [], // array para armazenar imagens
});

function handleFileChange(event) {
  pedido.fotos = Array.from(event.target.files);
}

async function salvarPedido() {
  try {
    console.log("Pedido salvo:", pedido);
    // Aqui você chamaria seu store ou API para salvar o pedido
    confirmacao.value = true;
  } catch (e) {
    console.error("Erro ao salvar pedido", e);
  }
}
</script>

<template>
  <div class="container-add-produto" v-if="open">
    <div class="tamanhos-header">
      <div class="header">
        <h1 class="titulo-tamanhos">Cadastrar Pedido</h1>
      </div>
    </div>

    <div class="container">
      <form @submit.prevent="salvarPedido">
        <!-- Nome -->
        <label for="nome">Nome:</label>
        <input v-model="pedido.nome" id="nome" type="text" required placeholder="Nome" />

        <!-- Categoria -->
        <label for="categoria">Categoria:</label>
        <select v-model="pedido.categoria" id="categoria" required>
          <option disabled value="">Escolha uma categoria</option>
          <option v-for="cat in useCategorias.categorias" :key="cat.id" :value="cat.id">
            {{ cat.nome }}
          </option>
        </select>

        <!-- Descrição -->
        <label for="descricao">Descreva o produto:</label>
        <textarea v-model="pedido.descricao" id="descricao" placeholder="Descrição do produto" required></textarea>

        <!-- Sabor -->
        <label for="sabor">Sabor:</label>
        <input v-model="pedido.sabor" id="sabor" type="text" placeholder="Sabor" required />

        <!-- Tipo -->
        <label for="tipo">Tipo:</label>
        <input v-model="pedido.tipo" id="tipo" type="text" placeholder="Tipo" required />

        <div class="fatia-kg-formato">
          <!-- Validade -->
          <div class="container-cadastro">
            <label for="validade">Validade:</label>
            <input v-model="pedido.validade" id="validade" type="date" required />
          </div>
          <div class="container-cadastro">
            <!-- Preço -->
            <label for="preco">Preço:</label>
            <input v-model.number="pedido.preco" id="preco" type="number" step="0.01" min="0" placeholder="Preço"
              required />
          </div> 
          <div class="container-cadastro">
            <!-- Tamanho -->
            <label for="tamanho">Tamanho:</label>
            <select v-model="pedido.tamanho" id="tamanho" required>
              <option disabled value="">Escolha um tamanho</option>
              <option v-for="tam in useTamanhos.tamanhos" :key="tam.id" :value="tam.id">
                {{ tam.nome }}
              </option>
            </select>
          </div>
        </div>

        <!-- Fotos -->
        <label for="fotos">Fotos:</label>
        <input id="fotos" type="file" multiple @change="handleFileChange" accept="image/*" />

        <!-- Botões -->
        <div class="buttons-container">
          <button class="button-cancelar" @click="$emit('close')">Cancelar</button>
          <button class="button" type="submit">Adicionar Pedido</button>
        </div>
      </form>
    </div>
  </div>

  <div v-if="confirmacao" class="confirmacao">
    <div class="container">
      <div class="div-fechar">
        <button class="fechar" @click="$emit('close')">x</button>
      </div>
      <span>Pedido cadastrado com sucesso!</span><svg width="34" height="32" viewBox="0 0 34 32" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11 14.3333L16 19.3333L32.6667 2.66667M22.6667 1H9C6.19974 1 4.79961 1 3.73005 1.54497C2.78924 2.02433 2.02433 2.78924 1.54497 3.73005C1 4.79961 1 6.19974 1 9V23C1 25.8003 1 27.2004 1.54497 28.27C2.02433 29.2108 2.78924 29.9757 3.73005 30.455C4.79961 31 6.19974 31 9 31H23C25.8003 31 27.2004 31 28.27 30.455C29.2108 29.9757 29.9757 29.2108 30.455 28.27C31 27.2004 31 25.8003 31 23V16"
          stroke="#AFE67E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.container-add-produto {
  display: flex;
  flex-direction: column;
  padding: 0px 7vw 0px 50px;
  width: 71vw;
  margin-bottom: 100px;
}

.container {
  width: 100%;
  padding: 5px;
}

.header {
  display: flex;
  align-items: center;
}

.filtro-tamanhos {
  display: flex;
  flex-direction: row;
  margin-top: 80px;
}

.titulo-tamanhos {
  font-size: 24px;
  font-weight: 600;
}

h1 {
  margin-right: 10px;
  color: #191645;
  font-size: 24px;
}

.confirmacao {
  top: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(220, 220, 220, 0.72);
  z-index: 999999999999999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirmacao .container {
  width: 450px;
  height: 150px;
  background-color: rgb(255, 255, 255);
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
}

.confirmacao .container span {
  color: black;
  font-size: 20px;
  font-weight: 600;
  padding: 15px;
}

.confirmacao .div-fechar {
  margin-top: -2 0px;
}

.fechar {
  color: black;
  font-size: 16px;
  background-color: transparent;
  border: none;
}

.div-fechar {
  text-align: end;
  width: 100%;
}


form {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.buttons-container {
  display: flex;
  justify-content: flex-end;
  width: calc(100% + 20px);
  padding-top: 50px;
}

.button,
.button-cancelar {
  grid-column: span 2;
  background-color: #F8DDFA;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  width: 200px;
  margin-left: 20px;
  border-radius: 50px;
}

.button-cancelar {
  background-color: #D9D9D9;
}

.button:hover {
  background-color: #f285fa;
}

span {
  color: #191645;
  font-size: 15px;
}

.container-cadastro {
  width: 30%;
}

.fatia-kg-formato {
  display: flex;
  justify-content: space-between;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

input,
label,
textarea,
select {
  display: block;
  width: 100%;
  background-color: white;
}

select {
  width: calc(100% + 20px);
}

input,
select {
  height: 5vh;
  border: 1px solid #D9D9D9;
  border-radius: 10px;
  padding-left: 20px;
}

label {
  color: black;
  font-size: 16px;
  font-weight: 530;
  margin-top: 30px;
  margin-bottom: 5px;
}

textarea {
  grid-column: span 2;
  border: 1px solid #D9D9D9;
  border-radius: 10px;
  /* Ocupa duas colunas */
  padding-top: 10px;
  padding-left: 20px;
}


.button:hover {
  background-color: #f285fa;
}

input::placeholder,
textarea::placeholder {
  font-family: 'Poppins', sans-serif;
  color: #888;
}
</style>
