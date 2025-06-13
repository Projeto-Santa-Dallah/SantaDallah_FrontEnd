<script setup>
import CategoriaAdm from './CategoriaAdm.vue'

const categorias = [
        {
            "id": 1,
            "nome": "Torta",
            "descricao": "Produto doce a base de farinha com recheios variados."
        },
        {
            "id": 2,
            "nome": "Bolo Decorado",
            "descricao": "Os bolos decorados são mais altos (entre 12cm / 14cm de altura) e com isso mais pesados, também tem a decoração personalizada. São bem molhadinhos, ótima opção para o seu dia especial A Diferença entre o os bolos da linha vovó Dallah é altura, montagem e estilo de decoração"
        },
        {
            "id": 3,
            "nome": "Brigadeiro",
            "descricao": "Produto a base de leite condensado e manteiga, podendo ter variados sabores."
        },
        {
            "id": 4,
            "nome": "Bolo Vulcão",
            "descricao": "bolo com calda"
        },
        {
            "id": 5,
            "nome": "Bolo vovó Dallah",
            "descricao": "Os bolos da vovó Dallah são mais baixos (duas camadas de recheio) e com decoração tradicional, padrão. Eles podem conter frutas, são bem molhadinhos e claro, uma delicia para qualquer ocasião. A Diferença entre o decorado é altura, montagem e estilo de decoração. Uma linha da Santa Dallah que veio para dar ainda mais doçura e amor."
        },
        {
            "id": 6,
            "nome": "Massa",
            "descricao": "Sabores da massa do bolo"
        },
        {
            "id": 7,
            "nome": "Recheio",
            "descricao": "Sabores de recheio dos bolos vulcões"
        }
    ]
</script>

<template>
  <div class="categorias">
    <div class="categoria" v-for="categoria in categorias" :key="categoria.id">
      <CategoriaAdm
        :id="categoria.id"
        :nome="categoria.nome"
        :descricao="categoria.descricao"
      />
    </div>
  </div>
</template>

<style scoped>
.categorias {
  display: flex;
  flex-direction: column;
  padding: 0px 7vw 0px 50px;
  width: 71vw;
  margin-bottom: 100px;
}

.categoria {
  width: 100%;
  padding: 5px;
}
</style>