<script setup>
import { reactive, onMounted } from 'vue'
import ProdutosService from '@/service/produtos'

const produtosService = new ProdutosService()
const props = defineProps({
  id: { type: Number, required: true }
})
const emit = defineEmits(['fechar'])

// Estrutura inicial do produto
const produtoSelecionado = reactive({
  id: null,
  nome: '',
  descricao: '',
  categoria: [],
  tipo: '',
  validade: '',
  sabor: '',
  tamanhos: [],
  foto: []
})

onMounted(async () => {
  try {
    const produto = await produtosService.carregarProdutoDetalhado(props.id)
    if (produto) {
      Object.assign(produtoSelecionado, produto)
    }
  } catch (error) {
    console.error('Erro ao carregar produto:', error)
  }
})
</script>

<template>
  <div class="pedido-header" v-if="produtoSelecionado.id">
    <div class="header">
      <h1 class="titulo-pedido">{{ produtoSelecionado.nome }}</h1>
      <button class="voltar" @click="emit('fechar')">Voltar</button>
    </div>

    <div class="container-info">
      <div class="info-container">
        <span class="titulo-info">Descrição: </span>
        <span>{{ produtoSelecionado.descricao }}</span>
      </div>
      <div class="info-container">
        <span class="titulo-info">Categoria: </span>
        <span>
          {{ produtoSelecionado.categoria.map(c => c.nome).join(', ') || '-' }}
        </span>
      </div>
      <div class="info-container">
        <span class="titulo-info">Tipo: </span>
        <span>{{ produtoSelecionado.tipo || '-' }}</span>
      </div>
      <div class="info-container">
        <span class="titulo-info">Validade: </span>
        <span>{{ produtoSelecionado.validade || '-' }}</span>
      </div>
      <div class="info-container">
        <span class="titulo-info">Sabor: </span>
        <span>{{ produtoSelecionado.sabor || '-' }}</span>
      </div>
    </div>

    <div class="descricao">
      <h3>Tamanhos e preços</h3>
      <ul>
        <li
          v-for="t in produtoSelecionado.tamanhos"
          :key="t.id"
        >
          {{ t.tamanho_nome }} — R$ {{ t.preco }}
        </li>
      </ul>
    </div>

    <div class="descricao">
      <h3>Fotos do produto</h3>
      <div class="grid-fotos">
        <img
          v-for="foto in produtoSelecionado.foto"
          :key="foto.url"
          :src="foto.url"
          :alt="foto.description"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.pedido-header{
  padding: 50px;
}
span {
  font-size: 16px;
}

.titulo-info {
  font-weight: 600;
}

.container-info,
.descricao {
  padding-top: 20px;
  padding-right: 20px;
}

.container-info {
  display: flex;
  flex-wrap: wrap;
}

.info-container {
  width: 50%;
  margin-bottom: 10px;
}

.voltar {
  cursor: pointer;
  border: 1px solid rgb(209, 209, 209);
  background-color: #f0baf4;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 20%;
}

.voltar:hover {
  background-color: #cfadcf;
}

h1 {
  margin-right: 10px;
  color: #191645;
  font-size: 24px;
}

.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.titulo-pedido {
  font-size: 24px;
  font-weight: 600;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 5px 0;
}

.grid-fotos {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.grid-fotos img {
  height: 120px;
  border-radius: 10px;
  box-shadow: 0 0 5px #d1d1d1;
  object-fit: cover;
}
</style>
