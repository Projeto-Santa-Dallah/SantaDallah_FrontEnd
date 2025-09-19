<script setup>
import { ref, onMounted } from 'vue'
import AdminFiltro from "@/components/filtros/AdminFiltro.vue"
import AddPedido from "@/components/filtros/AddPedido.vue"
import PedidosAdm from "@/components/administrador/PedidosAdm.vue"
import CadastrarPedido from '@/components/filtros/CadastrarPedido.vue'
import { usePedidosStore } from '@/stores/pedidos'

const openAddPedido = ref(false)
const pedidosStore = usePedidosStore()

function openPedido() {
  openAddPedido.value = true
}
function closePedido() {
  openAddPedido.value = false
}

onMounted(async () => {
  await pedidosStore.carregarPedidos()
  console.log(pedidosStore.pedidos) // agora vai mostrar os dados
})


</script>

<template>
  <div class="filtro-pedidos">
    <AdminFiltro>
      <!-- <AddPedido @open="openPedido()" /> -->
    </AdminFiltro>

    <CadastrarPedido :open="openAddPedido" @close="closePedido()" v-if="openAddPedido" />

    <PedidosAdm v-else>
      <div class="pedidos-header">
        <div class="header">
          <h1 class="titulo-pedidos">Pedidos</h1>
          <span>({{ pedidosStore.pedidos.length }} encontrados)</span>
        </div>
      </div>
    </PedidosAdm>
  </div>
</template>

<style scoped>
.filtro-pedidos {
  display: flex;
  flex-direction: row;
  margin-top: 80px;
}
.titulo-pedidos {
  font-size: 24px;
  font-weight: 600;
  color: #191645;
  margin-right: 10px;
}
span {
  color: #bf99c8;
  font-size: 16px;
}
.header {
  display: flex;
  align-items: center;
}
</style>