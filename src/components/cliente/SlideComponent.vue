<script setup>
const props = defineProps({
  id: Number,
  nome: String,
  sabor: String,
  img: String,
  faixaPreco: String
})

function formatarPreco(numero) {
  return numero?.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
</script>

<template>
 <router-link :to="{ name: 'Produto', params: { id: id } }">
  <div class="tudo">
    <div class="img">
      <img :src="img" alt="Produto" />
    </div>
    <div class="informacoes">
      <span class="nome">{{ nome }}</span>
      <div class="estrelas">
        <div v-for="i in 5" :key="i">
          <svg
            width="20"
            height="20"
            viewBox="0 0 286 272"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M143 0L176.677 103.647H285.658L197.491 167.705L231.168 271.353L143 207.295L54.8322 271.353L88.5093 167.705L0.341522 103.647H109.323L143 0Z"
              :fill="i <= 5 ? '#F4AA09' : '#D9D9D9'"
            />
          </svg>
        </div>
          <span>5.0</span>
      </div>
      <span class="preco">{{ faixaPreco }}</span>
      <!-- <span class="sabor">{{ sabor }}</span> -->
    </div>
  </div>
</router-link>
</template>

<style scoped>
a{
  text-decoration: none;
  color: black;
}
.tudo {
  border: 1px solid #d9d9d9;
  border-radius: 25px;
  padding: 30px 30px;
  transition: 0.3s;
}
.tudo:hover {
  transform: translate3d(0, -3px, 0) scale(1.01);
  transition: 0.3s;
  box-shadow: 0 0 4px 1px #d9d9d9;
}
.img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: auto;
  height: 220px;
}
.img img {
  width: 220px;
  height: 220px;
  border-radius: 25px;
  margin-bottom: 20px;
  object-fit: cover;
  overflow: hidden;
}
.informacoes {
  text-align: left;
}
span {
  display: block;
  font-family: "Poppins", sans-serif;
}
.nome {
  height: 40px;
  font-size: 16px;
  font-weight: 500;
  line-height:17px
}
.sabor {
  font-size: 14px;
  color: #666;
}
.preco {
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  font-size: 18px;
}
.parcelas {
  font-size: 12px;
  color: #555;
}
.estrelas {
  display: flex;
  margin-top: 3px;
}
.estrelas span{
  margin-left: 5px;
}
@media (max-width: 768px) {
  .tudo {
    width: 180px;
    height: 100%;
    padding: 15px;
  }
  .img img {
    height: 60%;
  }
}
</style>
