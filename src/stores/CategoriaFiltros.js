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

  // mapeamento para os filtros fixos
  const mapFiltro = {
    Bolos: ["Bolo Decorado", "Bolo Vulcão", "Bolo vovó Dallah"],
    Tortas: ["Torta"],
    Brigadeiros: ["Brigadeiro"]
  };

  const filtrosDesejados = ["Bolos", "Tortas", "Brigadeiros"];

  watch(
    () => route.path,
    async (novaRota) => {
      filtroSelecionado.value = "todos";
      isLoading.value = true;

      if (novaRota === "/produtos") {
        if (!categoriasStore.categorias.length) {
          await categoriasStore.getCategorias();
        }

        // filtra e mapeia categorias para os filtros fixos
        const filtrosMapeados = filtrosDesejados
          .map(filtro => {
            const existe = categoriasStore.categorias.some(c =>
              mapFiltro[filtro].includes(c.nome)
            );
            if (existe) {
              return { titulo: filtro, value: filtro };
            }
            return null;
          })
          .filter(Boolean);

        filtros.value = [{ titulo: "Todos", value: "todos" }, ...filtrosMapeados];
      }

      else if (
        novaRota === "/admin/produtos" ||
        novaRota === "/admin/tamanhos"
      ) {
        if (!categoriasStore.categorias.length) {
          await categoriasStore.getCategorias();
        }
        filtros.value = [
          { titulo: "Todos", value: "todos" },
          ...categoriasStore.categorias.map(c => ({
            titulo: c.nome,
            value: c.id
          }))
        ];
      }

      else if (
        novaRota === "/admin/categorias" ||
        novaRota === "/admin/orcamento" ||
        novaRota === "/admin/orcamentos" ||   
        novaRota === "/admin/clientes"         
      ) {
        filtros.value = [{ titulo: "Todos", value: "todos" }];
      }

      else if (novaRota === "/admin/pedidos") {
        filtros.value = [
          { titulo: "Todos", value: "0" },
          { titulo: "Carrinho", value: "1" },
          { titulo: "Realizado", value: "2" },
          { titulo: "Pago", value: "3" },
          { titulo: "Entregue", value: "4" }
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
      if (route.path === "/produtos") {
        params = { categoria_nome: mapFiltro[value] };
      } else {
        params = { categoria__id: value };
      }
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
    console.log("Filtro carregado! Loading:", isLoading.value);
  };

  return {
    filtros,
    filtroSelecionado,
    selecionarFiltro,
    isLoading,
  };
});
