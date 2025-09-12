<script setup>
import {ref} from 'vue'
import AdminFiltro from '@/components/filtros/AdminFiltro.vue';
import AddCategoria from '@/components/filtros/AddCategoria.vue';
import CategoriasAdm from '@/components/administrador/CategoriasAdm.vue';
import CadastrarCategoria from '@/components/filtros/CadastrarCategoria.vue';
const openAddCategoria = ref(false);

function openCategoria() {
  openAddCategoria.value = true;
}
function closeCategoria() {
  openAddCategoria.value = false;
}

</script>

<template>   
    <div class="filtro-categorias">
        <AdminFiltro><AddCategoria @open="openCategoria()" /></AdminFiltro>
         <CadastrarCategoria :open="openAddCategoria" @close="closeCategoria()" v-if="openAddCategoria"/>
        <CategoriasAdm v-else><div class="categorias-header">
            <div class="header"><h1 class="titulo-categorias">Categorias</h1><span>  (58 encontrados)</span></div>
    </div></CategoriasAdm>

</div>
</template>
<style scoped>
span{
    color:#BF99C8;
    font-size: 16px;
}
h1{
    margin-right: 10px;
    color: #191645;
    font-size: 24px;
}
.header{
    display: flex;
    align-items: center;
}
.filtro-categorias{
    display: flex;
    flex-direction: row;
    margin-top: 80px;
}
.titulo-categorias {
    font-size: 24px;
    font-weight: 600;
}
</style>
