import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router';

export const useTemplateStore = defineStore('template', () => {
  const authStore = useAuthStore()
const router = useRouter();
  // isAdmin reativo
  const isAdmin = computed(() => authStore.loggedIn && authStore.user?.is_superuser)

  // if(isAdmin.value){
  //   router.push('/homeAdmin')
  // }

  // Menus padrão e admin
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

  return { titles, adminTitles, isAdmin }
})