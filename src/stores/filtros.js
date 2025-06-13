import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFiltroStore = defineStore('filtro', () => {
  const boloVovoDallah = ref([])
  const boloDecorado = ref([])
  const boloVulcao = ref([])
  const tortas = ref([])
  const brigadeiros = ref([])
  
  return { boloVovoDallah, boloDecorado, boloVulcao, tortas, brigadeiros }
})
