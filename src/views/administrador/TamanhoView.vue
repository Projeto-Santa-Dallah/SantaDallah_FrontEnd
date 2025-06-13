<script setup>
import AdminFiltro from '@/components/filtros/AdminFiltro.vue';
import AddTamanho from '@/components/filtros/AddTamanho.vue';
import TamanhosAdm from '@/components/administrador/TamanhosAdm.vue';
</script>

<template>   
    <div class="produtos-header">
        <h1 class="titulo-produtos">Produtos</h1>
    </div>
  <AddTamanho/>
    <div class="filtro-produtos">
        <AdminFiltro/>
        <TamanhosAdm/>

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
