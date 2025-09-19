<script setup>
import "@passageidentity/passage-elements/passage-auth";
const appId = import.meta.env.VITE_PASSAGE_APP_ID;
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useTemplateStore } from '@/stores/template/template';

const templateStore = useTemplateStore();
const router = useRouter();

// Estado de carregamento
const loading = ref(false);

// Função para lidar com login do Passage
const handleLogin = () => {
  console.log("Login disparado!");
  loading.value = true; // Mostra carregamento imediatamente
  // O backend/update da store acontece no authStore
};

// Watch em isAdmin para redirecionar automaticamente
watch(
  () => templateStore.isAdmin,
  (isAdmin) => {
    if (isAdmin === null || isAdmin === undefined) return;

    // Redireciona após 30 segundos, mas a tela de carregamento já aparece
    setTimeout(() => {
      loading.value = false;
      if (isAdmin) router.push('/homeAdmin');
      else router.push('/');
    }, 30000); // 30 segundos
  }
);
</script>

<template>
  <div class="container">
    <h1>Login</h1>
    <div class="authContainer">
      <passage-auth :app-id="appId" @login="handleLogin"></passage-auth>
    </div>

    <!-- Tela de carregamento -->
    <div v-if="loading" class="loadingOverlay">
      <p>Carregando...</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: relative;
}

.authContainer {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  text-align: center;
}

.loadingOverlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255,255,255,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 10px;
}
</style>
