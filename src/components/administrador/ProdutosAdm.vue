<script setup>
import ProdutoAdm from "./ProdutoAdm.vue";
import DescricaoProduto from './DescricaoProduto.vue';
import CadastrarProduto from '@/components/filtros/CadastrarProduto.vue'
import { useCategoriaFiltroStore} from '@/stores/CategoriaFiltros.js'
import { onMounted, ref } from 'vue';
import { useProdutosStore } from '@/stores/produtos';
import PaginacaoAdm from './PaginacaoAdm.vue'

const produtosStore = useProdutosStore();
const CategoriaFiltroStore = useCategoriaFiltroStore();
// Estados
const DescricaoAberta = ref(false);
const EditarAberto = ref(false);
const idSelecionado = ref(null);
const idEditar = ref(null);

// Funções descrição
function openDescricao(id) {
  DescricaoAberta.value = true;
  idSelecionado.value = id;
}
function fecharDescricao() {
  DescricaoAberta.value = false;
  idSelecionado.value = null;
}

// Funções edição
function openEdicao(id) {
  EditarAberto.value = true;
  idEditar.value = id;
}
function fecharEdicao() {
  EditarAberto.value = false;
  idEditar.value = null;
}



onMounted(async () => {
  await produtosStore.carregarProdutos();
});
</script>

<template>
  <div v-if="!DescricaoAberta && !EditarAberto" class="produtos">
    <slot></slot>
    <div class="produto" v-for="produto in produtosStore.produtos" :key="produto.id">
      <ProdutoAdm 
        :id="produto.id" 
        :nome="produto.nome" 
        :preco="produto.preco" 
        :foto="produto.foto_url"
        @open="openDescricao"
        @editar="openEdicao"/>
    </div>
     <PaginacaoAdm 
  :page="produtosStore.page" 
  :totalPages="produtosStore.totalPages" 
  @changePage="produtosStore.carregarProdutos({ page: $event })" 
/>
  </div>

  <div class="descricao" v-else-if="DescricaoAberta">
    <DescricaoProduto 
      :id="idSelecionado" 
      @fechar="fecharDescricao" 
    />
  </div>

  <!-- Modal cadastro/edição -->
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
  padding: 0px 7vw 0px 50px;
  width: 71vw;
  margin-bottom: 100px;
}

.produto {
  width: 100%;
  padding: 5px;
}

.produtos.two-products {
  justify-content: flex-start;
}
</style>