<script setup>
import AdminFiltro from '@/components/filtros/AdminFiltro.vue';
import AddTamanho from '@/components/filtros/AddTamanho.vue';
import TamanhosAdm from '@/components/administrador/TamanhosAdm.vue';
</script>

<template>   
    <div class="tamanhos-header">
        <h1 class="titulo-tamanhos">Tamanhos</h1>
    </div>
  <AddTamanho/>
    <div class="filtro-tamanhos">
        <AdminFiltro/>
        <TamanhosAdm/>

</div>
</template>
<style scoped>
.filtro-tamanhos{
    display: flex;
    flex-direction: row;
}
.titulo-tamanhos {
    font-size: 24px;
    padding: 50px;
    font-weight: 600;
}
.tamanhos-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
