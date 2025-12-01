<script setup>
import { ref, computed, onMounted } from "vue";
import SlideComponent from "./SlideComponent.vue";
import ProdutosHeader from "./ProdutosHeader.vue";
import LoadingComponent from "@/components/carregamento/LoadingComponent.vue";
import PaginacaoAdm from "../administrador/PaginacaoAdm.vue";
import { useProdutosStore } from "@/stores/produtos";

const produtosStore = useProdutosStore();
const carregando = ref(false);

// Inputs do usuário
const busca = ref("");
const ordenar = ref("popular");

// ------------------------ PAGINAÇÃO ------------------------
async function carregarProdutos(page = 1) {
  try {
    carregando.value = true;

    await produtosStore.carregarProdutos({ page });

    // Scroll após carregar
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } finally {
    carregando.value = false;
  }
}

// ----------------------------------------------------------
function faixaDePreco(tamanhos) {
  if (!tamanhos || tamanhos.length === 0) return "";
  const precos = tamanhos.map((t) => Number(t.preco));
  const min = Math.min(...precos);
  const max = Math.max(...precos);
  return `R$ ${min.toFixed(2).replace(".", ",")} - ${max
    .toFixed(2)
    .replace(".", ",")}`;
}

// 🔥 FILTRO LOCAL (apenas sobre os itens da página)
const listaFiltrada = computed(() => {
  let dados = [...produtosStore.produtos];

  // 1 — pesquisa
  if (busca.value.trim() !== "") {
    dados = dados.filter((p) =>
      p.nome.toLowerCase().includes(busca.value.toLowerCase())
    );
  }

  // 2 — ordenar
  if (ordenar.value === "nome") {
    dados.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  if (ordenar.value === "preco") {
    dados.sort((a, b) => {
      const minA = Math.min(...a.tamanhos.map((t) => Number(t.preco)));
      const minB = Math.min(...b.tamanhos.map((t) => Number(t.preco)));
      return minA - minB;
    });
  }

  if (ordenar.value === "recente") {
    dados.sort(
      (a, b) => new Date(b.data_criacao) - new Date(a.data_criacao)
    );
  }

  return dados;
});

// --------------------- LOAD ---------------------
onMounted(() => {
  carregarProdutos();
});
</script>

<template>
  <div v-if="carregando" class="carregando">
    <LoadingComponent />
  </div>

  <div v-else class="container-geral">
    <!-- HEADER + FILTRO -->
   

    <!-- ==================================================== -->
    <!--  Barra de pesquisa + Ordenação                      -->
    <!-- ==================================================== -->
    <div class="top-bar">
      <div class="input-area">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
            stroke="#666" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round"/>
        </svg>
        <input
          type="text"
          placeholder="  Pesquisar"
          v-model="busca"
        />
      </div>

      <div class="ordenar">
        <span>Ordenar por:</span>
        <select v-model="ordenar">
          <option value="popular">Popular</option>
          <option value="nome">Nome</option>
          <option value="preco">Preço</option>
          <option value="recente">Mais recente</option>
        </select>
      </div>
    </div>

    <!-- ==================================================== -->
    <!-- GRID DE PRODUTOS (APENAS DA PÁGINA ATUAL)            -->
    <!-- ==================================================== -->
    <div class="produtos">
      <div v-for="p in listaFiltrada" :key="p.id" class="produto">
        <SlideComponent
          :id="p.id"
          :img="p.foto_url"
          :nome="p.nome"
          :sabor="p.descricao"
          :faixaPreco="faixaDePreco(p.tamanhos)"
          :estrelas="p.estrelas || 5"
        />
      </div>
    </div>

    <!-- PAGINAÇÃO -->
    <PaginacaoAdm class="paginacao-produto"
      :page="produtosStore.page"
      :totalPages="produtosStore.totalPages"
      @changePage="carregarProdutos"
    />
  </div>
</template>

<style scoped>
.paginacao-produto{
  margin-bottom: 50px;
}
.container-geral {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}

/* ======================= TOPO ======================= */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60vw;
  color: #000;
}

/* SEARCH INPUT */
.input-area {
  display: flex;
  border-bottom: 1px solid #666;
  padding: 5px 0;
  width: 70%;
}
.input-area input {
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  color: rgb(27, 27, 27);
}

/* SELECT */
.ordenar {
  display: flex;
  align-items: self-end;
  gap: 10px;
}
.ordenar select {
  padding: 0px 10px;
  border-radius: 6px;
  background: #ffffff;
  color: #161616;
  border: 1px solid #44444400;
}

/* ======================= GRID PRODUTOS ======================= */
.produtos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  width: 90%;
  margin-bottom: 30px;
}
.produto {
  width: 260px;
}

/* ------------------ RESPONSIVO ------------------ */
@media (max-width: 900px) {
  .top-bar {
    width: 90%;
  }
}
@media (max-width: 500px) {
  .produto {
    max-width: 220px;
  }
}
</style>