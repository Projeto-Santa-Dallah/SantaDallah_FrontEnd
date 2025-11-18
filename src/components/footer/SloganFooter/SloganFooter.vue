<script setup>
// import logoFooter from '@/assets/logo/logoFooter.vue'
</script>

<template>
    <div>
       <div class="logo">
         <router-link to="/">
           <img src="/src/assets/imagens/logobranca.png" alt="">
         </router-link>
       </div>
       <div class="footer-slogan">
       <img src="/src/assets/imagens/city.png" alt="">
       <span>Rua Frederico Hubner, 37, America, Joinville SC, 89204-280, Brasil.</span>
       </div>
     </div>
</template>

<style scoped>
.footer-slogan{
 font-weight: 500;
 margin: 10px 0 0 0;
 color: #ebebeb;
 display: flex;
 align-items: center;
 gap: 10px;
}

@media (max-width: 1300px){
  .logo{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .footer-slogan img{
    display: none;
  }

  .footer-slogan{
    text-align: center;
  }
}
</style>