<script setup>
import { ref, onMounted } from 'vue'
import { usePedidosStore } from '@/stores/pedidos'
import PedidoAdm from './PedidoAdm.vue'
import DescricaoPedido from './DescricaoPedido.vue'
import PaginacaoAdm from './PaginacaoAdm.vue'

const pedidosStore = usePedidosStore()
const DescricaoAberta = ref(false)
const idSelecionado = ref(0)

function openDescricao(id) {
  DescricaoAberta.value = true
  idSelecionado.value = id
}
function fecharDescricao() {
  DescricaoAberta.value = false
}

onMounted(() => {
  pedidosStore.carregarPedidos()
})
</script>

<template>
  <div v-if="!DescricaoAberta" class="pedidos">
    <div class="pedidos-header">
      <div class="header">
        <h1 class="titulo-tamanhos">Pedidos</h1>
        <span>({{ pedidosStore.pedidos.length }} encontrados)</span>
      </div>
    </div>

    <div class="pedido" v-for="pedido in pedidosStore.pedidos" :key="pedido.id">
      <PedidoAdm
        :id="pedido.id"
        :cliente="pedido.usuario"
        :data="pedido.data_pedido"
        :horario="pedido.horario_entrega"
        :total="pedido.total"
        :valorPago="pedido.valor_pago"
        :valorAPagar="pedido.total - pedido.valor_pago"
        :itens="pedido.itens"
        @open="openDescricao"
      />
    </div>
    <PaginacaoAdm 
  :page="pedidosStore.page" 
  :totalPages="pedidosStore.totalPages" 
  @changePage="pedidosStore.carregarPedidos({ page: $event })" 
/>
  </div>

  <div class="descricao" v-else>
    <DescricaoPedido @fechar="fecharDescricao" :id="idSelecionado" :pedidos="pedidosStore.pedidos" />
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