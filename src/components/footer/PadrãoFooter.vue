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

@media (max-width: 1300px) {

  footer {

    height: auto;
     padding: 40px 60px 40px 60px;
  }



  footer section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 80px;

  }

  footer section .footer-info{
    text-align: center;
  }

  .footer-info{
    margin: 40px 0 0 0;
  }


  .footer-info {
    flex-direction: column;
    display: flex;
    gap: 15px;
  }

  footer section{
    margin-bottom: 40px;
  }

  hr{
    width: 100%;
  }

  .footer-direitos{
    text-align: center;
  }
}
</style>