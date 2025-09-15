<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: Number,
  orcamentos: Array
})

const orcamentoSelecionado = computed(() => {
  return props.orcamentos.find(o => o.id === props.id) || null
})

function formatDate(dateStr) {
  if (!dateStr) return "-"
  return new Date(dateStr).toLocaleDateString()
}
</script>

<template>
  <div v-if="orcamentoSelecionado" class="orcamento-detalhe">
    <div class="header">
      <h1 class="titulo-orcamento">Orçamento #{{ orcamentoSelecionado.id }}</h1>
      <button class="voltar" @click="$emit('fechar')">Voltar</button>
    </div>

    <div class="container-info">
      <div class="info-container"><span class="titulo-info">Cliente: </span><span>{{ orcamentoSelecionado.usuario.nome }} ({{ orcamentoSelecionado.usuario.email }})</span></div>
      <div class="info-container"><span class="titulo-info">Data: </span><span>{{ formatDate(orcamentoSelecionado.data) }}</span></div>
      <div class="info-container"><span class="titulo-info">Local: </span><span>{{ orcamentoSelecionado.local || '-' }}</span></div>
      <div class="info-container"><span class="titulo-info">Qtd. Pessoas: </span><span>{{ orcamentoSelecionado.qtnPessoas }}</span></div>
      <div class="info-container"><span class="titulo-info">Bebida Alcoólica: </span><span>{{ orcamentoSelecionado.bebidaAlcoolica ? 'Sim' : 'Não' }}</span></div>
      <div class="info-container"><span class="titulo-info">Docinhos: </span><span>{{ orcamentoSelecionado.docinhos ? 'Sim' : 'Não' }}</span></div>
    </div>

    <div class="descricao">
      <h3>Fotos</h3>
      <div v-if="orcamentoSelecionado.foto.length > 0" class="fotos-container">
        <img v-for="(img, idx) in orcamentoSelecionado.foto" :key="idx" :src="img.url" alt="Foto orçamento" />
      </div>
      <div v-else>
        <span>Sem fotos adicionadas.</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
span {
  font-size: 16px;
}
.titulo-info {
  font-weight: 600;
}
.container-info, .descricao {
  padding-top: 20px;
  padding-right: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.info-container {
  width: 33%;
}
.voltar {
  cursor: pointer;
  border: 1px solid rgb(209, 209, 209);
  background-color: #F0BAF4;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 20%;
}
.voltar:hover {
  background-color: #cfadcf;
}
h1 {
  margin-right: 10px;
  color: #191645;
  font-size: 24px;
}
.orcamento-detalhe {}
.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.titulo-orcamento {
  font-size: 24px;
  font-weight: 600;
}
.fotos-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.fotos-container img {
  max-width: 150px;
  max-height: 150px;
  border-radius: 10px;
  object-fit: cover;
}
</style>