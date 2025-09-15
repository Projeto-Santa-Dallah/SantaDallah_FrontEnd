import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTemplateStore = defineStore('template', () => {
  const titles = [
    { text: 'Home', link: '/' },
    { text: 'Doces', link: '/produtos' },
    { text: 'Orçamentos', link: '/orcamentos' },
    { text: 'Sobre', link: '/sobre' },
    { text: 'Ateliê', link: '/atelie' }
  ]

  const adminTitles = [
    { text: 'Home', link: '/homeAdmin' },
    { text: 'Doces', link: '/produtosAdmin' },
    { text: 'Tamanhos', link: '/tamanhosAdmin' },
    { text: 'Categorias', link: '/categoriasAdmin' },
    { text: 'Pedidos', link: '/pedidosAdmin' },
    { text: 'Orçamentos', link: '/orcamentoAdmin' },    
    { text: 'Clientes', link: '/clientesAdmin' },
    { text: 'Perfil', link: '/perfilAdmin' }
  ]

  const isAdmin = ref(false)

  return { titles, adminTitles, isAdmin }
})
