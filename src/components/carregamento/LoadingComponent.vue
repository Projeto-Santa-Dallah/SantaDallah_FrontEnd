<template>
    <div class="loading">
      <img src="@/assets/loading.gif" alt="Carregando..." />
    </div>
</template>

<style scoped>
.loading{
  display: flex;
  position: fixed;
  top:0;
  width: 100vw;
  height: 100vh;
  z-index: 99999999999999999999999999999;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.815);
  left: 0;
}
</style>