import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/cliente/HomeView.vue'),
    },
    {
      path: '/produtos',
      name: 'produtos',
      component : () => import('../views/cliente/ProdutosView.vue')
    },
    {
      path: '/produto',
      name: 'produto',
      component : () => import('../views/cliente/ProdutoView.vue')
    },
    {
      path: '/orcamentos',
      name: 'orcamentos',
      component : () => import('../views/cliente/OrcamentoView.vue')
    },
    {
      path: '/sobre',
      name:'sobre',
      component: () => import('../views/cliente/SobreView.vue')
    },
    {
      path:'/atelie',
      name:'atelie',
      component: () => import('../views/cliente/AtelieView.vue')
    },
    {
      path:'/Perfil',
      name:'Perfil',
      component: () => import('../views/cliente/PerfilView.vue')
    },
        {
      path:'/carrinho',
      name:'carrinho',
      component: () => import('../views/cliente/CarrinhoView.vue')
    },
    {
      path:'/homeAdmin',
      name:'homeAdmin',
      component: () => import('../views/admin/HomeView.vue')
    },
        {
      path:'/ProdutosAdmin',
      name:'ProdutosAdmin',
      component: () => import('../views/admin/ProdutosView.vue')
    },
    {
      path:'/OrcamentoAdmin',
      name:'OrcamentoAdmin',
      component: () => import('../views/admin/OrcamentoView.vue')
    },
    {
      path:'/ProdutosAdmin',
      name:'ProdutosAdmin',
      component: () => import('../views/admin/PedidosView.vue')
    },
    {
      path:'/PerfilAdmin',
      name:'PerfilAdmin',
      component: () => import('../views/admin/PerfilView.vue')
    },

  ],
})

export default router
