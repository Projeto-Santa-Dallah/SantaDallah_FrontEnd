<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// Esconde breadcrumb na home normal e na home admin
const ocultarRotaAtual = computed(() => {
  return route.path === "/" || route.path === "/admin";
});

// Remove '/all' da URL e separa em partes
const path = computed(() => route.path.replace("/all", ""));
const partesRota = computed(() => {
  const parts = path.value.split("/").filter(Boolean);
  return parts.length > 0 ? parts : ["Home"];
});

// Caminhos acumulativos
const caminhos = computed(() => {
  return partesRota.value.map((_, index) => {
    return "/" + partesRota.value.slice(0, index + 1).join("/");
  });
});

// Nomes amigáveis das rotas
const nomesDasRotas = computed(() => {
  return caminhos.value.map((p) => {
    if (p === "/admin") return "Home Administrador";
    if (p === "/") return "Home";
    const rotaCorrespondente = router.getRoutes().find((r) => r.path === p);
    return rotaCorrespondente?.name || p;
  });
});

// Verifica se está numa rota admin
const isAdminRoute = computed(() => route.path.startsWith("/admin"));
</script>

<template>
  <div v-if="!ocultarRotaAtual" class="rota-atual">
    <!-- Só mostra o Home normal se não for rota de admin -->
    <RouterLink
      v-if="!isAdminRoute"
      class="link"
      to="/"
    >
      Home
    </RouterLink>

    <span
      v-if="nomesDasRotas.length > 0 && !isAdminRoute"
    > &gt; </span>

    <span
      v-for="(nome, index) in nomesDasRotas"
      :key="index"
      :class="{ 'active': index === nomesDasRotas.length - 1 }"
    >
      <RouterLink
        :to="caminhos[index]"
        class="link"
        :class="{ 'active': index === nomesDasRotas.length - 1 }"
      >
        <span v-if="index === nomesDasRotas.length - 1">
          <strong>{{ nome }}</strong>
        </span>
        <span v-else>{{ nome }}</span>
      </RouterLink>
      <span v-if="index < nomesDasRotas.length - 1"> &gt; </span>
    </span>
  </div>
</template>

<style scoped>
.rota-atual {
  display: flex;
  align-items: center;
  padding-left: 7vw;
  background-color: #F0BAF4;
  height: 50px;
  font-size: 14px;
  margin-top: 84px;
}

.link {
  margin: 0px 3px;
  text-decoration: none;
  color: rgb(0, 0, 0);
}

.active {
  font-weight: bold;
}

span {
  display: flex;
  align-items: center;
}
</style>
