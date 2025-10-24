<script setup>
import ProdutoAdm from "./ProdutoAdm.vue";
import DescricaoProduto from './DescricaoProduto.vue';
import CadastrarProduto from '@/components/filtros/CadastrarProduto.vue'
import { onMounted, ref } from 'vue';
import { useProdutosStore } from '@/stores/produtos';
import PaginacaoAdm from './PaginacaoAdm.vue'
import LoadingComponent from '@/components/carregamento/LoadingComponent.vue'

const produtosStore = useProdutosStore();
const DescricaoAberta = ref(false);
const EditarAberto = ref(false);
const idSelecionado = ref(null);
const idEditar = ref(null);
const isLoading = ref(false);

// 🔹 Função com loading + scroll
async function carregarProdutos(page = 1) {
  try {
    isLoading.value = true;
    await produtosStore.carregarProdutos({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } finally {
    isLoading.value = false;
  }
}

function openDescricao(id) {
  DescricaoAberta.value = true;
  idSelecionado.value = id;
}
function fecharDescricao() {
  DescricaoAberta.value = false;
}
function openEdicao(id) {
  EditarAberto.value = true;
  idEditar.value = id;
}
function fecharEdicao() {
  EditarAberto.value = false;
  idEditar.value = null;
}

onMounted(() => carregarProdutos());
</script>

<template>
  <LoadingComponent v-if="isLoading" />
  <div v-if="!DescricaoAberta && !EditarAberto" class="produtos">
    <slot></slot>

    <div class="produto" v-for="produto in produtosStore.produtos" :key="produto.id">
      <ProdutoAdm 
        :id="produto.id"
        :nome="produto.nome"
        :preco="produto.preco"
        :foto="produto.foto_url"
        @open="openDescricao"
        @editar="openEdicao"
      />
    </div>

    <PaginacaoAdm
      :page="produtosStore.page"
      :totalPages="produtosStore.totalPages"
      @changePage="carregarProdutos"
    />
  </div>

  <DescricaoProduto
    v-else-if="DescricaoAberta"
    :id="idSelecionado"
    @fechar="fecharDescricao"
  />

  <CadastrarProduto
    v-else-if="EditarAberto"
    :open="EditarAberto"
    :idEditar="idEditar"
    @close="fecharEdicao"
  />
</template>

<style scoped>
.produtos, .descricao {
  display: flex;
  flex-direction: column;
  padding: 0 7vw 0 50px;
  width: 71vw;
  margin-bottom: 100px;
}
.produto { 
  width: 100%;
  padding: 5px; 
  }
</style>
