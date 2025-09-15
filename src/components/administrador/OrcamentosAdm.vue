<script setup>
import { ref } from 'vue'
import OrcamentoAdm from './OrcamentoAdm.vue'
import DescricaoOrcamento from './DescricaoOrcamento.vue'

const descricaoAberta = ref(false)
const idSelecionado = ref(0)

// Dados mockados para orçamentos
const orcamentos = [
  {
    id: 1,
    usuario: { id: 7, nome: "Isabelli Luísa", email: "isa@example.com" },
    data: "2025-10-10",
    qtnPessoas: 20,
    local: "Buffet",
    bebidaAlcoolica: true,
    docinhos: false,
    foto: [],
  },
  {
    id: 2,
    usuario: { id: 8, nome: "João Pedro", email: "joao@example.com" },
    data: "2025-11-05",
    qtnPessoas: 10,
    local: "Casa",
    bebidaAlcoolica: false,
    docinhos: true,
    foto: [],
  }
]

function openDescricao(id) {
  descricaoAberta.value = true
  idSelecionado.value = id
}
function fecharDescricao() {
  descricaoAberta.value = false
}
</script>

<template>
  <div v-if="!descricaoAberta" class="orcamentos">
    <div class="orcamentos-header">
      <div class="header">
        <h1 class="titulo-orcamentos">Orçamentos</h1>
        <span>({{ orcamentos.length }} encontrados)</span>
      </div>
    </div>
    <div class="orcamento" v-for="orcamento in orcamentos" :key="orcamento.id">
      <OrcamentoAdm
        :id="orcamento.id"
        :cliente="orcamento.usuario.nome"
        :data="orcamento.data"
        :qtnPessoas="orcamento.qtnPessoas"
        :local="orcamento.local"
        :bebidaAlcoolica="orcamento.bebidaAlcoolica"
        :docinhos="orcamento.docinhos"
        @open="openDescricao"
      />
    </div>
  </div>
  <div class="descricao" v-else>
    <DescricaoOrcamento @fechar="fecharDescricao" :id="idSelecionado" :orcamentos="orcamentos" />
  </div>
</template>

<style scoped>
.orcamentos, .descricao {
  display: flex;
  flex-direction: column;
  padding: 0px 7vw 0px 50px;
  width: 71vw;
  margin-bottom: 100px;
}
.orcamento {
  width: 100%;
  padding: 5px 0;
}
span {
  color: #bf99c8;
  font-size: 16px;
}
h1 {
  margin-right: 10px;
  color: #191645;
  font-size: 24px;
}
.header {
  display: flex;
  align-items: center;
}
</style>