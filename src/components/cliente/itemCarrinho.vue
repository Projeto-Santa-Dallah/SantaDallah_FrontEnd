<script setup>
import { ref, defineProps, computed } from 'vue'
import { useCartStore } from '@/stores/carrinhoStore'

const props = defineProps({
  img: String,
  nome: String,
  preco: Number,
  id: Number,
  quantidade: Number,
  sabor: String,
  tamanho: String
})

const carrinho = useCartStore()

function getProductById(id) {
  return produtos.value.find(p => p.id === id)
}

function addToCart() {
  const produto = getProductById(props.id)
  if (produto) carrinho.addItem(produto)
}

function removeFromCart() {
  carrinho.removeItem(props.id)
}
</script>

<template>
  <div class="itens">
    <div class="item">
      <img class="item-img" :src="img" alt="Imagem do produto" />
      <div class="item-info">
        <div class="item-titulos">
          <span class="item-nome">
            {{ nome }} – {{ sabor }}
          </span>
          <span class="item-tamanho">
            Tamanho – {{ tamanho || 'P' }}
          </span>
        </div>

        <span class="item-valor">R$ {{ preco.toFixed(2).replace('.', ',') }}</span>

        <div class="item-quantidade">
          <svg
            v-if="quantidade < 2"
            @click="removeFromCart"
            class="icon"
            width="17"
            height="22"
            viewBox="0 0 17 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.8333 5V4.2C11.8333 3.0799 11.8333 2.51984 11.6517 2.09202C11.4919 1.71569 11.2369 1.40973 10.9233 1.21799C10.5668 1 10.1001 1 9.16667 1H7.83333C6.89991 1 6.4332 1 6.07668 1.21799C5.76308 1.40973 5.50811 1.71569 5.34832 2.09202C5.16667 2.51984 5.16667 3.0799 5.16667 4.2V5M6.83333 10.5V15.5M10.1667 10.5V15.5M1 5H16M14.3333 5V16.2C14.3333 17.8802 14.3333 18.7202 14.0608 19.362C13.8212 19.9265 13.4387 20.3854 12.9683 20.673C12.4335 21 11.7335 21 10.3333 21H6.66667C5.26654 21 4.56647 21 4.03169 20.673C3.56129 20.3854 3.17883 19.9265 2.93915 19.362C2.66667 18.7202 2.66667 17.8802 2.66667 16.2V5"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span v-else class="icon" @click="removeFromCart">-</span>

          {{ quantidade }}

          <span @click="addToCart" class="icon">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  width: 700px;
  border-bottom: 1px solid #a1a1a150;
  display: flex;
  gap: 30px;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.item-img {
  height: 200px;
  width: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.item-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

.item-titulos {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-nome {
  font-weight: 500;
  font-size: 18px;
}

.item-tamanho {
  font-size: 14px;
  color: #555;
}

.item-valor {
  font-size: 20px;
  font-weight: 600;
}

.item-quantidade {
  user-select: none;
  display: flex;
  align-items: center;
  gap: 10px;
}

.item-quantidade .icon {
  cursor: pointer;
  font-weight: bold;
}

@media (max-width: 768px) {
  .item {
    width: 100%;
    gap: 10px;
  }

  .item-img {
    width: 150px;
    height: 150px;
  }

  .item-nome {
    font-size: 16px;
  }

  .item-tamanho {
    font-size: 13px;
  }

  .item-valor {
    font-size: 16px;
  }
}
</style>
