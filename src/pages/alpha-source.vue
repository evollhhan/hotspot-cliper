<template>
  <section>
    <div class="box" ref="preview" />
    <div class="box" ref="demo">
      <img src="/test.png" @load="onloadImage">
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HotspotClipper } from '../core/index'

const preview = ref<HTMLCanvasElement>()
const demo = ref<HTMLDivElement>()

const onloadImage = () => {
  const instance = new HotspotClipper({
    maskImageUrl: '/test.png',
    wrapper: demo.value!,
  })

  preview.value?.appendChild(instance.cvs)
}
</script>

<style lang="scss" scoped>
section {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.box {
  margin: 12px;
  width: 480px;
  box-shadow: 0 0 12px #e2e2e2;
  border-radius: 4px;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  canvas {
    display: block;
  }
}
</style>
