<script setup>
import { useCartStore } from '@/stores/carrinhoStore'
import { ref } from 'vue'

const cart = useCartStore()
const pagamento = ref('online') // "online" ou "entrega"

defineProps({
  superior: String,
  inferior: String,
})

const formatar = valor => valor.toFixed(2).replace('.', ',')
</script>

<template>
  <div class="resumo">
    <h2 class="resumo-titulo" :class="superior">Total do pedido</h2>

    <!-- Escolha de entrega -->
    <div class="entrega-opcao">
      <label>
        <input type="radio" value="retirada" v-model="cart.tipoEntrega" />
        Retirar na loja
      </label>
      <label>
        <input type="radio" value="entrega" v-model="cart.tipoEntrega" />
        Entrega com frete
      </label>
    </div>

    <!-- Campo de CEP -->
    <div v-if="cart.tipoEntrega === 'entrega'" class="cep-area">
      <input
        type="text"
        placeholder="Digite seu CEP"
        v-model="cart.cep"
        maxlength="9"
      />
      <button class="botao-secundario" @click="cart.calcularFrete">
        Calcular frete
      </button>
    </div>

    <!-- Resumo de valores -->
    <div class="resumo-info" :class="superior">
      <div class="valor">
        <span class="nome-valor">Subtotal</span>
        <span>R$ {{ formatar(cart.valorNoCarrinho) }}</span>
      </div>

      <div class="valor">
        <span class="nome-valor">Frete</span>
        <span>R$ {{ formatar(cart.valorFrete) }}</span>
      </div>

      <div class="valor valor-total">
        <span class="nome-valor">Total</span>
        <span>R$ {{ formatar(cart.valorFinal) }}</span>
      </div>
    </div>

    <!-- Tipo de pagamento -->
    <div class="pagamento-opcao">
      <label>
        <input type="radio" value="online" v-model="pagamento" />
        Pagar agora (Mercado Pago)
      </label>
      <label>
        <input type="radio" value="entrega" v-model="pagamento" />
        Pagar na entrega
      </label>
    </div>

    <!-- Botões -->
    <div class="botoes">
      <router-link
        v-if="pagamento === 'online'"
        to="/pagamento"
        class="botao-principal"
      >
        Finalizar compra
      </router-link>

      <button
        v-else
        class="botao-principal"
        @click="alert('Pedido confirmado! Pagamento será feito na entrega.')"
      >
        Confirmar pedido
      </button>
    </div>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
}
.resumo {
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  font-family: 'Poppins', sans-serif;
  color: black;
  align-items: center;
}

.resumo-titulo {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
}

.nome-valor {
  font-weight: 400;
}

.resumo-info {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
}

.valor {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #a1a1a1;
  padding-bottom: 5px;
  font-weight: 500;
}

.valor-total {
  font-weight: 600;
  padding-top: 10px;
  border-bottom: none;
}

.entrega-opcao,
.pagamento-opcao {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 15px;
}

.entrega-opcao label,
.pagamento-opcao label {
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.cep-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 300px;
  margin-bottom: 20px;
}

.cep-area input {
  width: 250px;
  height: 40px;
  border: none;
  border-bottom: 1px solid #191645;
  padding: 0 15px;
  outline: none;
  text-align: center;
  font-size: 14px;
}

.frete-gratis {
  color: rgb(168, 194, 128);
  font-weight: 500;
}

.botoes {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  align-items: center;
}

.botao-secundario,
.botao-principal {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 45px;
  border-radius: 50px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 580;
}

.botao-secundario {
  border: 1px solid #191645;
  background-color: transparent;
  color: #191645;
}

.botao-secundario:hover {
  background-color: #f4f4f4;
}

.botao-principal {
  border: none;
  background-color: #191645;
  color: white;
}

.botao-principal:hover {
  transform: translateY(-3px);
  opacity: 0.9;
}

/* Estilização do radio button */
input[type="radio"] {
  accent-color: #191645;
}

@media (max-width: 768px) {
  .resumo {
    margin-top: 50px;
  }

  .resumo-info,
  .botao-secundario,
  .botao-principal,
  .entrega-opcao,
  .cep-area,
  .pagamento-opcao {
    width: 90%;
  }
}
</style>