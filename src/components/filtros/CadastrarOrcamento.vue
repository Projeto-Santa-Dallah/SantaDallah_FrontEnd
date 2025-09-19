<script setup>
import { ref, reactive, watch } from 'vue'
import { useOrcamentosStore } from '@/stores/orcamentos'

const props = defineProps({
  open: { type: Boolean, required: true }
})
const emit = defineEmits(['close'])

const orcamentosStore = useOrcamentosStore()
const confirmacao = ref(false)

const orcamento = reactive({
  usuario: '',
  data: '',
  qtnPessoas: 0,
  local: '',
  bebidaAlcoolica: false,
  docinhos: false,
  fotos: []
})

function handleFileChange(event) {
  orcamento.fotos = Array.from(event.target.files)
}

async function salvarOrcamento() {
  try {
    await orcamentosStore.salvarOrcamento(orcamento)
    confirmacao.value = true
    resetarFormulario()
  } catch (e) {
    console.error('Erro ao salvar orçamento', e)
  }
}

function resetarFormulario() {
  orcamento.usuario = ''
  orcamento.data = ''
  orcamento.qtnPessoas = 0
  orcamento.local = ''
  orcamento.bebidaAlcoolica = false
  orcamento.docinhos = false
  orcamento.fotos = []
}

watch(() => props.open, (novo) => {
  if (!novo) {
    confirmacao.value = false
    resetarFormulario()
  }
})

</script>

<template>
  <div class="container-add-orcamento" v-if="props.open">
    <div class="orcamentos-header">
      <div class="header">
        <h1 class="titulo-orcamentos">Cadastrar Orçamento</h1>
      </div>
    </div>

    <div class="container">
      <form @submit.prevent="salvarOrcamento">
        <!-- Usuário -->
        <label for="usuario">Usuário:</label>
        <input v-model="orcamento.usuario" id="usuario" type="text" required placeholder="Nome do usuário" />

        <!-- Data -->
        <label for="data">Data:</label>
        <input v-model="orcamento.data" id="data" type="date" required />

        <!-- Quantidade de Pessoas -->
        <label for="qtnPessoas">Quantidade de Pessoas:</label>
        <input v-model.number="orcamento.qtnPessoas" id="qtnPessoas" type="number" min="1" required />

        <!-- Local -->
        <label for="local">Local:</label>
        <input v-model="orcamento.local" id="local" type="text" maxlength="50" placeholder="Local do evento" />

        <!-- Bebida Alcoólica -->
        <label>
          <input type="checkbox" v-model="orcamento.bebidaAlcoolica" />
          Bebida Alcoólica
        </label>

        <!-- Docinhos -->
        <label>
          <input type="checkbox" v-model="orcamento.docinhos" />
          Docinhos
        </label>

        <!-- Fotos -->
        <label for="fotos">Fotos:</label>
        <input id="fotos" type="file" multiple @change="handleFileChange" accept="image/*" />

        <!-- Botões -->
        <div class="buttons-container">
          <button class="button-cancelar" @click="$emit('close')" type="button">Cancelar</button>
          <button class="button" type="submit">Adicionar Orçamento</button>
        </div>
      </form>
    </div>

    <!-- Confirmação -->
    <div v-if="confirmacao" class="confirmacao">
      <div class="container">
        <div class="div-fechar">
          <button class="fechar" @click="$emit('close')">x</button>
        </div>
        <span>Orçamento cadastrado com sucesso!</span>
        <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 14.3333L16 19.3333L32.6667 2.66667M22.6667 1H9C6.19974 1 4.79961 1 3.73005 1.54497C2.78924 2.02433 2.02433 2.78924 1.54497 3.73005C1 4.79961 1 6.19974 1 9V23C1 25.8003 1 27.2004 1.54497 28.27C2.02433 29.2108 2.78924 29.9757 3.73005 30.455C4.79961 31 6.19974 31 9 31H23C25.8003 31 27.2004 31 28.27 30.455C29.2108 29.9757 29.9757 29.2108 30.455 28.27C31 27.2004 31 25.8003 31 23V16" stroke="#AFE67E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Mesmos estilos do formulário de pedidos, ajustados para orçamento */
.container-add-orcamento {
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

.titulo-orcamentos {
  font-size: 24px;
  font-weight: 600;
  color: #191645;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

input[type="text"],
input[type="date"],
input[type="number"],
input[type="file"] {
  height: 5vh;
  border: 1px solid #D9D9D9;
  border-radius: 10px;
  padding-left: 20px;
  margin-bottom: 15px;
  width: 100%;
}

label {
  color: black;
  font-size: 16px;
  font-weight: 530;
  margin-bottom: 5px;
}

input[type="checkbox"] {
  margin-right: 10px;
}

.buttons-container {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 30px;
}

.button,
.button-cancelar {
  background-color: #F8DDFA;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  width: 200px;
}

.button-cancelar {
  background-color: #D9D9D9;
}

.button:hover {
  background-color: #f285fa;
}

.button-cancelar:hover {
  background-color: #bfbfbf;
}

.confirmacao {
  top: 0;
  left:0;
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
  margin-top: -20px;
  width: 100%;
  text-align: right;
}

.fechar {
  color: black;
  font-size: 16px;
  background-color: transparent;
  border: none;
}
</style>
