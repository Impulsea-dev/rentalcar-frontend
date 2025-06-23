<template>
  <div class="flex items-center" :style="{ height: height + 'px' }">
    <img
      src="/economy_white.png"
      alt="Logo 1"
      :class="['w-auto', imageClass, '-mr-8']"
      :style="{ height: height + 'px' }"
    />
    <img
      src="/discount_white.png"
      alt="Logo 2"
      :class="['w-auto', imageClass]"
      :style="{ height: height + 'px' }"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  height: {
    type: Number,
    default: 60 // 80px por defecto, puedes usar 60, 100, etc.
  },
  imageClass: {
    type: String,
    default: ''
  }
})
</script>
