<script setup>
import AdminFiltro from '@/components/filtros/AdminFiltro.vue';
import AddCategoria from '@/components/filtros/AddCategoria.vue';
import CategoriasAdm from '@/components/administrador/CategoriasAdm.vue';
</script>

<template>   
    <div class="categorias-header">
        <h1 class="titulo-categorias">Categorias</h1>
    </div>
  <AddCategoria/>
    <div class="filtro-categorias">
        <AdminFiltro/>
        <CategoriasAdm/>

</div>
</template>
<style scoped>
.filtro-categorias{
    display: flex;
    flex-direction: row;
}
.titulo-categorias {
    font-size: 24px;
    padding: 50px;
    font-weight: 600;
}
.categorias-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
