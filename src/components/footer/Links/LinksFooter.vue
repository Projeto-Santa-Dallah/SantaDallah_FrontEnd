<script setup>
import whatsappIcon from '@/components/iconsPerfil/whatsappIcon.vue';
import facebookIcon from '@/components/iconsPerfil/facebookIcon.vue';
import instagramIcon from '@/components/iconsPerfil/instagramIcon.vue';
import emailIcon from '@/components/iconsPerfil/emailIcon.vue';
import phoneIcon from '@/components/iconsPerfil/phoneIcon.vue';
</script>
<template>
  <section>
   <div class="links-navegacao">
     <span>Páginas</span>
     <RouterLink to="/">Home</RouterLink>
     <RouterLink to="/produtos/all">Doces</RouterLink>
     <RouterLink to="/orcamentos">Orçamento</RouterLink>
     <RouterLink to="/sobre">Sobre</RouterLink>
     <RouterLink to="/atelie">Ateliê</RouterLink>
   </div>
   <div class="links-navegacao">
     <span>Navegção</span>
     <RouterLink to="/perfil">Minha conta</RouterLink>
     <RouterLink to="/carrinho">Meu carrinho</RouterLink>
   </div>
   <div class="links-navegacao">
     <span>Precisa de ajuda?</span>
     <div class="icon-telefone"><phoneIcon /> 55 47 98765-6789</div>
     <div class="icons-redes">
       <a href=""><emailIcon /></a>
       <a href="https://api.whatsapp.com/send/?phone=554791706002&text&type=phone_number&app_absent=0" target="blank"><whatsappIcon /></a>
       <a href="https://www.facebook.com/santadallah/" target="blank"><facebookIcon /></a>
       <a href="https://www.instagram.com/santadallah/" target="blank"><instagramIcon /></a>
     </div>
   </div>
   </section>
</template>
<style scoped>




.links-navegacao {
 flex-direction: column;
 display: flex;
}


.links-navegacao span {
 font-weight: 600;
 margin-bottom: 12px;
}


.links-navegacao a {
 color: #ebebeb;
 text-decoration: none;
 margin-bottom: 12px;
}


.icon-telefone {
 display: flex;
 align-items: center;
 gap: 10px;
 margin-bottom: 12px;
}


.icons-redes {
 gap: 15px;
 display: flex;
}


p{
 margin-bottom: 12px;
}

section{
  gap: 50px;
}
</style>