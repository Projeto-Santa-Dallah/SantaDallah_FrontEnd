<script setup>
import { onMounted, ref } from 'vue';
import CategoriaAdm from './CategoriaAdm.vue'
import CadastrarCategoria from '@/components/filtros/CadastrarCategoria.vue'
import { useCategoriaStore } from '@/stores/categorias';
import PaginacaoAdm from './PaginacaoAdm.vue'

const categoriaStore = useCategoriaStore();

const EditarAberto = ref(false);
const idEditar = ref(null);

function editarCategoria(id) {
  idEditar.value = id;
  EditarAberto.value = true;
}

function fecharEdicao() {
  EditarAberto.value = false;
  idEditar.value = null;
}


onMounted(() => {
  categoriaStore.getCategorias({ page: 1 });
});
</script>

<template>
  <div v-if="!EditarAberto" class="categorias">
    <slot></slot>

    <div 
      class="categoria" 
      v-for="categoria in categoriaStore.categorias" 
      :key="categoria.id"
    >
      <CategoriaAdm
        :id="categoria.id"
        :nome="categoria.nome"
        :descricao="categoria.descricao"
        @editar="editarCategoria"
      />
    </div>

    <!-- Paginação -->
 <PaginacaoAdm 
  :page="categoriaStore.page" 
  :totalPages="categoriaStore.totalPages" 
  @changePage="categoriaStore.getCategorias({ page: $event })" 
/>
  </div>
  

  <div v-else>
    <CadastrarCategoria 
      :open="EditarAberto"
      :idEditar="idEditar"
      @close="fecharEdicao"
    />
  </div>
</template>

<style scoped>
.categorias {
  display: flex;
  flex-direction: column;
  padding: 0px 7vw 0px 50px;
  width: 71vw;
  margin-bottom: 100px;
}

.categoria {
  width: 100%;
  padding: 5px;
}

.paginacao {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
