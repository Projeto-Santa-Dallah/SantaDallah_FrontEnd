<script setup>
import { ref, computed, watch } from 'vue'
import { useCartStore } from '@/stores/carrinhoStore'
import { useRouter } from 'vue-router' 
const router = useRouter()
const carrinho = useCartStore()
const visibleAddCart = ref(false)
function fecharModal() {
  visibleAddCart.value = false
}

function irParaCarrinho() {
  fecharModal()
  router.push('/carrinho')
}

function addToCart() {
  // pega o 1º tamanho para não ter ambiguidades
  const tamanho = resultJSON.value.tamanhos[0]

  const produto = {
    id: `${resultJSON.value.id}-${numCamadas.value} camadas`,
    nome: `${resultJSON.value.nome} (${numCamadas.value} camadas)`,
    preco: totalPrice.value,
    quantidade: 1,
    sabor: resultJSON.value.sabor,
    tamanho: `${numCamadas.value} camadas`,
    descricao: resultJSON.value.descricao,
    foto_url: resultJSON.value.foto?.[0]?.url || '',
  }

 carrinho.addItem(produto)
visibleAddCart.value = true
setTimeout(() => (visibleAddCart.value = false), 2500)

}

// ============================================================================
// DADOS E CONSTANTES
// ============================================================================

const MASSA_COLORS = {
  'Branca': '#F3E9DD',
  'Chocolate': '#C7A987',
  'Dark': '#333333',
  'Vermelha': '#E6A3A8',
  'Baunilha': '#F6E8D5'
}

const RECHEIO_COLORS = {
  'Creme de Coco': '#F6F0C8',
  'Brigadeiro de Ninho': '#E6C8A6',
  'Nutella': '#C8A788',
  'Brigadeiro de Chocolate': '#B68A65',
  'Doce de Leite': '#E3B489',
  'Coco': '#FFF6D9',
  'Brigadeiro de Baunilha': '#F3DFBF',
  'Geleia de Morango': '#F6A6C7',
  'Ganache de Chocolate': '#8A6A51',
  'Creme de Cream Cheese': '#F3FAFF',
  'Geleia de Frutas Vermelhas': '#E9A4A8',
  'Brigadeiro de Pistache': '#BFE8BF',
  'Geleia de Frutas Amarelas': '#FFE48A',
  'Creme de Café': '#C5B098',
  'Geleia de Maracujá': '#FFD28A',
  'Brigadeiro de Castanha': '#E4C9AA',
  'Creme de Chocolate Branco': '#FFF7EA',
  'Ganache Aerada de Chocolate': '#9E7D61',
  'Creme de Limão Siciliano': '#FFF2C9',
  'Brigadeiro de Nozes': '#C9B19A',
  'Damasco': '#FFC979',
  'Morangos Inteiros': '#F29AB8'
}

const MASSAS = ['Branca', 'Chocolate', 'Dark', 'Vermelha', 'Baunilha']

const RECHEIOS = [
  'Creme de Coco',
  'Brigadeiro de Ninho',
  'Nutella',
  'Brigadeiro de Chocolate',
  'Doce de Leite',
  'Coco',
  'Brigadeiro de Baunilha',
  'Geleia de Morango',
  'Ganache de Chocolate',
  'Creme de Cream Cheese',
  'Geleia de Frutas Vermelhas',
  'Brigadeiro de Pistache',
  'Geleia de Frutas Amarelas',
  'Creme de Café',
  'Geleia de Maracujá',
  'Brigadeiro de Castanha',
  'Creme de Chocolate Branco',
  'Ganache Aerada de Chocolate',
  'Creme de Limão Siciliano',
  'Brigadeiro de Nozes',
  'Damasco',
  'Morangos Inteiros'
]

