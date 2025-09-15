<script setup>
import { ref, computed } from 'vue'
import { useTamanhoStore } from '@/stores/tamanhos';
const TamanhoStore = useTamanhoStore()
const props = defineProps({
    id: Number
})
const tamanhoselecionado = computed(() => {
    return TamanhoStore.tamanhos.find(p => p.id == props.id) || null
})

</script>
<template>
    <div class="tamanhos-header">

        <div class="header">
            <h1 class="titulo-tamanhos">Tamanho: {{ tamanhoselecionado.nome }}</h1>
            <button class="voltar" @click="$emit('fechar')"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9H16.5C18.9853 9 21 11.0147 21 13.5C21 15.9853 18.9853 18 16.5 18H12M3 9L7 5M3 9L7 13"
                        stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </div>
        <div class="descricao">
            <span class="titulo-info">Quantidade de fatias: </span><span>{{ tamanhoselecionado.qtdFatia }}</span>
        </div>
        <div class="descricao">
            <span class="titulo-info">Formato: </span><span>{{ tamanhoselecionado.formato }}</span>
        </div>
    </div>
</template>
<style scoped>
span {
    font-size: 16px;
}

.titulo-info {
    font-weight: 600;
}

.img {
    padding-top: 20px;
    padding-right: 20px;
}

.container-info,
.descricao,
.foto {
    padding-top: 20px;
    padding-right: 20px;
}

.container-info {
    display: flex;
}

.info-container {
    width: 33%;
}

.voltar {
    cursor: pointer;
    border: 1px solid rgb(209, 209, 209);
    background-color: #F0BAF4;
    font-size: 14px;
    padding: 5px 5px;
    border-radius: 20%;
}

.voltar:hover {
    background-color: #cfadcf;
}

h1 {
    margin-right: 10px;
    color: #191645;
    font-size: 24px;
}

.tamanhos-header {}

.header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.titulo-tamanhos {
    font-size: 24px;
    font-weight: 600;
}
</style>
