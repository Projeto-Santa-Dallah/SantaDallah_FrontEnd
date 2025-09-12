<script setup>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

const canvasRef = ref(null);

const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho"];
const data = {
  labels: meses,
  datasets: [
    {
      label: 'Orçamentos',
      data: [23, 87, 4, 65, 39, 72, 11],
      borderColor: '#191645',
      backgroundColor: '#191645',
    },
    {
      label: 'Produtos',
      data: [58, 2, 94, 31, 76, 19, 45],
      borderColor: '#F0BAF4',
      backgroundColor: '#F0BAF4',
    }
  ]
};

onMounted(() => {
  if (canvasRef.value) {
    new Chart(canvasRef.value, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Santa Dalah - orçamentos e pedidos'
          }
        }
      }
    });
  }
});
</script>

<template>
  <canvas class="grafico-orcamento" ref="canvasRef"></canvas>
</template>
<style scoped>
.grafico-orcamento{
    width: 100%;
    height: min-content;
}
</style>
