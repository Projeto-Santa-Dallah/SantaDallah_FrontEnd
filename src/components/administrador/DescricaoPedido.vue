<script setup>
import { reactive, onMounted } from 'vue'
import PedidosService from '@/service/pedidos'

const pedidosService = new PedidosService()
const props = defineProps({
  id: { type: Number, required: true }
})
const emit = defineEmits(['fechar'])

// Pedido inicial vazio
const pedidoSelecionado = reactive({
  id: null,
  usuario: '',
  status: '',
  total: 0,
  data_pedido: '',
  horario_entrega: '',
  itens: [] // produtos do pedido
})

onMounted(async () => {
  try {
    const pedido = await pedidosService.carregarPedidoDetalhado(props.id)
    if (pedido) {
      Object.assign(pedidoSelecionado, pedido)
    }
  } catch (error) {
    console.error('Erro ao carregar pedido:', error)
  }
})
</script>

<template>
  <div class="pedido-header" v-if="pedidoSelecionado.id">
    <div class="header">
      <h1 class="titulo-pedido">Pedido #{{ pedidoSelecionado.id }}</h1>
      <button class="voltar" @click="emit('fechar')">
        Voltar
      </button>
    </div>

    <div class="container-info">
      <div class="info-container">
        <span class="titulo-info">Cliente: </span>
        <span>{{ pedidoSelecionado.usuario }}</span>
      </div>
      <div class="info-container">
        <span class="titulo-info">Status: </span>
        <span>{{ pedidoSelecionado.status }}</span>
      </div>
      <div class="info-container">
        <span class="titulo-info">Data: </span>
        <span>{{ pedidoSelecionado.data_pedido }}</span>
      </div>
      <div class="info-container">
        <span class="titulo-info">Horário de entrega: </span>
        <span>{{ pedidoSelecionado.horario_entrega || '-' }}</span>
      </div>
      <div class="info-container">
        <span class="titulo-info">Total: </span>
        <span>R$ {{ pedidoSelecionado.total }}</span>
      </div>
    </div>

    <div class="descricao">
      <h3>Produtos do pedido</h3>
      <ul>
        <li v-for="item in pedidoSelecionado.itens" :key="item.produto.id">
          {{ item.quantidade }}x {{ item.produto.nome }} — R$ {{ item.total }}
        </li>
      </ul>
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

.container-info,
.descricao {
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
  background-color: #f0baf4;
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

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 5px 0;
}
</style>