const TAMANHOS = [
  { id: 1, nome: 'PETIT', fatias: 8, peso: '1,1kg', priceTradicional: 135, priceEspecial: 150 },
  { id: 2, nome: 'PP', fatias: 14, peso: '1,6kg', priceTradicional: 195, priceEspecial: 215 },
  { id: 3, nome: 'P', fatias: 20, peso: '2,4kg', priceTradicional: 290, priceEspecial: 325 },
  { id: 4, nome: 'M', fatias: 28, peso: '3,3kg', priceTradicional: 400, priceEspecial: 445 },
  { id: 5, nome: 'G', fatias: 38, peso: '4,4kg', priceTradicional: 530, priceEspecial: 595 }
]

// Tamanhos fixos das camadas (em pixels)
const LAYER_WIDTHS = [300, 260, 220, 180, 140]

// ============================================================================
// ESTADO REATIVO
// ============================================================================

const selectedMassas = ref(['Branca'])
const selectedRecheios = ref(['Creme de Coco'])
const numCamadas = ref(1)
const showResult = ref(false)

// Sincroniza o número de recheios e massas com o número de camadas
watch(numCamadas, (newVal) => {
  // Sincroniza recheios
  if (selectedRecheios.value.length > newVal) {
    selectedRecheios.value = selectedRecheios.value.slice(0, newVal)
  } else if (selectedRecheios.value.length < newVal) {
    while (selectedRecheios.value.length < newVal) {
      selectedRecheios.value.push(RECHEIOS[selectedRecheios.value.length % RECHEIOS.length])
    }
  }

  // Sincroniza massas
  if (selectedMassas.value.length > newVal) {
    selectedMassas.value = selectedMassas.value.slice(0, newVal)
  } else if (selectedMassas.value.length < newVal) {
    while (selectedMassas.value.length < newVal) {
      selectedMassas.value.push(MASSAS[selectedMassas.value.length % MASSAS.length])
    }
  }
})

// ============================================================================
// FUNÇÕES COMPUTADAS
// ============================================================================

const totalPrice = computed(() => {
  let total = 0

  // Calcula o preço baseado na quantidade de camadas (sempre especial)
  for (let i = 0; i < numCamadas.value; i++) {
    const tamanho = TAMANHOS[i]
    if (tamanho) {
      total += tamanho.priceEspecial
    }
  }

  return total
})

const resultJSON = computed(() => {
  // Cria descrição detalhada com as camadas
  const descricaoCamadas = selectedMassas.value.map((massa, idx) => {
    return `Camada ${idx + 1}: Massa ${massa} com recheio ${selectedRecheios.value[idx]}`
  }).join('; ')

  return {
    id: Math.floor(Math.random() * 1000),
    nome: 'Bolo Personalizado',
    descricao: `Bolo personalizado com ${numCamadas.value} camadas. ${descricaoCamadas}`,
       "categoria": [
        {
            "id": 12,
            "nome": "Personalizado",
            "descricao": "Bolo 100% personalizado, com camadas, recheios e massas definidas pelo usuario."
        }
    ],
    tamanhos: selectedRecheios.value.map((_, index) => {
      const tamanho = TAMANHOS[index]
      return {
        id: tamanho.id,
        tamanho_nome: tamanho.nome,
        preco: tamanho.priceEspecial.toFixed(2)
      }
    }),
    sabor: 'Personalizado',
    tipo: 2,
    validade: 2,
     "foto": [
        {
            "url": "https://res.cloudinary.com/dw2awmnxl/image/upload/v1/media/images/d412b92d-9887-441c-aa43-ae8e2cc04926_bm3tth",
            "description": "foto para bolo personalisado",
            "uploaded_on": "2025-11-28T14:34:14.298117-03:00"
        }
    ],
    
  }
})

// ============================================================================
// FUNÇÕES
// ============================================================================

const copyJSON = () => {
  navigator.clipboard.writeText(JSON.stringify(resultJSON.value, null, 2))
  alert('JSON copiado para a área de transferência!')
}

