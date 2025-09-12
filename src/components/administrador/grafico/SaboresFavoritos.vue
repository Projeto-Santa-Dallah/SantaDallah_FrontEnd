<script setup>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

const canvasRef = ref(null);

const data = {
  labels: [
    'Trufada',
    '3 Leites',
    'Redvelvet',
    'Pistache',
    'Tropical'
  ],
  datasets: [
    {
      label: 'Sabores Favoritos',
      data: [25, 40, 15, 10, 30], // valores exemplo, pode trocar pelos reais
      backgroundColor: [
        '#191645', // Trufada - Vovó Dalilah
        '#F0BAF4', // 3 Leites - Decorado
        '#BF99C8', // Redvelvet - Vovó Dalilah
        '#A3A3A3', // Pistache - Torta
        '#9073BD'  // Tropical - Decorado
      ],
      borderColor: '#fff',
      borderWidth: 2
    }
  ]
};

onMounted(() => {
  if (canvasRef.value) {
    new Chart(canvasRef.value, {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Sabores Favoritos'
          }
        }
      }
    });
  }
});
</script>

<template>
  <canvas class="grafico" ref="canvasRef"></canvas>
</template>
<style scoped>
.grafico{
    width: 100%;
    height: min-content;
}
</style>
