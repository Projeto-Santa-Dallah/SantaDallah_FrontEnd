import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import AdminLayout from '@/layouts/AdminLayout.vue'
import ClienteLayout from '@/layouts/ClienteLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ROTAS CLIENTE (usam ClienteLayout)
    {
      path: '/',
      component: ClienteLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/cliente/HomeView.vue'),
        },
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/LoginView.vue'),
        },
        {
          path: 'produtos',
          name: 'Doces',
          component: () => import('@/views/cliente/ProdutosView.vue'),
        },
        {
          path: 'produto/:id',
          name: 'Produto',
          component: () => import('@/views/cliente/ProdutoView.vue'),
        },
        {
          path: 'pagamento',
          name: 'Pagamento',
          component: () => import('@/views/cliente/PagamentoView.vue'),
        },
        {
          path: '/pagamento/success',
          name: 'pagamentoAprovado',
          component: () => import('../views/cliente/AprovadoView.vue')
          },
        {
          path: 'orcamentos',
          name: 'Orçamentos',
          component: () => import('@/views/cliente/OrcamentoView.vue'),
        },
        {
          path: 'sobre',
          name: 'Sobre',
          component: () => import('@/views/cliente/SobreView.vue'),
        },
        {
          path: 'atelie',
          name: 'Ateliê',
          component: () => import('@/views/cliente/AtelieView.vue'),
        },
        {
          path: 'boloPersonalizado',
          name: 'BoloPersonalizado',
          component: () => import('@/views/cliente/BoloPersonalizado.vue'),
        },
        {
          path: 'perfil',
          name: 'Perfil',
          component: () => import('@/views/cliente/PerfilView.vue'),
        },
        {
          path: 'carrinho',
          name: 'Carrinho',
          component: () => import('@/views/cliente/CarrinhoView.vue'),
        },
      ],
    },

    // ROTAS ADMIN (usam AdminLayout)
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        {
          path: '',
          name: 'Home Admin',
          component: () => import('@/views/administrador/HomeView.vue'),
        },
        {
          path: 'produtos',
          name: 'Produtos Admin',
          component: () => import('@/views/administrador/ProdutosView.vue'),
        },
        {
          path: 'orcamentos',
          name: 'Orçamentos Admin',
          component: () => import('@/views/administrador/OrcamentoView.vue'),
        },
        {
          path: 'pedidos',
          name: 'Pedidos Admin',
          component: () => import('@/views/administrador/PedidosView.vue'),
        },
        {
          path: 'clientes',
          name: 'Clientes Admin',
          component: () => import('@/views/administrador/ClientesView.vue'),
        },
        {
          path: 'perfil',
          name: 'Perfil Admin',
          component: () => import('@/views/administrador/PerfilView.vue'),
        },
        {
          path: 'tamanhos',
          name: 'Tamanhos Admin',
          component: () => import('@/views/administrador/TamanhoView.vue'),
        },
        {
          path: 'categorias',
          name: 'Categorias Admin',
          component: () => import('@/views/administrador/CategoriasView.vue'),
        },
      ],
    },
  ],
})

export default router