<script setup>
import { onMounted, ref , watch} from 'vue';
import buttonPerfil from '../button/buttonPerfil.vue';
const props = defineProps(['DadosUser'])
const usuario = ref({});

const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }); formatDate(usuario.last_login) || 'Nunca logado' 
};

  watch(() => props.DadosUser, (newVal) => {
  if (newVal) usuario.value = { ...newVal }
})

  onMounted(() =>{
    usuario.value = props.DadosUser
    console.log(usuario.value)
  })

  const camposVisiveis = ['name', 'email', 'is_active', 'is_staff', 'is_superuser', 'last_login']

</script>

<template>
 <div class="perfil-info">
        <div><h1>Meus Dados</h1></div>

        <div class="inputs" v-if="usuario">
          <div class="input-div"  v-for="chave in camposVisiveis" :key="chave" >
            <label for="nome">{{ chave }}</label>
            <input v-if="chave !='last_login'" type="text" id="nome" class="" v-model="usuario[chave]" />
            <input v-else type="text" id="nome" class="" :value="formatDate(usuario.last_login) || 'Nunca logado'" disabled/>
          
          </div>
       
        </div>
       <buttonPerfil @click="$emit('enviarDados', usuario)" titulo="Salvar Alterações"/>
    </div>
</template>

<style scoped>

.perfil-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 950px;
  }
  .perfil-info h1 {
    font-size: 24px;
  }
  .perfil-info input {
    width: 350px;
    height: 40px;
    border: 1px solid #d9d9d9;
    border-radius: 50px;
    padding: 0px 45px;
    color: #545454;
  }
  
  .perfil-info input.inputInteiro {
    width: 720px;
  }
  .inputs {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .input-div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .button {
    display: flex;
    justify-content: center;
    cursor: pointer;
  }
  .button button {
    width: 280px;
    height: 50px;
    background-color: #29375b;
    color: white;
    border: 1px solid transparent;
    border-radius: 50px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .perfil-info{
      padding: 0px 20px;
    }
    .inputs input{
      width: 100%;
    }
    .input-div{
      width: 100%;
    }
    .button{
      margin-top: 40px;
    }
    .perfil-info input.inputInteiro {
      width: 100%px;
    }
  }

</style>