<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTemplateStore } from '@/stores/template/template'

const TemplateStore = useTemplateStore()
const router = useRouter()
const login = ref(false)

const selecionar = (isAdmin) => {
  TemplateStore.isAdmin = isAdmin
  login.value = true

  if (isAdmin) {
    router.push('/homeAdmin')
  } else {
    router.push('/')
  }
}
</script>


<template>
  <div v-if="login == false" class="container">
    <div class="container-login">
      <h1>Selecione seu nível de usuário:</h1>
      <div class="usuario">
        <button @click="selecionar(true)">Administrador</button>
        <button @click="selecionar(false)">Cliente</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f0baf4e5;
  top: 0
}

.container-login {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgb(255, 254, 248);
  border-radius: 30px;
  margin: 20vh, 30vw;
  width: 40vw;
  height: 30vh;
}

.container-login .usuario button {
  display: block;
  background-color: #BF99C8;
  color: rgb(31, 31, 31);
  border-radius: 30px;
  border: 1px solid rgb(194, 194, 194);
  font-weight: 600;
  width: 200px;
  height: 45px;
  margin: 20px;
  font-size: 16px;
}

.container-login h1 {
  font-size: 25px;
  color: #191645;
}

.container-login .usuario {
  display: flex;
}
</style>
