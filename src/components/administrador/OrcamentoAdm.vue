<script setup>
const props = defineProps({
  id: Number,
  cliente: String,
  data: String,
  qtnPessoas: Number,
  local: String,
  bebidaAlcoolica: Boolean,
  docinhos: Boolean,
})
</script>

<template>
  <div class="orcamento-card" @click="$emit('open', id)">
    <div class="linha">
      <div class="coluna">
        <span><strong>Data: </strong> {{ new Date(data).toLocaleDateString() }}</span>
        <span><strong>Local: </strong> {{ local || '-' }}</span>
      </div>

      <div class="coluna">
        <span><strong>Cliente: </strong> {{ cliente }}</span>
        <span><strong>Qtd. Pessoas: </strong> {{ qtnPessoas }}</span>
      </div>

      <div class="coluna">
        <span><strong>Bebida Alcoólica: </strong> {{ bebidaAlcoolica ? 'Sim' : 'Não' }}</span>
        <span><strong>Docinhos: </strong> {{ docinhos ? 'Sim' : 'Não' }}</span>
      </div>
    </div>

    <a class="detalhes" @click.stop="$emit('open', id)">Ver detalhes do orçamento</a>
  </div>
</template>

<style scoped>
.orcamento-card {
  border-bottom: 1px solid #d9d9d9;
  padding: 15px 20px;
  transition: 0.3s;
  cursor: pointer;
}
.orcamento-card:hover {
  transform: translate3d(0, -3px, 0) scale(1.01);
  transition: .3s;
  background: #fafafa;
}
.linha {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.coluna {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 14px;
  color: #222;
}
.detalhes {
  margin-top: 10px;
  display: inline-block;
  color: #191645;
  font-size: 14px;
  text-decoration: underline;
}
.detalhes:hover {
  color: #002a80;
}
span {
  font-size: 16px;
}
</style>