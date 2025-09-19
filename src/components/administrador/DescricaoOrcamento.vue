<script setup>
import { reactive, onMounted } from 'vue'
import OrcamentosService from '@/service/orcamentos'

const orcamentosService = new OrcamentosService()
const props = defineProps({
  id: { type: Number, required: true }
})
const emit = defineEmits(['fechar'])

// Orçamento inicial vazio
const orcamentoSelecionado = reactive({
  id: null,
  usuario: {},
  data: '',
  qtnPessoas: 0,
  local: '',
  bebidaAlcoolica: false,
  docinhos: null,
  foto: []
})

onMounted(async () => {
  try {
    const orcamento = await orcamentosService.carregarOrcamentoDetalhado(props.id)
    if (orcamento) {
      Object.assign(orcamentoSelecionado, orcamento)
    }
  } catch (error) {
    console.error('Erro ao carregar orçamento:', error)
  }
})
</script>

<template>
  <div class="orcamento-header" v-if="orcamentoSelecionado.id">
    <div class="header">
      <h1 class="titulo-orcamento">Orçamento #{{ orcamentoSelecionado.id }}</h1>
      <button class="voltar" @click="emit('fechar')">Voltar</button>
    </div>

    <div class="container-info">
      <div class="info-container">
        <span class="titulo-info">Usuário: </span>
        <span>{{ orcamentoSelecionado.usuario.email }}</span>
      </div>
      <div class="info-container">
        <span class="titulo-info">Data: </span>
        <span>{{ orcamentoSelecionado.data }}</span>
      </div>
      <div class="info-container">
        <span class="titulo-info">Quantidade de pessoas: </span>
        <span>{{ orcamentoSelecionado.qtnPessoas }}</span>
      </div>
      <div class="info-container">
        <span class="titulo-info">Local: </span>
        <span>{{ orcamentoSelecionado.local }}</span>
      </div>
      <div class="info-container">
        <span class="titulo-info">Bebida alcoólica: </span>
        <span>{{ orcamentoSelecionado.bebidaAlcoolica ? 'Sim' : 'Não' }}</span>
      </div>
      <div class="info-container">
        <span class="titulo-info">Docinhos: </span>
        <span>{{ orcamentoSelecionado.docinhos || '-' }}</span>
      </div>
    </div>

    <div class="descricao" v-if="orcamentoSelecionado.foto.length">
      <h3>Fotos</h3>
      <div class="fotos">
        <div v-for="foto in orcamentoSelecionado.foto" :key="foto.id" class="foto-item">
          <img :src="foto.file" :alt="foto.description || 'Foto do orçamento'" />
          <span>{{ foto.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
span { font-size: 16px; }
.titulo-info { font-weight: 600; }
.container-info, .descricao { padding-top: 20px; padding-right: 20px; }
.container-info { display: flex; flex-wrap: wrap; }
.info-container { width: 33%; margin-bottom: 5px; }
.voltar {
  cursor: pointer;
  border: 1px solid rgb(209, 209, 209);
  background-color: #f0baf4;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 20%;
}
.voltar:hover { background-color: #cfadcf; }
h1 { margin-right: 10px; color: #191645; font-size: 24px; }
.header { width: 100%; display: flex; align-items: center; justify-content: space-between; }
.titulo-orcamento { font-size: 24px; font-weight: 600; }
.fotos { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; }
.foto-item { display: flex; flex-direction: column; align-items: center; }
.foto-item img { width: 150px; height: auto; border-radius: 5px; }
</style>
