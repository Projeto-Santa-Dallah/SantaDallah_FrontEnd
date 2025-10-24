import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import { useProdutosStore } from "./produtos";
import { useTamanhoStore } from "./tamanhos";
import { useCategoriaStore } from "./categorias";
import { usePedidosStore } from "./pedidos"; // import da store de pedidos

export const useCategoriaFiltroStore = defineStore("categoriaFiltro", () => {
  const route = useRoute();

  // outras stores
  const produtosStore = useProdutosStore();
  const tamanhosStore = useTamanhoStore();
  const categoriasStore = useCategoriaStore();
  const pedidosStore = usePedidosStore();

  // estado
  const filtroSelecionado = ref(null);
  const filtros = ref([]);

  // 🔹 ref de loading só pra você ver quando está puxando
  const isLoading = ref(false);

  // quando rota mudar, define filtros iniciais
  watch(
    () => route.path,
    async (novaRota) => {
      filtroSelecionado.value = null;

      if (novaRota === "/produtosAdmin" || novaRota === "/tamanhosAdmin") {
        isLoading.value = true;
        if (!categoriasStore.categorias.length) {
          await categoriasStore.getCategorias();
        }
        filtros.value = [
          { titulo: "Todos", value: "todos" },
          ...categoriasStore.categorias.map((c) => ({
            titulo: c.nome,
            value: c.id,
          })),
        ];
        isLoading.value = false;
      } else if (novaRota === "/categoriasAdmin") {
        filtros.value = [{ titulo: "Todos", value: "todos" }];
      } else if (novaRota === "/pedidosAdmin") {
        filtros.value = [
          { titulo: "Todos", value: "0" },
          { titulo: "Carrinho", value: "1" },
          { titulo: "Realizado", value: "2" },
          { titulo: "Pago", value: "3" },
          { titulo: "Entregue", value: "4" },
        ];
      } else if (novaRota === "/orcamentoAdmin") {
        filtros.value = [{ titulo: "Todos", value: "todos" }];
      } else {
        filtros.value = [];
      }
    },
    { immediate: true }
  );

  // aplicar filtro
  const selecionarFiltro = async (value) => {
    filtroSelecionado.value = value;
    isLoading.value = true;

    if (route.path === "/produtosAdmin") {
      const params = value === "todos" ? {} : { categoria__id: value };
      await produtosStore.carregarProdutos(params);
    }

    if (route.path === "/tamanhosAdmin") {
      const params = value === "todos" ? {} : { categoria__id: value };
      await tamanhosStore.getTamanhos(params);
    }

    if (route.path === "/categoriasAdmin") {
      await categoriasStore.getCategorias();
    }

    if (route.path === "/pedidosAdmin") {
      const params = value === "todos" ? {} : { status: value };
      await pedidosStore.carregarPedidos(params);
    }

    isLoading.value = false;
    console.log("Filtro carregado! Loading:", isLoading.value);
  };

  return {
    filtros,
    filtroSelecionado,
    selecionarFiltro,
    isLoading, // 🔹 expõe pra usar em qualquer componente
  };
});
