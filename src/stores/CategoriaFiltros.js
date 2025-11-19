import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import { useProdutosStore } from "./produtos";
import { useTamanhoStore } from "./tamanhos";
import { useCategoriaStore } from "./categorias";
import { usePedidosStore } from "./pedidos";

export const useCategoriaFiltroStore = defineStore("categoriaFiltro", () => {
  const route = useRoute();

  const produtosStore = useProdutosStore();
  const tamanhosStore = useTamanhoStore();
  const categoriasStore = useCategoriaStore();
  const pedidosStore = usePedidosStore();

  const filtroSelecionado = ref("todos");
  const filtros = ref([]);
  const isLoading = ref(false);

  watch(
    () => route.path,
    async (novaRota) => {
      filtroSelecionado.value = "todos";
      isLoading.value = true;

      // 🔥 /produtos agora funciona EXATAMENTE como /admin/produtos
      if (novaRota === "/produtos" || novaRota === "/admin/produtos") {
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
      }

      // filtros admin / tamanhos
      else if (novaRota === "/admin/tamanhos") {
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
      }

      // páginas sem filtro
      else if (
        novaRota === "/admin/categorias" ||
        novaRota === "/admin/orcamento" ||
        novaRota === "/admin/orcamentos" ||
        novaRota === "/admin/clientes"
      ) {
        filtros.value = [{ titulo: "Todos", value: "todos" }];
      }

      // filtros de pedidos
      else if (novaRota === "/admin/pedidos") {
        filtros.value = [
          { titulo: "Todos", value: "0" },
          { titulo: "Carrinho", value: "1" },
          { titulo: "Realizado", value: "2" },
          { titulo: "Pago", value: "3" },
          { titulo: "Entregue", value: "4" },
        ];
      }

      else {
        filtros.value = [];
      }

      isLoading.value = false;
    },
    { immediate: true }
  );

  const selecionarFiltro = async (value) => {
    filtroSelecionado.value = value;
    isLoading.value = true;

    let params = {};

    if (value !== "todos") {
      params = { categoria__id: value };
    }

    if (route.path === "/produtos" || route.path === "/admin/produtos") {
      await produtosStore.carregarProdutos(params);
    }

    if (route.path === "/admin/tamanhos") {
      await tamanhosStore.getTamanhos(params);
    }

    if (route.path === "/admin/categorias") {
      await categoriasStore.getCategorias();
    }

    if (route.path === "/admin/pedidos") {
      const statusParam = value === "todos" ? {} : { status: value };
      await pedidosStore.carregarPedidos(statusParam);
    }

    isLoading.value = false;
  };

  return {
    filtros,
    filtroSelecionado,
    selecionarFiltro,
    isLoading,
  };
});
