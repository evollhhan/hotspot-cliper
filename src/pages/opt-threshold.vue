<template>
  <section>
    <h3>threshold</h3>
    <div class="desc">Threshold controls the sensitivity of the mask.</div>
    <div class="panel flex">
      <!-- demo -->
      <div class="figure demo">
        <div ref="wrapper">
          <img :src="ASSETS.TEXTURE" @load="load" />
        </div>
        <div class="quote">alpha below 127 will not trigger click event</div>
      </div>
      <!-- mask -->
      <div class="figure mask border">
        <canvas ref="canvas" />
        <div class="quote">mask image</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ASSETS from '../assets'
import { OneClip } from '../core'
import showTip from '../components/tip'

const canvas = ref<HTMLCanvasElement>()
const wrapper = ref<HTMLDivElement>()

const load = () => {
  const clip = new OneClip({
    maskSource: ASSETS.ALPHA_RECT(canvas.value),
    wrapper: wrapper.value!,
    threshold: 0.5
  })

  wrapper.value?.addEventListener('click', (e) => {
    const res = clip.isTouched(e.offsetX, e.offsetY)
    if (res.touched) {
      showTip('clicked!')
    }
  })
}
</script>

<style lang="scss" scoped>
.panel > div {
  width: 50%;
}

canvas {
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}
</style>