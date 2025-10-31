<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router' // Adicionado para navegação
import inputAplicarComp from './InputAplicarComp.vue'
import { useCartStore } from '@/stores/carrinhoStore'

const router = useRouter() // Instância do router

const props = defineProps({
  nome: String,
  descricao: String,
  sabor: String,
  preco: [String, Number],
  id: Number,
  image: [Array, Object, String],
  estrelas: Number,
  tamanhos: Array
})

const carrinho = useCartStore()
const visibleAddCart = ref(false)
const tamanhoSelecionado = ref(null)

// 🧮 Preço formatado (faixa)
const precoFormatado = computed(() => {
  if (props.tamanhos?.length) {
    const precos = props.tamanhos.map(t => Number(t.preco))
    const min = Math.min(...precos)
    const max = Math.max(...precos)
    if (min === max) return `R$ ${min.toFixed(2).replace('.', ',')}`
    return `R$ ${min.toFixed(0)} - ${max.toFixed(0)}`
  }
  return `R$ ${Number(props.preco || 0).toFixed(2).replace('.', ',')}`
})

// 🛒 Adicionar ao carrinho
function addToCart() {
  if (!tamanhoSelecionado.value) {
    alert('Selecione um tamanho antes de adicionar ao carrinho!')
    return
  }

  const tamanhoObj = props.tamanhos.find(
    t => t.tamanho_nome === tamanhoSelecionado.value
  )

  const produto = {
    id: `${props.id}-${tamanhoSelecionado.value}`,
    nome: `${props.nome} (${tamanhoSelecionado.value})`,
    preco: Number(tamanhoObj.preco),
    foto_url:
      typeof props.image === 'string'
        ? props.image
        : props.image?.[0]?.url || '',
    quantidade: 1,
    tamanho: tamanhoSelecionado.value,
    sabor: props.sabor
  }

  carrinho.addItem(produto)
  visibleAddCart.value = true
  // Dura 2500ms, mas pode ser fechado manualmente
  setTimeout(() => (visibleAddCart.value = false), 2500)
}

// Fechar modal
function fecharModal() {
  visibleAddCart.value = false
}

// Ir para carrinho
function irParaCarrinho() {
  fecharModal()
  router.push('/carrinho')
}

// 💖 Comprar agora
function comprar() {
  alert(`Você comprou o produto "${props.nome}"`)
}
</script>

<template>
  <div class="informacoes">
    <!-- Nome e sabor -->
    <span class="nome">
      {{ nome }}
      <span class="sabor">- {{ sabor }}</span>
    </span>

    <!-- Descrição -->
    <p class="descricao">{{ descricao }}</p>
    <!-- Selecionar tamanho -->
    <div v-if="tamanhos?.length" class="seletor-tamanho">
      <select id="tamanho" v-model="tamanhoSelecionado">
        <option disabled value="">Escolha...</option>
        <option
          v-for="t in tamanhos"
          :key="t.tamanho_nome"
          :value="t.tamanho_nome"
        >
          {{ t.tamanho_nome }} - R$ {{ Number(t.preco).toFixed(2).replace('.', ',') }}
        </option>
      </select>
    </div>
    <!-- Estrelas -->
    <div class="estrelas">
      <div v-for="i in 5" :key="i">
        <svg width="20" height="20" viewBox="0 0 286 272" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M143 0L176.677 103.647H285.658L197.491 167.705L231.168 271.353L143 207.295L54.8322 271.353L88.5093 167.705L0.341522 103.647H109.323L143 0Z"
            :fill="i <= estrelas ? '#F4AA09' : '#D9D9D9'"
          />
        </svg>
      </div>
      <span>{{ estrelas?.toFixed(1) || '0.0' }}</span>
    </div>

    <!-- Preço -->
    <span class="preco">{{ precoFormatado }}</span>

    <!-- Calcular frete -->
    <inputAplicarComp
      class="frete"
      type="1"
      titulo="Calcular Frete"
      tituloBotao="Inserir CEP"
      inputPlaceholder="Insira seu CEP"
    />

    <!-- Botões -->
    <button class="button-comprar" @click="comprar">Comprar</button>
    <button class="button-add" @click="addToCart">Adicionar ao carrinho</button>

    <!-- Modal de notificação -->
    <transition name="fade">
      <div v-if="visibleAddCart" class="modal-overlay" @click="fecharModal">
        <div class="modal-content" @click.stop>
          <button class="close-btn" @click="fecharModal">&times;</button>
          <div class="modal-body">
            <h2>Produto Adicionado!</h2>
            <p>{{ nome }} ({{ tamanhoSelecionado }}) foi adicionado ao seu carrinho.</p>
            <button class="btn-carrinho" @click="irParaCarrinho">Ir para Carrinho</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.informacoes {
  display: flex;
  flex-direction: column;
  width: 35vw;
}

.nome, .sabor {
  font-size: 26px;
  font-weight: 600;
  color: #2b2b2b;
}

.descricao {
  margin: 5px 0 15px;
  font-size: 15px;
  color: black;
}

.estrelas {
  display: flex;
  align-items: center;
}

.estrelas span {
  margin: 10px;
}

.preco {
  font-weight: 600;
  font-size: 28px;
  margin: 20px 0 0px;
  color: #2b2b2b;
}

/* Seletor no estilo do CEP */
.seletor-tamanho {
  width: 50%;
  margin-bottom: 5px;
}

.seletor-tamanho label {
  display: block;
  font-weight: 500;
  margin-bottom: 6px;
  color: #333;
}

.seletor-tamanho select {
  width: 100%;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  background-color: transparent;
  font-size: 15px;
  transition: border-color 0.3s;
}

.seletor-tamanho select:focus {
  border-bottom-color: #a874b5;
}

/* Botões Santa Dallah */
.button-comprar {
  border-radius: 25px;
  height: 45px;
  color: white;
  background-color: #BF99C8;
  border: none;
  font-weight: 500;
  margin: 20px 0 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button-add {
  background-color: transparent;
  border-radius: 25px;
  height: 45px;
  color: #BF99C8;
  font-weight: 500;
  border: 2px solid #BF99C8;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button-comprar:hover,
.button-add:hover {
  transform: translateY(3px);
  opacity: 0.9;
}

/* Modal */
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

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #BF99C8;
}

.modal-body {
  text-align: center;
}

.modal-body h2 {
  color: #4d2c6c;
  margin-bottom: 10px;
}

.modal-body p {
  color: #333;
  margin-bottom: 20px;
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
}

.btn-carrinho:hover {
  transform: translateY(2px);
  opacity: 0.9;
}

/* Transição */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .informacoes {
    width: 100%;
    padding: 30px;
  }
}
</style>