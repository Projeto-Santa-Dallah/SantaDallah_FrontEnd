<script setup>
import AdminFiltro from '@/components/filtros/AdminFiltro.vue';
import AddProduto from '@/components/filtros/AddProduto.vue';
import ProdutosAdm from '@/components/administrador/ProdutosAdm.vue';
</script>

<template>   
    <div class="produtos-header">
        <h1 class="titulo-produtos">Produtos</h1>
    </div>
  <AddProduto/>
    <div class="filtro-produtos">
        <AdminFiltro/>
        <ProdutosAdm/>

</div>
</template>
<style scoped>
.filtro-produtos{
    display: flex;
    flex-direction: row;
}
.titulo-produtos {
    font-size: 24px;
    padding: 50px;
    font-weight: 600;
}
.produtos-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
