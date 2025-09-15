<script setup>
import { ref } from 'vue'
import PedidoAdm from './PedidoAdm.vue'
import DescricaoPedido from './DescricaoPedido.vue'

const DescricaoAberta = ref(false)
const idSelecionado = ref(0)

function openDescricao(id) {
  DescricaoAberta.value = true
  idSelecionado.value = id
}
function fecharDescricao() {
  DescricaoAberta.value = false
}

// Dados mockados
const pedidos = [
  {
    id: 1,
    usuario: { id: 7, nome: "Isabelli Luísa", email: "isa@example.com" },
    status: 2,
    status_display: "Realizado",
    data_pedido: "2025-09-30",
    horario_entrega: "14:00:00",
    formaDeRetirada: 2,
    formaDeRetirada_display: "Entrega",
    total: 150.00,
    valor_pago: 75.00,
    itens: [
      {
        id: 101,
        produto: { id: 55, nome: "Bolo 3 brigadeiros" },
        quantidade: 1
      },
      {
        id: 102,
        produto: { id: 56, nome: "50 brigadeiros de pistache" },
        quantidade: 1
      }
    ]
  },
  {
    id: 2,
    usuario: { id: 8, nome: "João Pedro", email: "joao@example.com" },
    status: 3,
    status_display: "Pago",
    data_pedido: "2025-09-29",
    horario_entrega: "18:00:00",
    formaDeRetirada: 1,
    formaDeRetirada_display: "Retirada",
    total: 120.00,
    valor_pago: 120.00,
    itens: [
      { id: 201, produto: { id: 60, nome: "Torta de Limão" }, quantidade: 2 }
    ]
  }
]
</script>

<template>
  <div v-if="!DescricaoAberta" class="pedidos">
          <div class="tamanhos-header">
        <div class="header">
          <h1 class="titulo-tamanhos">Pedidos</h1>
          <span> (58 encontrados)</span>
        </div>
      </div>
    <div class="pedido" v-for="pedido in pedidos" :key="pedido.id">
      <PedidoAdm
        :id="pedido.id"
        :cliente="pedido.usuario.nome"
        :data="pedido.data_pedido"
        :horario="pedido.horario_entrega"
        :total="pedido.total"
        :valorPago="pedido.valor_pago"
        :valorAPagar="pedido.total - pedido.valor_pago"
        :itens="pedido.itens"
        @open="openDescricao"
      />
    </div>
  </div>
  <div class="descricao" v-else>
    <DescricaoPedido @fechar="fecharDescricao" :id="idSelecionado" :pedidos="pedidos" />
  </div>
</template>

<style scoped>
.pedidos, .descricao {
  display: flex;
  flex-direction: column;
  padding: 0px 7vw 0px 50px;
  width: 71vw;
  margin-bottom: 100px;
}
.pedido {
  width: 100%;
  padding: 5px 0;
}
span {
  color: #bf99c8;
  font-size: 16px;
}
h1 {
  margin-right: 10px;
  color: #191645;
  font-size: 24px;
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
</style>
