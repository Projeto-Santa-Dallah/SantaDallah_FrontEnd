<script setup>
import AdminFiltro from '@/components/filtros/AdminFiltro.vue';
import AddProduto from '@/components/filtros/AddProduto.vue';
import ProdutosAdm from '@/components/administrador/ProdutosAdm.vue';
</script>

<template>   

    <div class="filtro-produtos">
        <AdminFiltro><AddProduto/></AdminFiltro>
        <ProdutosAdm>  <div class="produtos-header">
        <div class="header"><h1 class="titulo-produtos">Produtos</h1><span>  (58 encontrados)</span>
  </div>  </div></ProdutosAdm>

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
.filtro-produtos{
    display: flex;
    flex-direction: row;
    margin-top: 80px;
}
.titulo-produtos {
    font-size: 24px;
    font-weight: 600;
}

</style>
