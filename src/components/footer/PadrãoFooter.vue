<script setup>
import SloganFooter from './SloganFooter/SloganFooter.vue';
import LinksFooter from './Links/LinksFooter.vue';
</script>
<template>
  <footer>
    <section>
      <SloganFooter />
      <div class="footer-info">
        <LinksFooter />
      </div>
    </section>
    <hr />
    <div class="footer-direitos">&copy 2025 Santa Dallah. Todos os direitos reservados.</div>
  </footer>
</template>
<style scoped>
footer {

  height: 400px;
  background-color: #191645;
  padding: 70px 100px 32px 100px;
  color: white;
  font-size: 16px;
}

footer section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 80px;
}

.footer-info {
  flex-direction: row;
  display: flex;
  gap: 15px;
}

hr {
  width: 80%;
  margin: auto;
  color: #ebebeb75;
}

.footer-direitos {
  width: 100%;
  margin: 20px 0;
  font-weight: 500;
  display: flex;
  justify-content: center;
}
</style>