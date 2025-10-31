<script setup>
import { ref, computed } from 'vue'

// 🧩 Array fake de comentários (simulando dados do backend)
const comentarios = ref([
  {
    id: 1,
    usuario: {
      nome: 'Mariana Alves',
      foto: 'https://i.pravatar.cc/100?img=1'
    },
    nota: 5,
    comentario: 'Simplesmente perfeito! A torta estava maravilhosa e super fresca!',
    produtoId: 1
  },
  {
    id: 2,
    usuario: {
      nome: 'Lucas Ferreira',
      foto: 'https://i.pravatar.cc/100?img=2'
    },
    nota: 4,
    comentario: 'Muito bom! Poderia ser um pouquinho mais doce, mas adorei o sabor.',
    produtoId: 1
  },
  {
    id: 3,
    usuario: {
      nome: 'Ana Paula',
      foto: 'https://i.pravatar.cc/100?img=3'
    },
    nota: 3,
    comentario: 'Gostei, mas a massa estava um pouco seca desta vez.',
    produtoId: 2
  }
])

// ⭐ Tradução de nota → texto
function textoNota(nota) {
  if (nota <= 1) return 'Ruim'
  if (nota === 2) return 'Regular'
  if (nota === 3 || nota === 4) return 'Bom'
  if (nota === 5) return 'Excelente'
  return ''
}

// 🧮 Controle do botão "ver mais"
const mostrarTodos = ref(false)
const comentariosVisiveis = computed(() =>
  mostrarTodos.value ? comentarios.value : comentarios.value.slice(0, 2)
)

// 🧡 Controle do formulário de novo comentário
const openAdd = ref(false)
const novaNota = ref(0)
const novoComentario = ref('')
const produtoId = ref(1) // exemplo: fixo por enquanto

function adicionarComentario() {
  if (novaNota.value > 0 && novoComentario.value.trim() !== '') {
    comentarios.value.push({
      id: comentarios.value.length + 1,
      usuario: {
        nome: 'Usuário Teste',
        foto: 'https://i.pravatar.cc/100?img=10'
      },
      nota: novaNota.value,
      comentario: novoComentario.value,
      produtoId: produtoId.value
    })
    openAdd.value = false
    novaNota.value = 0
    novoComentario.value = ''
  }
}
</script>

<template>
  <section class="comentarios">
    <h1 class="titulo">Comentários</h1>

    <!-- Lista de comentários -->
    <div
      v-for="item in comentariosVisiveis"
      :key="item.id"
      class="comentario"
    >
      <div class="cabecalho">
        <img
          class="usuario-img"
          :src="item.usuario.foto"
          alt="Foto do usuário"
        />
        <span class="nome-usuario">{{ item.usuario.nome }}</span>
      </div>

      <div class="avaliacao">
        <span class="texto-nota">{{ textoNota(item.nota) }}</span>
        <div class="estrelas">
          <svg
            v-for="n in 5"
            :key="n"
            width="20"
            height="20"
            viewBox="0 0 286 272"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M143 0L176.677 103.647H285.658L197.491 167.705L231.168 271.353L143 207.295L54.8322 271.353L88.5093 167.705L0.341522 103.647H109.323L143 0Z"
              :fill="n <= item.nota ? '#F4AA09' : '#D9D9D9'"
            />
          </svg>
        </div>
      </div>

      <p class="texto-comentario">{{ item.comentario }}</p>
    </div>

    <!-- Botão Ver mais -->
    <div v-if="comentarios.length > 2" class="ver-mais">
      <button @click="mostrarTodos = !mostrarTodos">
        {{ mostrarTodos ? 'Ver menos' : 'Ver mais comentários' }}
      </button>
    </div>

    <!-- Botão para abrir o formulário -->
    <div class="adicionar" @click="openAdd = true">
      <button>+</button>
      <span>Faça seu comentário</span>
    </div>

    <!-- Modal de adicionar comentário -->
    <div v-if="openAdd" class="modal">
      <div class="container">
        <button class="fechar" @click="openAdd = false">×</button>

        <h3>Deixe sua avaliação</h3>

        <div class="estrelas-select">
          <svg
            v-for="n in 5"
            :key="n"
            width="30"
            height="30"
            viewBox="0 0 286 272"
            xmlns="http://www.w3.org/2000/svg"
            @click="novaNota = n"
            class="star"
          >
            <path
              d="M143 0L176.677 103.647H285.658L197.491 167.705L231.168 271.353L143 207.295L54.8322 271.353L88.5093 167.705L0.341522 103.647H109.323L143 0Z"
              :fill="n <= novaNota ? '#F4AA09' : '#D9D9D9'"
            />
          </svg>
        </div>

        <textarea
          v-model="novoComentario"
          placeholder="Escreva sua opinião..."
        ></textarea>

        <button class="enviar" @click="adicionarComentario">
          Adicionar Comentário
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.comentarios {
  margin: 80px auto;
  max-width: 800px;
  padding: 0 20px;
  font-family: 'Poppins', sans-serif;
}

.titulo {
  font-size: 22px;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 600;
}

.comentario {
  border-bottom: 1px solid #ddd;
  padding: 20px 0;
}

.cabecalho {
  display: flex;
  align-items: center;
  gap: 12px;
}

.usuario-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.nome-usuario {
  font-weight: 500;
}

.avaliacao {
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 12px;
}

.texto-nota {
  font-weight: 600;
}

.estrelas {
  display: flex;
}

.texto-comentario {
  margin-top: 10px;
  font-size: 15px;
  line-height: 1.4;
}

.ver-mais {
  text-align: left;
  margin-top: 15px;
}

.ver-mais button {
  background: none;
  border: none;
  color: #BF99C8;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
}

.adicionar {
  display: flex;
  align-items: center;
  margin-top: 30px;
  cursor: pointer;
}

.adicionar button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background-color: #BF99C8;
  color: white;
  font-size: 18px;
  margin-right: 10px;
}

.adicionar span {
  font-weight: 600;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.container {
  background: #fff;
  padding: 25px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  position: relative;
}

.fechar {
  position: absolute;
  top: 10px;
  right: 15px;
  border: none;
  background: none;
  font-size: 22px;
  cursor: pointer;
}

.estrelas-select {
  display: flex;
  justify-content: center;
  margin: 15px 0;
}

textarea {
  width: 100%;
  height: 100px;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 10px;
  resize: none;
  font-family: 'Poppins', sans-serif;
}

.enviar {
  margin-top: 15px;
  width: 100%;
  border: none;
  border-radius: 50px;
  background: #BF99C8;
  color: white;
  padding: 10px;
  font-weight: 500;
  cursor: pointer;
}
</style>
