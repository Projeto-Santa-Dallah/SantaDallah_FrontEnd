<script setup>
import { onMounted, ref } from 'vue';
import CategoriaAdm from './CategoriaAdm.vue'
import CadastrarCategoria from '@/components/filtros/CadastrarCategoria.vue'
import { useCategoriaStore } from '@/stores/categorias';
import PaginacaoAdm from './PaginacaoAdm.vue'
import LoadingComponent from '@/components/carregamento/LoadingComponent.vue'

const categoriaStore = useCategoriaStore();
const EditarAberto = ref(false);
const idEditar = ref(null);
const isLoading = ref(false);

function editarCategoria(id) {
  idEditar.value = id;
  EditarAberto.value = true;
}
function fecharEdicao() {
  EditarAberto.value = false;
  idEditar.value = null;
}

// 🔹 Função com loading + scroll
async function carregarCategorias(page = 1) {
  try {
    isLoading.value = true;
    await categoriaStore.getCategorias({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => carregarCategorias());
</script>

<template>
  <LoadingComponent v-if="isLoading" />
  <div v-if="!EditarAberto" class="categorias">
    <slot></slot>

    <div class="categoria" v-for="categoria in categoriaStore.categorias" :key="categoria.id">
      <CategoriaAdm
        :id="categoria.id"
        :nome="categoria.nome"
        :descricao="categoria.descricao"
        @editar="editarCategoria"
      />
    </div>

    <PaginacaoAdm
      :page="categoriaStore.page"
      :totalPages="categoriaStore.totalPages"
      @changePage="carregarCategorias"
    />
  </div>

  <CadastrarCategoria
    v-else
    :open="EditarAberto"
    :idEditar="idEditar"
    @close="fecharEdicao"
  />
</template>

<style scoped>
.categorias {
  display: flex;
  flex-direction: column;
  padding: 0 7vw 0 50px;
  width: 71vw;
  margin-bottom: 100px;
}
.categoria {
  width: 100%;
  padding: 5px;
}
</style>
