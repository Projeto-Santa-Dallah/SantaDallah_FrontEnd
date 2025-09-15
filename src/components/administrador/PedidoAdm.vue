<script setup>
const props = defineProps({
  id: Number,
  cliente: String,
  data: String,
  horario: String,
  total: Number,
  valorPago: Number,
  valorAPagar: Number,
  itens: Array
})
</script>

<template>
  <div class="pedido-card" @click="$emit('open', id)">
    <div class="linha">
      <div class="coluna">
        <span><strong>Para a data: </strong> {{ new Date(data).toLocaleDateString() }}</span>
        <span><strong>Horário: </strong> {{ horario.slice(0,5) }}h</span>
      </div>

      <div class="coluna">
        <span><strong>Cliente: </strong> {{ cliente }}</span>
        <span><strong>Valor: </strong> R$ {{ total.toFixed(2) }}</span>
      </div>

      <div class="coluna">
        <span><strong>Valor pago: </strong> R$ {{ valorPago.toFixed(2) }}</span>
        <span><strong>Valor a pagar: </strong> R$ {{ valorAPagar.toFixed(2) }}</span>
      </div>
    </div>
    <div class="produtos-pedido">
              <span>
          <strong>Produtos: </strong>
          <span class="produtos-lista" v-for="(item, i) in itens" :key="item.id">
            {{ item.produto.nome }}<span v-if="i < itens.length-1"> – </span>
          </span>
        </span>
    </div>

    <a class="detalhes" @click.stop="$emit('open', id)">Ver detalhes do pedido</a>
  </div>
</template>

<style scoped>
.produtos-pedido{
  padding: 10px 0px;
}
.produtos-lista{
  text-decoration: underline
}
span{
  font-size: 16px;
}
.pedido-card {
  border-bottom: 1px solid #d9d9d9;
  padding: 15px 20px;
  transition: 0.3s;
}
.pedido-card:hover {
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
  cursor: pointer;
}
.detalhes:hover {
  color: #002a80;
}
</style>
