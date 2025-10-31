<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  imagem: {
    type: [Array, Object, String],
    default: () => []
  }
})

// referência do elemento
const imgRef = ref(null)
const isHovering = ref(false)

// eventos para zoom
const handleMouseMove = (event) => {
  const img = imgRef.value
  const rect = img.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100
  img.style.setProperty('--x', `${x}%`)
  img.style.setProperty('--y', `${y}%`)
}

const handleMouseEnter = () => (isHovering.value = true)
const handleMouseLeave = () => (isHovering.value = false)

// pega a URL correta (adaptado)
const imagemUrl = computed(() => {
  if (typeof props.imagem === 'string') return props.imagem
  if (Array.isArray(props.imagem)) {
    const item = props.imagem[0]
    return item?.url || item?.file || ''
  }
  return props.imagem?.url || props.imagem?.file || ''
})
</script>

<template>
  <div
    class="img"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <img
      ref="imgRef"
      class="zoom"
      :class="{ 'zoom-active': isHovering }"
      :src="imagemUrl"
      alt="Imagem do produto"
    />
  </div>
</template>

<style scoped>
.img {
  border: 1px solid #d9d9d9;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 50px;
  width: 30vw;
  height: 30vw;
  overflow: hidden;
  position: relative;
  cursor: zoom-in;
}

.img img {
  width: 100%;
 height: 100%;
  transition: transform 0.3s ease, transform-origin 0.3s ease;
  object-fit: cover;
  overflow: hidden;
}

.img img.zoom-active {
  transform: scale(1.8);
  transform-origin: var(--x) var(--y);
}

@media (max-width: 768px) {
  .img {
    width: auto;
    height: auto;
    padding: 20px;
    margin: 0px 20px;
  }
}
</style>
