import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useFiltroStore } from './filtros';
import { useRoute } from 'vue-router';
export const useCategoriaFiltroStore = defineStore('categoriaFiltro', () => {

const FiltrosStore = useFiltroStore();
const route = useRoute();
const watchBoloVovoDallah = ref([]);
const watchBoloDecorado = ref([]);
const watchBoloVulcao = ref([]);
const watchTortas = ref([]);
const watchBrigadeiros = ref([]);

// Função que será chamada sempre que `valor` mudar
const MudarBoloVovoDallah = (novoValor) => {
  FiltrosStore.boloVovoDallah = novoValor;
};

const MudarBoloDecorado = (novoValor) => {
  FiltrosStore.soloDecbrado = novoValor;
};

const MudarBoloVulcao = (novoValor) => {
  FiltrosStore.boloVulcao = novoValor;
};
const MudarTortas = (novoValor) => {
  FiltrosStore.tortas = novoValor;
};
const MudarBrigadeiros = (novoValor) => {
  FiltrosStore.brigadeiros= novoValor;
};
watch(watchBoloVovoDallah, MudarBoloVovoDallah);
watch(watchBoloDecorado, MudarBoloDecorado);
watch(watchBoloVulcao, MudarBoloVulcao);
watch(watchTortas, MudarTortas);
watch(watchBrigadeiros, MudarBrigadeiros);
const BoloVovoDallahAberto = ref(true);
const BoloDecoradoAberto = ref(false);
const BoloVulcaosAberto = ref(false);
const TortasAberto = ref(false);
const BrigadeirosAberto = ref(false);

    // Função para redefinir as variáveis
    const resetFilters = () => {
      watchBoloVovoDallah.value = [];
      FiltrosStore.boloVovoDallah = [];
      watchBoloDecorado.value = [];
      FiltrosStore.boloDecorado = [];
      watchBoloVulcao.value = [];
      FiltrosStore.boloVulcao = [];
    };

    // Watcher para detectar mudanças na rota
    watch(route, resetFilters);
  // const admProdutos = ref([
  //   {
  //     titulo: "Bolo vovó Dallah",
  //     funcao: () => {
  //       watchBoloVovoDallah.value = [];
  //       FiltrosStore.boloVovoDallah = [];
  //       BoloVovoDallahAberto.value = false;
  //     },
  //     aberto: BoloVovoDallahAberto,
  //     model: watchBoloVovoDallah,
  //     array: [
  //       {
  //         nome: "Sabor",
  //         value: "Sabor",
  //       },
  //       {
  //         nome: "Tamanho",
  //         value: "Tamanho",
  //       },
  //     ],
  //   },
  //   {
  //     titulo: "Bolos decorados",
  //     funcao: () => {
  //       watchBoloDecorado.value = [];
  //       FiltrosStore.BoloDecorado = [];
  //       BoloDecoradoAberto.value = false;
  //     },
  //     aberto: BoloDecoradoAberto,
  //     model: watchBoloDecorado,
  //     array: [
  //       {
  //         nome: "Sabor",
  //         value: "Sabor",
  //       },
  //       {
  //         nome: "Tamanho",
  //         value: "Tamanho",
  //       },
  //     ],
  //   },
  //   {
  //     titulo: "Bolo vulcão",
  //     funcao: () => {
  //       watchBoloVulcao.value = [];
  //       FiltrosStore.boloVulcao = [];
  //       BoloVulcaosAberto.value = false;
  //     },
  //     aberto: BoloVulcaosAberto,
  //     model: watchBoloVulcao,
  //     array: [
  //       {
  //         nome: "Sabor",
  //         value: "Sabor",
  //       },
  //       {
  //         nome: "Tamanho",
  //         value: "Tamanho",
  //       },
  //     ],
  //   },
  //   {
  //     titulo: "Tortas",
  //     funcao: () => {
  //       watchTortas.value = [];
  //       FiltrosStore.tortas = [];
  //       TortasAberto.value = false;
  //     },
  //     aberto: TortasAberto,
  //     model: watchTortas,
  //     array: [
  //       {
  //         nome: "Sabor",
  //         value: "Sabor",
  //       },
  //       {
  //         nome: "Tamanho",
  //         value: "Tamanho",
  //       },
  //     ],
  //   },
  //   {
  //     titulo: "Brigadeiros",
  //     funcao: () => {
  //       watchBrigadeiros.value = [];
  //       FiltrosStore.brigadeiros = [];
  //       BrigadeirosAberto.value = false;
  //     },
  //     aberto: BrigadeirosAberto,
  //     model: watchBrigadeiros,
  //     array: [
  //       {
  //         nome: "Sabor",
  //         value: "Sabor",
  //       },
  //       {
  //         nome: "Tamanho",
  //         value: "Tamanho",
  //       },
  //     ],
  //   },
  // ]);
   const admProdutos = ref([
     {
      titulo: "Todos",
      funcao: () => {
        watchBoloVovoDallah.value = [];
        FiltrosStore.boloVovoDallah = [];
        BoloVovoDallahAberto.value = false;
      },
      aberto: BoloVovoDallahAberto,
      model: watchBoloVovoDallah,
    },
    {
      titulo: "Em andamento",
      funcao: () => {
        watchBoloVovoDallah.value = [];
        FiltrosStore.boloVovoDallah = [];
        BoloVovoDallahAberto.value = false;
      },
      aberto: BoloVovoDallahAberto,
      model: watchBoloVovoDallah,
    },
    {
      titulo: "Entregues",
      funcao: () => {
        watchBoloDecorado.value = [];
        FiltrosStore.BoloDecorado = [];
        BoloDecoradoAberto.value = false;
      },
      aberto: BoloDecoradoAberto,
      model: watchBoloDecorado,
    },
    {
      titulo: "Cancelados",
      funcao: () => {
        watchBoloVulcao.value = [];
        FiltrosStore.boloVulcao = [];
        BoloVulcaosAberto.value = false;
      },
      aberto: BoloVulcaosAberto,
      model: watchBoloVulcao,
    },
  ]);


  return { BoloVovoDallahAberto, BoloDecoradoAberto, BoloVulcaosAberto, TortasAberto, BrigadeirosAberto, admProdutos};})
