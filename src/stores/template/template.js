import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

export const useTemplateStore = defineStore('template', () => {
  const authStore = useAuthStore()

  // Verifica se o usuário logado é administrador
  const isAdmin = computed(() => authStore.loggedIn && authStore.user?.is_superuser)

  // Menus padrão (cliente)
  const titles = [
    { text: 'Home', link: '/' },
    { text: 'Doces', link: '/produtos' },
    { text: 'Orçamentos', link: '/orcamentos' },
    { text: 'Sobre', link: '/sobre' },
    { text: 'Ateliê', link: '/atelie' },
    { text: 'Perfil', link: '/perfil' },
    { text: 'Carrinho', link: '/carrinho' },
  ]

  // Menus do administrador (atualizados para o novo padrão de rotas)
  const adminTitles = [
  { text: 'Home', link: '/admin' },
  { text: 'Doces', link: '/admin/produtos' },
  { text: 'Tamanhos', link: '/admin/tamanhos' },
  { text: 'Categorias', link: '/admin/categorias' },
  { text: 'Pedidos', link: '/admin/pedidos' },
  { text: 'Orçamentos', link: '/admin/orcamentos' },
  { text: 'Clientes', link: '/admin/clientes' },
  { text: 'Perfil', link: '/admin/perfil' },  
  ]


  return { titles, adminTitles, isAdmin }
})
