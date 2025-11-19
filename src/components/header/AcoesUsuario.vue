<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useTemplateStore } from '@/stores/template/template';
import { useRoute } from 'vue-router'

const route = useRoute()

// Verifica se a rota atual começa com '/admin'
const isAdminRoute = route.path.startsWith('/admin')
const TemplateStore = useTemplateStore()

import { useAuthStore } from '@/stores/auth'; // Importa a store de autenticação

const authStore = useAuthStore();

// Computa se o usuário está logado e obtém os dados do usuário
const isLoggedIn = computed(() => authStore.loggedIn);
const useAuth = useAuthStore()


</script>

<template>
  <div class="acoes-usuarios">
    <div class="pesquisar">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
          stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <div>
      <!-- <RouterLink to="/perfil">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
              stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </RouterLink> -->
      <div class="perfil" v-if="isLoggedIn">
        <router-link to="/perfil" class="profile-link">
          <img :src="useAuth.user.foto
            ? useAuth.user.foto.url
            : '/src/assets/imagens/usersemfoto.png'
            " alt="foto usuario" />
          <span class="name-user">{{ useAuth.user.name }}</span>
        </router-link>

        <!-- Foto do usuário com dropdown -->

      </div>

      <div class="login" v-if="!isLoggedIn">
        <router-link to="/login" class="login-btn">Login</router-link>
      </div>
      
       <div class="login-mobile" v-if="!isLoggedIn">
        <router-link to="/login" class="login-btn">      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.0001 19C17.0001 17.6044 17.0001 16.9067 16.8279 16.3389C16.4401 15.0605 15.4397 14.06 14.1613 13.6722C13.5935 13.5 12.8957 13.5 11.5001 13.5H6.50013C5.10456 13.5 4.40678 13.5 3.83898 13.6722C2.56058 14.06 1.56016 15.0605 1.17236 16.3389C1.00012 16.9067 1.00012 17.6044 1.00012 19M13.5001 5.5C13.5001 7.98528 11.4854 10 9.00012 10C6.51484 10 4.50012 7.98528 4.50012 5.5C4.50012 3.01472 6.51484 1 9.00012 1C11.4854 1 13.5001 3.01472 13.5001 5.5Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></router-link>
      </div>

    </div>
    <div>
      <RouterLink to="/carrinho" v-if="!isAdminRoute">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.0004 9V6C16.0004 3.79086 14.2095 2 12.0004 2C9.79123 2 8.00037 3.79086 8.00037 6V9M3.59237 10.352L2.99237 16.752C2.82178 18.5717 2.73648 19.4815 3.03842 20.1843C3.30367 20.8016 3.76849 21.3121 4.35839 21.6338C5.0299 22 5.94374 22 7.77142 22H16.2293C18.057 22 18.9708 22 19.6423 21.6338C20.2322 21.3121 20.6971 20.8016 20.9623 20.1843C21.2643 19.4815 21.179 18.5717 21.0084 16.752L20.4084 10.352C20.2643 8.81535 20.1923 8.04704 19.8467 7.46616C19.5424 6.95458 19.0927 6.54511 18.555 6.28984C17.9444 6 17.1727 6 15.6293 6L8.37142 6C6.82806 6 6.05638 6 5.44579 6.28984C4.90803 6.54511 4.45838 6.95458 4.15403 7.46616C3.80846 8.04704 3.73643 8.81534 3.59237 10.352Z"
            stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.acoes-usuarios {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
}

.acoes-usuarios div {
  margin-left: 30px;
}

.acoes-usuarios div div {
  margin-left: 0px;
}

.acoes-usuarios svg,

.acoes-usuarios .login-btn {
  display: block;
  /* evita desalinhamento por linha */
}

.login .login-btn {
  text-decoration: none;
  border-radius: 50px;
  border: 1px solid black;
  padding: 10px 20px;
  font-weight: 600;
}

.login .login-btn:hover {
  text-decoration: none;
  border-radius: 50px;
  border: 1px solid rgb(255, 255, 255);
  padding: 10px 20px;
  font-weight: 600;
  color: white;
  background-color: #191645e2;
  transition: all 0.3s ease
}


.login-btn:visited {
  text-decoration: none;
  color: black;

}

.acoes-usuarios .perfil {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;
}

.perfil img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  text-decoration: none;
  object-fit: cover;
}

.perfil span {
  color: black;
}

.profile-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}
.login-mobile{
  display: none;
}
@media (max-width: 700px) {
  .pesquisar {
    display: none;
  }

  .acoes-usuarios {
    width: auto;
    height: 
  }
  .login-mobile{
  display: block;
}
.login{
  display: none;
}
.name-user{
  display: none;
}
}
</style>
