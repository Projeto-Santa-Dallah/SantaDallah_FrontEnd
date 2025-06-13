// src/stores/templateStore.js
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTemplateStore = defineStore('template', () => {
  const titles = [
    { text: 'Home', link: '/' },
    { text: 'Doces', link: '/produtos' },
    // { 
    //   text: 'Doces', 
    //   link: '/produto', 
    //   icon: '<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 7.125L9 11.875L13.5 7.125" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>' 
    // },
    { text: 'Orçamentos', link: '/orcamentos' },
    { text: 'Sobre', link: '/sobre' },
    { text: 'Ateliê', link: '/atelie' }
  ]

  const adminTitles = [
    { text: 'Home', link: '/homeAdmin' },
    { text: 'Doces', link: '/produtosAdmin' },
    { text: 'Orçamento', link: '/orcamentoAdmin' },
    { text: 'Tamanhos', link: '/tamanhosAdmin' },
    { text: 'Perfil', link: '/perfilAdmin' }
  ]

  const isAdmin = ref(false)

  return { titles, adminTitles, isAdmin }
})