const getLayerWidth = (layerIndex) => {
  // Retorna o tamanho fixo da camada baseado no índice
  return LAYER_WIDTHS[layerIndex] || LAYER_WIDTHS[LAYER_WIDTHS.length - 1]
}

const getLayerY = (layerIndex) => {
  // Calcula a posição Y para que as camadas fiquem alinhadas na base
  const baseY = 400
  const layerHeight = 65
  const totalLayers = numCamadas.value
  const yOffset = (totalLayers - 1 - layerIndex) * layerHeight
  return baseY - yOffset
}
const previewImage = ref(null)

function handleImageUpload(e) {
  const file = e.target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => previewImage.value = reader.result
  reader.readAsDataURL(file)
}

</script>

<template>
  <div class="home-container">
    <!-- Header -->
    <h1>Bolo Personalizado</h1>

    <section class="main-section">
      <!-- Painel de Personalização -->
      <div class="personalization-panel">
        <!-- Camadas -->
        <div class="form-group">
          <h3>Quantidade de Camadas</h3>
          <div class="button-group-inline">
            <button v-for="num in [1, 2, 3, 4, 5]" :key="num" @click="numCamadas = num"
              :class="numCamadas === num ? 'btn-active' : 'btn-inactive'">
              {{ num }}
            </button>
          </div>
        </div>

        <!-- Massas e Recheios por Camada -->
        <div class="form-group">
          <h3>Escolha Massa e Recheio por Camada</h3>
          <div class="camadas-container">
            <div v-for="(recheio, index) in selectedRecheios" :key="index" class="camada-select escolhas">
              <label class="camada-label">Camada {{ index + 1 }}:</label>

              <div class="camada-inputs">
                <select v-model="selectedMassas[index]" class="camada-dropdown">
                  <option v-for="m in MASSAS" :key="m" :value="m">
                    {{ m }}
                  </option>
                </select>

                <select v-model="selectedRecheios[index]" class="camada-dropdown">
                  <option v-for="r in RECHEIOS" :key="r" :value="r">
                    {{ r }}
                  </option>
                </select>

                <div class="color-preview" :style="{ backgroundColor: RECHEIO_COLORS[recheio] || '#ccc' }"
                  title="Cor do recheio" />
              </div>
            </div>
          </div>
        </div>

        <!-- Resumo de Preço -->
        <!-- <div class="price-summary">
          <div v-for="(_, index) in selectedRecheios" :key="`price-${index}`" class="price-line">
            <span>{{ TAMANHOS[index].nome }}:</span>
            <span>R$ {{ TAMANHOS[index].priceEspecial.toFixed(2) }}</span>
          </div>
          <div class="price-line total">
            <span>Total:</span>
            <span>R$ {{ totalPrice.toFixed(2) }}</span>
          </div>
        </div> -->

        <!-- Botão de Visualizar -->
      </div>

      <!-- Visualização do Bolo -->
      <div class="cake-preview">
        <div class="cake-container">
          <svg width="100%" height="100%" viewBox="0 0 400 600" style="max-width: 400px; max-height: 600px"
            class="cake-svg">
            <!-- Renderiza as camadas do bolo (de maior para menor) -->
            <g v-for="(recheio, layerIndex) in selectedRecheios" :key="`layer-${layerIndex}`">
              <!-- Calcula a posição Y baseada no índice da camada -->
              <template v-if="layerIndex < numCamadas">
                <!-- Massa superior -->
                <rect :x="200 - getLayerWidth(layerIndex) / 2" :y="getLayerY(layerIndex)"
                  :width="getLayerWidth(layerIndex)" :height="25" :fill="MASSA_COLORS[selectedMassas[layerIndex]]"
                  stroke="#333" stroke-width="2" rx="8" ry="8" />

                <!-- Recheio -->
                <rect :x="200 - getLayerWidth(layerIndex) / 2" :y="getLayerY(layerIndex) + 25"
                  :width="getLayerWidth(layerIndex)" :height="15" :fill="RECHEIO_COLORS[recheio] || '#ccc'"
                  stroke="#333" stroke-width="1" rx="6" ry="6" />

                <!-- Massa inferior -->
                <rect :x="200 - getLayerWidth(layerIndex) / 2" :y="getLayerY(layerIndex) + 40"
                  :width="getLayerWidth(layerIndex)" :height="25" :fill="MASSA_COLORS[selectedMassas[layerIndex]]"
                  stroke="#333" stroke-width="2" rx="8" ry="8" />
              </template>
            </g>
          </svg>
        </div>
      </div>
    </section>
