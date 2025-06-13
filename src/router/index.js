import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/cliente/HomeView.vue'),
    },
    {
      path: '/produtos',
      name: 'Doces',
      component: () => import('../views/cliente/ProdutosView.vue')
    },
    {
      path: '/produto',
      name: 'Produto',
      component: () => import('../views/cliente/ProdutoView.vue')
    },
    {
      path: '/orcamentos',
      name: 'Orçamentos',
      component: () => import('../views/cliente/OrcamentoView.vue')
    },
    {
      path: '/sobre',
      name: 'Sobre',
      component: () => import('../views/cliente/SobreView.vue')
    },
    {
      path: '/atelie',
      name: 'Ateliê',
      component: () => import('../views/cliente/AtelieView.vue')
    },
    {
      path: '/perfil',
      name: 'Perfil',
      component: () => import('../views/cliente/PerfilView.vue')
    },
    {
      path: '/carrinho',
      name: 'Carrinho',
      component: () => import('../views/cliente/CarrinhoView.vue')
    },
    {
      path: '/homeAdmin',
      name: 'Home Admin',
      component: () => import('../views/administrador/HomeView.vue')
    },
    {
      path: '/produtosAdmin',
      name: 'Produtos Admin',
      component: () => import('../views/administrador/ProdutosView.vue')
    },
    {
      path: '/orcamentoAdmin',
      name: 'Orçamento Admin',
      component: () => import('../views/administrador/OrcamentoView.vue')
    },
    {
      path: '/pedidosAdmin',
      name: 'Pedidos Admin',
      component: () => import('../views/administrador/PedidosView.vue')
    },
    {
      path: '/perfilAdmin',
      name: 'Perfil Admin',
      component: () => import('../views/administrador/PerfilView.vue')
    },
    {
      path: '/tamanhosAdmin',
      name: 'Tamanhos Admin',
      component: () => import('../views/administrador/TamanhoView.vue')
    },
    {
      path: '/categoriasAdmin',
      name: 'Categorias Admin',
      component: () => import('../views/administrador/CategoriasView.vue')
    }
  ],
})

export default router
