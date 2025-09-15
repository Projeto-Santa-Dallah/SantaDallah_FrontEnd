<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: Number
})

// Mock local
const pedidos = [
  {
    id: 1,
    usuario: { id: 7, nome: "Isabelli Luísa", email: "isa@example.com" },
    status_display: "Realizado",
    data_pedido: "2025-09-30",
    horario_entrega: "14:00:00",
    formaDeRetirada_display: "Entrega",
    total: 150.00,
    valor_pago: 75.00,
    itens: [
      {
        id: 101,
        produto: { id: 55, nome: "Bolo 3 brigadeiros", preco: 100 },
        quantidade: 1
      },
      {
        id: 102,
        produto: { id: 56, nome: "50 brigadeiros de pistache", preco: 50 },
        quantidade: 1
      }
    ]
  },
  {
    id: 2,
    usuario: { id: 8, nome: "João Pedro", email: "joao@example.com" },
    status_display: "Pago",
    data_pedido: "2025-09-29",
    horario_entrega: "18:00:00",
    formaDeRetirada_display: "Retirada",
    total: 120.00,
    valor_pago: 120.00,
    itens: [
      { id: 201, produto: { id: 60, nome: "Torta de Limão", preco: 60 }, quantidade: 2 }
    ]
  }
]

const pedidoSelecionado = computed(() => {
  return pedidos.find(p => p.id === props.id) || null
})

function formatDate(dateStr) {
  if (!dateStr) return "-"
  return new Date(dateStr).toLocaleDateString()
}
</script>

<template>
  <div v-if="pedidoSelecionado" class="pedido-detalhe">
    <!-- Cabeçalho -->
    <div class="header">
      <h1 class="titulo-pedido">Pedido #{{ pedidoSelecionado.id }}</h1>
      <button class="voltar" @click="$emit('fechar')">Voltar</button>
    </div>

    <!-- Infos do cliente e pedido -->
    <div class="container-info">
      <div class="info-container"><span class="titulo-info">Cliente: </span><span>{{ pedidoSelecionado.usuario.nome }} ({{ pedidoSelecionado.usuario.email }})</span></div>
      <div class="info-container"><span class="titulo-info">Status: </span><span>{{ pedidoSelecionado.status_display }}</span></div>
      <div class="info-container"><span class="titulo-info">Data: </span><span>{{ formatDate(pedidoSelecionado.data_pedido) }}</span></div>
    </div>
    <div class="container-info">
      <div class="info-container"><span class="titulo-info">Horário de entrega: </span><span>{{ pedidoSelecionado.horario_entrega || '-' }}</span></div>
      <div class="info-container"><span class="titulo-info">Forma de retirada: </span><span>{{ pedidoSelecionado.formaDeRetirada_display }}</span></div>
    </div>

    <!-- Lista de itens -->
    <div class="descricao">
      <h3>Itens do pedido</h3>
      <ul class="itens">
        <li v-for="item in pedidoSelecionado.itens" :key="item.id">
          {{ item.quantidade }}x {{ item.produto.nome }}
          <span class="preco"> — R$ {{ (item.produto.preco * item.quantidade).toFixed(2) }}</span>
        </li>
      </ul>
    </div>

    <!-- Resumo financeiro -->
    <div class="container-info">
      <div class="info-container"><span class="titulo-info">Total: </span><span>R$ {{ pedidoSelecionado.total.toFixed(2) }}</span></div>
      <div class="info-container"><span class="titulo-info">Valor pago: </span><span>R$ {{ pedidoSelecionado.valor_pago ? pedidoSelecionado.valor_pago.toFixed(2) : '0,00' }}</span></div>
      <div class="info-container"><span class="titulo-info">Restante: </span><span>R$ {{ (pedidoSelecionado.total - (pedidoSelecionado.valor_pago || 0)).toFixed(2) }}</span></div>
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
}
.container-info {
  display: flex;
  flex-wrap: wrap;
}
.info-container {
  width: 33%;
}
.voltar {
  cursor: pointer;
  border: 1px solid rgb(209, 209, 209);
  background-color: #F0BAF4;
  font-size: 14px;
  padding: 5px 5px;
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
.pedido-detalhe {}
.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.titulo-pedido {
  font-size: 24px;
  font-weight: 600;
}
.itens {
  list-style: none;
  padding: 0;
}
.itens li {
  padding: 5px 0;
}
.preco {
  font-weight: 500;
}
</style>