<div class="resumo">
  <div class="resumo-left">
    <h3>Resumo do Bolo</h3>
    <p><strong>Camadas:</strong> {{ numCamadas }}</p>

    <div
      v-for="(massa, idx) in selectedMassas"
      :key="`info-${idx}`"
      class="camada-info"
    >
      <p>
        <strong>Camada {{ idx + 1 }}:</strong>
        {{ massa }} com {{ selectedRecheios[idx] }}
      </p>
    </div>

    <p class="price-info"><strong>Preço Total:</strong> R$ {{ totalPrice.toFixed(2) }}</p>
    
<button @click="addToCart" class="btn-add-cart"> Adicionar ao Carrinho
</button>

  </div>

 
  <div class="resumo-image-aside">
    <label class="image-drop">
      <input type="file" accept="image/*" @change="handleImageUpload" />
      <span v-if="!previewImage">Selecionar imagem para ser utilizada <br>como referência de decoração</span>
      <img v-if="previewImage" :src="previewImage" alt="Imagem" />
    </label>
  </div>
</div>
</div>
<div>
    <!-- Modal de Resultado -->
    <div v-if="showResult" class="modal-overlay">
      <div class="modal-content">
        <h2>Seu Pedido</h2>
        <div class="json-display">
          <pre>{{ JSON.stringify(resultJSON, null, 2) }}</pre>
        </div>
        <div class="modal-buttons">
          <button @click="copyJSON" class="btn-copy">
            Copiar JSON
          </button>
          <button @click="showResult = false" class="btn-close">
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
  <transition name="fade">
  <div v-if="visibleAddCart" class="modal-overlay" @click="fecharModal">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="fecharModal">&times;</button>
      <div class="modal-body">
        <h2>Produto Adicionado!</h2>
        <p>Seu bolo personalizado foi adicionado ao seu carrinho.</p>
        <button class="btn-carrinho" @click="irParaCarrinho">Ir para Carrinho</button>
      </div>
    </div>
  </div>
</transition>

</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 15px;
  padding: 30px;
  max-width: 400px;
  width: 90%;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.modal-body {
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #BF99C8;
}

.btn-carrinho {
  background-color: #BF99C8;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 15px 0px;
}

