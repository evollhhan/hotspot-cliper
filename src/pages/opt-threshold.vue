<template>
  <section>
    <h3>threshold</h3>
    <div class="desc">Threshold controls the sensitivity of the mask.</div>
    <div class="panel flex">
      <!-- mask -->
      <div class="figure mask border">
        <canvas ref="canvas" />
        <div class="quote">mask image</div>
      </div>
      <!-- demo -->
      <div class="figure demo">
        <div ref="wrapper">
          <img :src="ASSETS.TEXTURE" @load="load" />
        </div>
        <div class="quote">alpha below 127 will not trigger click event</div>
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

const load = (e: Event) => {
  const img = e.target as HTMLImageElement
  const cvs = canvas.value!
  const ctx = cvs.getContext('2d')!
  cvs.width = img.naturalWidth
  cvs.height = img.naturalHeight
  const grad = ctx.createLinearGradient(0, 0, 0, cvs.height)
  grad.addColorStop(0, 'rgba(0, 0, 0, 1)')
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, cvs.width, cvs.height)
  ctx.fillStyle = '#fff'
  ctx.font = '32px sans-serif'
  ctx.fillText('alpha: 255', 24, 48)
  ctx.fillStyle = '#000'
  ctx.fillText('alpha: 0', 24, cvs.height - 48)

  const clip = new OneClip({
    maskImageUrl: cvs.toDataURL(),
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