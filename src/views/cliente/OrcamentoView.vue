<script setup>
import { ref } from 'vue'
import { useViaCep } from '@/composables/viaCep'
import { useOrcamentosStore } from '@/stores/orcamentos'
const { endereco, buscarCep, carregando, erro } = useViaCep()
import { watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()


const useOrcamento = useOrcamentosStore()



// Atualiza o local sempre que o endereco mudar

const orcamento = ref({
  email: auth.user.email,
  data: '',
  horario: '',
  qtdPessoas: Number,
  local: {},
  bebidaAlcoolica: false,
  sobremesa: false,
  foto: '',
})

const local = ref({
  cep: '',
  cidade: '',
  bairro: '',
  rua: '',
  numero: '',
})
watch(endereco, (novo) => {
  if (!novo) return
  local.value.cidade = novo.cidade
  local.value.bairro = novo.bairro
  local.value.rua = novo.rua
})
const aberto = ref(false)
const qtdBolokgp = ref()
const erroForm = ref('')

function QtdBolo() {
  const qdtboloPessoa = ref()
  if (!orcamento.value.bebidaAlcoolica) {
    qdtboloPessoa.value = 95
  } else if (orcamento.value.bebidaAlcoolica && orcamento.value.sobremesa) {
    qdtboloPessoa.value = 70
  } else if (orcamento.value.sobremesa) {
    qdtboloPessoa.value = 70
  } else {
    qdtboloPessoa.value = 80
  }

  qtdBolokgp.value = (qdtboloPessoa.value * orcamento.value.qtdPessoas) / 1000
}

function Calcular() {
  erroForm.value = ''

  // 🔍 checa se os campos principais do outro form estão preenchidos
  if (!orcamento.value.data || !orcamento.value.horario || !orcamento.value.qtdPessoas) {
    erroForm.value = 'Por favor, preencha data, horário e quantidade de pessoas antes de calcular.'
    return
  }

  const qtd = Number(orcamento.value.qtdPessoas)
  if (isNaN(qtd) || qtd <= 0) {
    erroForm.value = 'Digite uma quantidade de pessoas válida.'
    return
  }

  // se passou na validação, faz o cálculo
  QtdBolo()
  aberto.value = true
}


function montarPayload() {
  return {
    data: orcamento.value.data,
    qtnPessoas: Number(orcamento.value.qtdPessoas),
    local: local.value.cidade || '', // backend quer só string
    bebidaAlcoolica: Boolean(orcamento.value.bebidaAlcoolica),
    sobremesa: Boolean(orcamento.value.sobremesa),
    usuario: auth.user.id, // objeto completo
    foto: [] // por enquanto vazio
  }
}
async function Enviar() {
  try {
    const payload = montarPayload()

    await useOrcamento.salvarOrcamento(payload)

    alert('Orçamento enviado com sucesso!')

    orcamento.value = {
      data: '',
      horario: '',
      qtdPessoas: '',
      bebidaAlcoolica: false,
      sobremesa: false,
      foto: ''
    }

    local.value = {
      cep: '',
      cidade: '',
      bairro: '',
      rua: '',
      numero: ''
    }

    aberto.value = false

  } catch (e) {
    console.error(e)
    alert('Erro ao enviar orçamento.')
  }
}

function scrollParaOrcamento() {
  const secao = document.getElementById('orcamento')
  if (secao) {
    secao.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="sombra">
    <h1 class="frase" v-motion-slide-visible-once-bottom :delay="300" :duration="500">Torne seu momento ainda mais
      especial</h1>
    <button @click="scrollParaOrcamento" v-motion-slide-visible-once-bottom :delay="600" :duration="500">Faça seu
      orçamento</button>
  </div>
  <section class="fotosContent">
    <div class="fotos">
      <img src="/src/assets/imagens/imgcasamento1.png" alt="" />
    </div>
    <div class="fotos fotoflex">
      <div class="fotomenor fotorow">
        <div><img src="/src/assets/imagens/imgcasamento2.png" alt="" /></div>
        <div><img src="/src/assets/imagens/imgcasamento4.png" alt="" /></div>
      </div>
      <div class="fotomenor">
        <img src="/src/assets/imagens/imgcasamento3.png" alt="" />
      </div>
    </div>
  </section>

  <section class="orcamento" id="orcamento">
    <div class="dadosOrcamento" v-motion-slide-visible-once-bottom :delay="400" :duration="550">
      <div class="orcamento-div1"><img src="/src/assets/imagens/fotoorcamento1.png" alt="" /></div>
      <div class="orcamento-div2">
        <div class="titulo">
          <img src="/src/assets/imagens/hearts.svg" alt="" />
          <h1>Orçamento</h1>
        </div>

        <form class="form-orcamento">
          <div class="flex">
            <label>Email:</label>
            <input type="email" placeholder="Ex.: julia@gmail" required v-model="orcamento.email" />
          </div>

          <div class="linha">
            <div class="flex">
              <label>Data:</label>
              <input type="date" required v-model="orcamento.data" />
            </div>
            <div class="flex">
              <label>Horário:</label>
              <input type="time" placeholder="Ex.: 16:30" required v-model="orcamento.horario" />
            </div>
            <div class="flex">
              <label>Quantidade de convidados:</label>
              <input type="number" required v-model="orcamento.qtdPessoas" />
            </div>
          </div>
          <div class="content-radio">
            <p class="pergunta">Serão servidas bebidas alcoólicas além dos docinhos?</p>

            <div class="radio-group">
              <label><input type="radio" name="alcool" v-model="orcamento.bebidaAlcoolica"
                  :checked="orcamento.bebidaAlcoolica" />
                Sim</label>
              <label><input type="radio" name="alcool" /> Não</label>
            </div>
          </div>
          <div class="content-radio">
            <p class="pergunta">Será servido sobremesa além dos docinhos?</p>

            <div class="radio-group">
              <label><input type="radio" name="sobremesa" v-model="orcamento.sobremesa"
                  :checked="orcamento.sobremesa" />
                Sim</label>
              <label><input type="radio" name="sobremesa" /> Não</label>
            </div>
          </div>
          <div class="upload">
            <label>Fotos da ideia inicial do bolo:</label>
            <div class="upload-btn">
              <input type="file" id="file" hidden />
              <label for="file" class="botao-arquivo">Selecionar arquivos</label>
            </div>
          </div>

          <p class="inspiracao">
            Precisando de inspiração para o bolo? Confira nossa
            <RouterLink to="/atelie">Galeria </RouterLink>
          </p>
        </form>
      </div>
    </div>
    <div>
      <div class="localOrcamento" v-motion-slide-visible-once-bottom :delay="400" :duration="550">
        <div class="orcamento-div2">
          <div class="titulo">
            <img src="/src/assets/imagens/local.svg" alt="" />
            <h3>Local do Casamento</h3>
          </div>

          <form class="form-orcamento">
            <div class="localInputs">
              <div class="flex flexmenor">
                <label>Cep:</label>
                <input type="text" placeholder="________" required v-model="local.cep" maxlength="8"
                  @blur="buscarCep(local.cep)" />
                <p v-if="erro" class="mensagem-erro">{{ erro }}</p>
              </div>
              <div class="flex flexmaior">
                <label>Cidade:</label>
                <input type="text" placeholder="Ex.: Joinville" required v-model="local.cidade" />
              </div>
            </div>
            <div class="localInputs">
              <div class="flex flexmenor">
                <label>Bairro:</label>
                <input type="text" placeholder="Ex.: Vila Nova" required v-model="local.bairro" />
              </div>
              <div class="flex flexmaior">
                <label>Rua:</label>
                <input type="text" placeholder="Ex.: Carlos da Oliveira" required v-model="local.rua" />
              </div>
            </div>
            <div class="localInputs">
              <div class="flex flexmenor">
                <label>Número:</label>
                <input type="number" placeholder="Ex.: 1005" required v-model="local.numero" />
              </div>
            </div>
            <div class="button">
              <button type="button" @click="Calcular()">Calcular quantidade de bolo</button>
            </div>
            <p v-if="erroForm" class="erro">{{ erroForm }}</p>
          </form>
        </div>
        <div class="orcamento-div1">
          <img src="/src/assets/imagens/fotoorcamento2.png" alt="" />
        </div>
      </div>
    </div>
  </section>
  <div class="overlay-popup" v-if="aberto">
    <div class="popup">
      <h2>Possível quantidade de bolo para a sua festa para {{ orcamento.qtdPessoas }} pessoas!</h2>
      <img src="/src/assets/imagens/bolo-de-casamento.gif" alt="">
      <h2>{{ qtdBolokgp }} kg de bolo</h2>
      <p>Para mais informações entre em contato +55 47 99288-4976</p>
      <div class="buttons">
        <button class="buttonPop" @click="aberto = false">Cancelar</button>
        <button class="buttonPop" @click="Enviar()">Enviar Orçamento</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.erro {
  color: #c00;
  margin-top: 8px;
  font-size: 14px;
  text-align: center;
}

.overlay-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* escurece o fundo */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

/* caixa do popup */
.popup {
  background-color: #fff;
  padding: 2rem;
  border-radius: 20px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease;
}

.popup img {
  width: 30%;
}

/* botão */
.popup .buttonPop {
  background-color: #d18ee2;
  /* lilás */
  border: none;
  color: white;
  padding: 10px 25px;
  border-radius: 30px;
  font-weight: 600;
  margin-top: 15px;
  cursor: pointer;
  transition: 0.3s;
}

.popup .buttonPop:hover {
  background-color: #b46bcc;
  transform: scale(1.05);
}

.buttons {
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: center;
}

/* animação de entrada */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

h3 {
  color: #191645;
}

.fotosContent {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 90vh;
}

.fotos {
  width: 50%;
}

.fotoflex {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.fotomenor {
  height: 50%;
}

.fotorow {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.fotorow div {
  width: 50%;
}

.fotosContent img {
  width: 100%;
  height: 100%;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

.sombra {
  position: absolute;

  width: 100%;
  height: 90vh;
  background-color: rgba(8, 8, 8, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.frase {
  width: 35vw;
  color: white;
  font-size: 36px;
  text-align: center;
  font-weight: 700;
  letter-spacing: 1px;
}

.sombra button {
  background-color: #bf99c8f4;
  color: white;
  font-weight: 700;
  font-size: 16px;
  border: none;
  border-radius: 50px;
  padding: 15px 30px;
  cursor: pointer;
  transition: 0.3s ease;
  display: inline-block;
  text-align: center;
}

.button {
  display: flex;
  justify-content: center;
  width: 100%;
}

.orcamento button {
  background-color: #f2a1f8;
  color: white;
  font-weight: 700;
  font-size: 16px;
  border: none;
  border-radius: 50px;
  padding: 15px 30px;
  cursor: pointer;
  transition: 0.3s ease;
  display: inline-block;
  text-align: center;
  width: 300px;
}

.orcamento {
  width: 80%;
  margin: auto;
  margin-top: 100px;
}

.orcamento-div1 {
  width: 30%;
}

.orcamento-div2 {
  width: 70%;
}

.orcamento img {
  border-top-left-radius: 200px;
  border-top-right-radius: 200px;
  height: 60vh;
}

.orcamento .titulo h1 {
  text-align: center;
  font-size: 24px;
}

.dadosOrcamento,
.localOrcamento {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 50px 0 100px 0;
}

.form-orcamento {
  color: #1e1e1e;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 90%;
  margin: auto;
}

label {
  font-weight: 600;
}

input[type='text'],
input[type='email'],
input[type='date'],
input[type='time'],
input[type='number'] {
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 5px 5px 5px 10px;
  width: 100%;
  outline: none;
  font-family: inherit;
}

.linha,
.localInputs {
  width: 100%;
  display: flex;
  gap: 40px;
}

.linha input {
  width: 100px;
}

.localInputs {
  width: 100%;
}

.localInputs .flexmenor {
  width: 30%;
}

.localInputs .flexmaior {
  width: 70%;
}

.mensagem-erro {
  color: #e63946;
  background-color: #ffe5e9;
  border: 1px solid #f5c2c7;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-top: 6px;
  display: inline-block;
}

.pergunta {
  font-weight: 600;
  margin-top: 10px;
}

.radio-group {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.radio-group input[type='radio'] {
  accent-color: #d18ee2;
  cursor: pointer;
}

.upload {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.botao-arquivo {
  background-color: #f2a1f8;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  cursor: pointer;
  transition: 0.3s;
}

.botao-arquivo:hover,
.button button:hover {
  background-color: #d18ee2;
}

.inspiracao {
  font-weight: 500;
  margin-top: 1rem;
}

.inspiracao a {
  color: #3a1460;
  font-weight: 700;
  text-decoration: none;
}

.inspiracao a:hover {
  text-decoration: underline;
}

.content-radio {
  display: flex;
  gap: 20px;
}

.flex {
  display: flex;
}

.titulo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  flex-direction: row;
  margin-bottom: 60px;
}

.titulo img {
  width: 30px;
  height: 30px;
}

@media (max-width: 1500px) {

  .orcamento {
    width: 90%;
  }

}

@media (max-width: 1300px) {
  .orcamento-div1 img {
    display: none;
  }

  .dadosOrcamento,
  .localOrcamento {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 30px 0 60px 0;
  }

  .linha,
  .localInputs {
    width: 100%;
    flex-direction: column;
  }

  .orcamento-div2 {
    width: 100%;
  }

  .form-orcamento {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    margin: auto;
  }

  .localInputs .flexmenor {
    width: 100%;
  }

  .localInputs .flexmaior {
    width: 100%;
  }

  .linha input {
    width: 100%;
  }

}

@media (max-width: 900px) {
  .fotosContent {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
  }

  .titulo {
    margin-bottom: 40px;
  }

  .fotos {
    display: none;
  }

  .fotoflex {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .fotomenor {
    height: 50%;
    display: none;
  }

  .fotorow {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .fotorow div {
    width: 100%;
    height: 100%;
  }

  .fotosContent img {
    width: 100%;
    height: 100%;
  }

  .frase {
    width: 70vw;
    font-size: 28px;
  }

  .orcamento {
    margin-top: 60px;
    width: 80%;
  }

  .popup {
    max-width: 300px;
  }

  .popup h2 {
    font-size: 20px;
  }

}
</style>
