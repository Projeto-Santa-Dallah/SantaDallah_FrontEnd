<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/stores/carrinhoStore';

const props = defineProps({
    titulo: String,
    tituloBotao: String,
    inputPlaceholder: String,
    funcaoInput: String,
    type: Number,
});

const cart = useCartStore()

const valorInput = ref('')

function aplicar(){
    if(props.funcaoInput == "cupom"){
        cart.aplicarDesconto(valorInput.value)
    }
}

// Variavel definida para mostrar/esconder conteudo
const mostrarConteudo = ref(false)
</script>

<template>
    <!--VERSAO 1 do input-->
    <div v-if="type == 1">
        <div class="card-inserir-informacao-subversao">
            <div  class="opcao-extra-subversao" @click="mostrarConteudo = !mostrarConteudo"><span>{{ titulo }}</span>
                <svg v-if="mostrarConteudo"  width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 7L7 1L1 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg><svg v-else width="11" height="7" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1L7 7L13 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </div>
            <div class="input-inserir-informacao-subversao" v-if="mostrarConteudo">
                <div class="input-cupom-subversao">
                    <input type="text" v-model="valorInput" :placeholder="inputPlaceholder">
                </div>
                <button class="botao-informacao-subversao" @click="aplicar">{{ tituloBotao }}</button>
                <slot>
    
                </slot>
            </div>
        </div>
    </div>
    <!--VERSAO 2 do input-->
    <div class="card-inserir-informacao" v-else>
        <div class="opcao-extra" @click="mostrarConteudo = !mostrarConteudo"><span>{{ titulo }}</span>
     <svg v-if="mostrarConteudo" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1L7 7L13 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<svg v-else  width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 7L7 1L1 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        </div>
        <div class="input-inserir-informacao" v-if="mostrarConteudo">
            <div class="input-cupom">
                <input type="text" v-model="valorInput" :placeholder="inputPlaceholder">
            </div>
            <button class="botao-informacao" @click="aplicar">{{ tituloBotao }}</button>
            <slot>

            </slot>
        </div>
    </div>
</template>

<style scoped>
.input-inserir-informacao button.botao-informacao {
    border: none;
    font-weight: 600;
    background-color: #BF99C8;;
    height: 40px;
    width: 100%;
    color: white;
    cursor: pointer;
    border-radius: 3rem;
    transition: all .5s ease;
}

.input-inserir-informacao .input-cupom input{
    appearance: none;
    display: flex;
    height: 45px;
    border: 1px solid #BF99C8;
    border-radius: 3rem;
    text-indent: 20px;
    width: 100%;
}

.input-inserir-informacao{
    gap: 10px;
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
    width: 100%;
}

.card-inserir-informacao {
    display: flex;
    flex-direction: column;
    align-items: center;
}

div.opcao-extra {
    cursor: pointer;
    user-select: none;
    border-bottom: 1px solid transparent;
    display: flex;
    justify-content: space-between;
    height: 45px;
    margin-top: 20px;
    width: 100%;
}

/* Estilo 1 */
.input-cupom-subversao{
    width: 100%;
}

.input-inserir-informacao-subversao button.botao-informacao-subversao {
    border: none;
    font-weight: 600;
    border: 1px solid #BF99C8;;
    background-color: #ffffff;
    height: 45px;
    width: 50%;
    color: #BF99C8;
    cursor: pointer;
    border-radius: 3rem;
    transition: all .5s ease;
}

.input-inserir-informacao-subversao .input-cupom-subversao input{
    appearance: none;
    display: flex;
    height: 45px;
    border: 1px solid #BF99C8;;
    border-radius: 3rem;
    text-indent: 20px;
    width: 100%;
}

.input-inserir-informacao-subversao{
    gap: 10px;
    display: flex;
    padding-bottom: 10px;
    width: 100%;
}

.card-inserir-informacao-subversao {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid black;
}

div.opcao-extra-subversao {
    cursor: pointer;
    user-select: none;
    border-bottom: 1px solid transparent;
    display: flex;
    justify-content: space-between;
    height: 28px;
    margin-top: 20px;
    width: 100%;
}
div.opcao-extra-subversao{
    display: flex;
    align-items: center;
}

</style>