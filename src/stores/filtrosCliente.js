import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import { useProdutosStore } from "./produtos";
import { useCategoriaStore } from "./categorias";

export const useFiltrosClienteStore = defineStore("filtrosCliente", () => {
  const route = useRoute();
  const produtosStore = useProdutosStore();
  const categoriasStore = useCategoriaStore();

  const filtros = ref([]);
  const filtroSelecionado = ref("todos");
  const isLoading = ref(false);

  // 🔖 mapa de filtros fixos (ligados ao nome da categoria no backend)
  const mapFiltro = {
    Bolos: ["Bolo Decorado", "Bolo Vulcão", "Bolo vovó Dallah"],
    Tortas: ["Torta"],
    Brigadeiros: ["Brigadeiro"]
  };

  const filtrosDesejados = ["Bolos", "Tortas", "Brigadeiros"];

  // 🚀 carrega filtros ao entrar na rota /produtos
  watch(
    () => route.path,
    async (novaRota) => {
      if (novaRota !== "/produtos") return;

      isLoading.value = true;
      filtroSelecionado.value = "todos";

      // garante que as categorias já foram buscadas
      if (!categoriasStore.categorias.length) {
        await categoriasStore.getCategorias();
      }

      // cria os filtros visuais (baseados no que existe no backend)
      const filtrosMapeados = filtrosDesejados
        .map((filtro) => {
          const existe = categoriasStore.categorias.some((c) =>
            mapFiltro[filtro].includes(c.nome)
          );
          if (existe) {
            return { titulo: filtro, value: filtro };
          }
          return null;
        })
        .filter(Boolean);

      filtros.value = [{ titulo: "Todos", value: "todos" }, ...filtrosMapeados];

      // carrega produtos inicialmente
      await produtosStore.carregarProdutos();

      isLoading.value = false;
    },
    { immediate: true }
  );

  // 🧭 função para aplicar o filtro selecionado
  const selecionarFiltro = async (value) => {
    filtroSelecionado.value = value;
    isLoading.value = true;

    let params = {};
    if (value !== "todos") {
      params = {
        categoria_nome: mapFiltro[value] // envia lista de nomes reais pro backend
      };
    }

    await produtosStore.carregarProdutos(params);
    isLoading.value = false;
  };

  return {
    filtros,
    filtroSelecionado,
    selecionarFiltro,
    isLoading
  };
});