.btn-carrinho:hover {
  transform: translateY(2px);
  opacity: 0.9;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.btn-add-cart {
  background-color: #bf99c8;
  color: white;
  padding: 12px 22px;
  font-size: 17px;
  border-radius: 28px;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
  margin: 30px 0px;
  letter-spacing: 0.6px;
  transition: .3s ease;
}

.btn-add-cart:hover {
  background-color: #a67fb0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(191, 153, 200, 0.35);
}

/* ============================================================================
   ESTILOS GLOBAIS - TEMA SANTA DALLAH
   ============================================================================ */

:root {
  --primary-color: #BF99C8;
  --secondary-color: #F8CFEF;
  --text-color: #333;
  --border-color: #BF99C8;
  --background-color: #f9f9f9;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ============================================================================
   CONTAINER PRINCIPAL
   ============================================================================ */

.home-container {
  width: 100%;
  min-height: 100vh;
}

h1 {
  text-align: center;
  font-size: 24px;
  margin-top: 6vh;
  color: var(--text-color);
  letter-spacing: 0.8px;
  padding: 30px;
}

h3 {
  font-size: 16px;
  margin: 0;
  color: var(--text-color);
  margin-bottom: 12px;
}

span {
  letter-spacing: 0.8px;
  display: block;
  margin-top: 15px;
  margin-bottom: 30px;
  font-size: 16px;
  color: var(--text-color);
}

/* ============================================================================
   SEÇÃO PRINCIPAL
   ============================================================================ */

.main-section {
  display: flex;
  width: 70%;
  margin: auto;
  align-items: flex-start;
  gap: 40px;
  padding: 40px 0;
}

.main-section>div {
  flex: 1;
}

/* ============================================================================
   PAINEL DE PERSONALIZAÇÃO
   ============================================================================ */

.personalization-panel {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-group {
  background-color: #e0e0e010;
  border: 1px solid #5a5a5a18;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(191, 153, 200, 0.1);
}

.form-group h3 {
  color: var(--primary-color);
  margin-bottom: 15px;
  font-weight: 600;
}

/* ============================================================================
   BOTÕES
   ============================================================================ */

button {
  font-size: 16px;
  border-radius: 25px;
  color: white;
  background-color: var(--primary-color);
  cursor: pointer;
  border: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #a67fb0;
  color: white!important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(191, 153, 200, 0.3);
}
.escolhas{
      border: 2px solid #925d9049;
}
button:active {
  transform: translateY(0);
}

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
  opacity: 0.6;
}

/* Botões de grupo */
.button-group-inline {
  display: flex;
  gap: 10px;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.button-group-inline button {
  flex: 1;
  padding: 10px 15px;
  font-size: 14px;
  color: #BF99C8;
  border: 1px solid #BF99C8;
}

.btn-active {
  background-color: var(--primary-color);
  color: white;
}

.btn-inactive {
  background-color: #f0f0f0;
  color: var(--text-color);
  border: 1px solid var(--border-color);
}


/* ============================================================================
   SELEÇÃO DE MASSAS E RECHEIOS POR CAMADA
   ============================================================================ */

.camadas-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.camada-select {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: 8px;
}

.camada-label {
  font-weight: 600;
  color: var(--text-color);
  font-size: 14px;
}

.camada-inputs {
  display: flex;
  gap: 10px;
  align-items: center;
}

.camada-dropdown {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  background-color: white;
  color: var(--text-color);
}

.camada-dropdown:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(191, 153, 200, 0.1);
}

.color-preview {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: 2px solid #ddd;
  flex-shrink: 0;
}

/* ============================================================================
   RESUMO DE PREÇO
   ============================================================================ */

.price-summary {
  background: linear-gradient(135deg, var(--primary-color) 0%, #a67fb0 100%);
  color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(191, 153, 200, 0.3);
}

.price-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
}

.price-line.total {
  border-top: 1px solid rgb(39, 39, 39);
  padding-top: 10px;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 700;
}

/* ============================================================================
   BOTÃO VISUALIZAR
   ============================================================================ */

.btn-visualizar {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 25px;
  color: #ffffff;
  background-color:#F0BAF4;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(191, 153, 200, 0.3);
  margin: 30px 0px;
  align-self: flex-end;
}

.btn-visualizar:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(238, 199, 247, 0.4);
  color: white;
}

/* ============================================================================
   VISUALIZAÇÃO DO BOLO
   ============================================================================ */

.cake-preview {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cake-container {
  background-color: #e0e0e010;
  border: 1px solid #5a5a5a18;
  border-radius: 15px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  box-shadow: 0 2px 8px rgba(191, 153, 200, 0.1);
}

.cake-svg {
  filter: none;
  transform: rotate(180deg);
}

.cake-info {
  background-color: #e0e0e010;
  border: 1px solid #5a5a5a18;
  border-radius: 15px;
  border: 1px solid var(--border-color);
  padding: 20px;
  box-shadow: 0 2px 8px rgba(191, 153, 200, 0.1);
  width: 100%;
  margin-bottom: 30px;
}

.cake-info h3 {
  color: var(--primary-color);
  margin-bottom: 15px;
}

.cake-info p {
  margin: 8px 0;
  font-size: 14px;
  color: var(--text-color);
  line-height: 1.6;
}

.camada-info {
  margin-left: 10px;
  padding: 8px 0;
  border-left: 3px solid var(--primary-color);
  padding-left: 10px;
}

.camada-info p {
  margin: 4px 0;
}

.price-info {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

.cake-info strong {
  color: var(--primary-color);
}

/* ============================================================================
   MODAL
   ============================================================================ */

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.modal-content {
  background: white;
  border-radius: 25px;
  padding: 30px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-content h2 {
  font-size: 24px;
  color: var(--primary-color);
  margin-bottom: 20px;
  text-align: center;
}

.json-display {
  background-color: #f5f5f5;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 20px;
  overflow-x: auto;
}

.json-display pre {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: var(--text-color);
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.modal-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn-copy,
.btn-close {
  flex: 1;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-copy {
  background-color: var(--primary-color);
  color: white;
}

.btn-copy:hover {
  background-color: #a67fb0;
}

.btn-close {
  background-color: #f0f0f0;
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.btn-close:hover {
  background-color: #e8e8e8;
}

/* ============================================================================
   RESPONSIVIDADE
   ============================================================================ */

@media (max-width: 1024px) {
  .main-section {
    width: 85%;
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .main-section {
    flex-direction: column;
    width: 90%;
    gap: 20px;
  }

  .main-section>div {
    width: 100%;
  }

  h1 {
    font-size: 20px;
    margin-top: 4vh;
  }

  .button-group-inline {
    flex-wrap: wrap;
  }

  .button-group-inline button {
    flex: 0 1 calc(50% - 5px);
  }

  .form-group {
    padding: 15px;
  }

  .cake-container {
    min-height: 400px;
    padding: 20px;
  }

  .modal-content {
    width: 95%;
    padding: 20px;
  }

  .json-display pre {
    font-size: 11px;
  }

  .camada-inputs {
    flex-wrap: wrap;
  }

  .camada-dropdown {
    flex: 1;
    min-width: 100px;
  }
}

@media (max-width: 480px) {
  .main-section {
    width: 95%;
  }

  h1 {
    font-size: 18px;
  }

  h3 {
    font-size: 14px;
  }

  .form-group {
    padding: 12px;
  }

  .cake-container {
    min-height: 300px;
  }

  .modal-buttons {
    flex-direction: column;
  }

  .btn-copy,
  .btn-close {
    width: 100%;
  }

  .button-group-inline button {
    flex: 1;
    min-width: 50px;
  }

  .camada-inputs {
    flex-direction: column;
  }

  .camada-dropdown {
    width: 100%;
  }
}

/* ============================================================================
   ESTILOS ADICIONAIS
   ============================================================================ */

input:focus,
textarea:focus,
select:focus {
  outline: 1px solid var(--primary-color);
}

input::placeholder,
textarea::placeholder {
  padding: 10px;
  font-size: 14px;
  color: #999;
}
.resumo {
  width: 70%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: auto;
  margin-bottom: 10%;
}

.resumo-left,
.resumo-image-aside {
  flex: 1;
}
.resumo-left{
  background-color: #e0e0e010;
  border: 1px solid #5a5a5a18;
  padding: 30px;
  border-radius: 15px;
}
.resumo-image-aside {
  height: 100%;
  flex-shrink: 0;
}

.image-drop {
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 350px;
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  background: #e7e7e7c9;
}

.image-drop input {
  display: none;
}

.image-drop span {
  color: #777;
  font-size: 14px;
}

.image-drop img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
