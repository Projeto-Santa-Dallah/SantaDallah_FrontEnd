<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { useCartStore } from "@/stores/carrinhoStore";
import { usePagamentoStore } from "@/stores/pagamentoStore";

// Stores
const carrinho = useCartStore();
const pagamentoStore = usePagamentoStore();

// Estados
const isLoading = ref(false);
const preferenceId = ref(null);
const frete = ref(0);

// Cálculos
const subtotal = computed(() =>
  carrinho.itens.reduce((total, item) => total + item.preco * item.quantidade, 0)
);
const total = computed(() => subtotal.value + frete.value);

// Função para renderizar o botão do Mercado Pago
function renderMercadoPagoButton(prefId) {
  const mp = new window.MercadoPago("APP_USR-b2ad37f2-01f8-4ed9-b5be-7ddb974c6eb0", {
    locale: "pt-BR",
  });

  const bricksBuilder = mp.bricks();
  bricksBuilder.create("wallet", "wallet_container", {
    initialization: { preferenceId: prefId },
  });
}

// Função para criar a preferência
async function criarPreferencia() {
  try {
    isLoading.value = true;

    const orderData = {
      title: "Compra na Santa Dallah",
      quantity: carrinho.itens.length,
      price: total.value,
    };

    const response = await axios.post(
      "https://backend-api-mercadopago.onrender.com/create_preference",
      orderData,
      { headers: { "Content-Type": "application/json" } }
    );

    preferenceId.value = response.data.id;
    renderMercadoPagoButton(preferenceId.value);
  } catch (err) {
    console.error("Erro ao criar preferência:", err);
    alert("Erro ao criar pagamento. Tente novamente.");
  } finally {
    isLoading.value = false;
  }
}

// Ao montar o componente, carrega o SDK e cria a preferência
onMounted(async () => {
  await loadMercadoPago(); // 🔥 ESSENCIAL
  await criarPreferencia();
});
</script>

<template>
  <div class="pagamento-container">
    <div class="detalhes">
      <h2>Resumo do Pedido</h2>

      <div class="itens">
        <div v-for="item in carrinho.itens" :key="item.id" class="item">
          <span>{{ item.nome }} ({{ item.quantidade }}x)</span>
          <span>R$ {{ (item.preco * item.quantidade).toFixed(2).replace('.', ',') }}</span>
        </div>
      </div>

      <div class="valores">
        <div><span>Subtotal</span><span>R$ {{ subtotal.toFixed(2).replace('.', ',') }}</span></div>
        <div><span>Frete</span><span>R$ {{ frete.toFixed(2).replace('.', ',') }}</span></div>
        <div class="total"><span>Total</span><span>R$ {{ total.toFixed(2).replace('.', ',') }}</span></div>
      </div>

      <div id="wallet_container" class="botao-pagamento"></div>
    </div>

    <div v-if="isLoading" class="loading">
      <img src="@/assets/loading.gif" alt="Carregando..." />
    </div>
  </div>
</template>

<style scoped>
.pagamento-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  padding: 20px;
}

.detalhes {
  background: #fff8fc;
  border-radius: 20px;
  padding: 40px;
  width: 400px;
  box-shadow: 0 0 15px rgba(240, 186, 244, 0.3);
  font-family: "Poppins", sans-serif;
}

h2 {
  color: #d47dd6;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}

.itens {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.item {
  display: flex;
  justify-content: space-between;
}

.valores div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.total {
  font-weight: 600;
  color: #b85cc6;
  margin-top: 10px;
}

.botao-pagamento {
  margin-top: 30px;
}

.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.loading img {
  width: 150px;
}

@media (max-width: 768px) {
.pagamento-container {
  min-height: 70vh;
}

}
</style>
