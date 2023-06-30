<template>
  <section>
    <h3>clipped</h3>
    <div class="desc">If option.clipped is true, the parent element will clipped with given image source.</div>
    <div class="panel flex">
      <!-- demo -->
      <div class="figure">
        <div class="img-wrap" ref="wrapper">
          <img :src="ASSETS.TEXTURE" @load="load">
        </div>
        <div class="quote">clip result</div>
      </div>
      <!-- mask -->
      <div class="figure border">
        <canvas ref="canvas" />
        <div class="quote">a round black shape</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ASSETS from '../assets'
import { OneClip } from '../core'
import { ref } from 'vue'
import showTip from '../components/tip'

const wrapper = ref<HTMLDivElement>()
const canvas = ref<HTMLCanvasElement>()

const load = (e: Event) => {
  const img = e.target as HTMLImageElement
  const cvs = canvas.value!
  const ctx = cvs.getContext('2d')!
  cvs.width = img.naturalWidth
  cvs.height = img.naturalHeight
  ctx.fillStyle = '#000'
  ctx.save()
  ctx.translate(cvs.width / 2, cvs.height / 2)
  ctx.beginPath()
  ctx.arc(0, 0, cvs.height / 3, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fill()
  ctx.restore()

  cvs.toBlob((blob) => {
    const maskSource = URL.createObjectURL(blob!)
    const clip = new OneClip({
      maskSource,
      wrapper: wrapper.value!,
      clipped: true
    })
    wrapper.value?.addEventListener('click', (e) => {
      if (clip.isTouched(e.offsetX, e.offsetY).touched) {
        showTip('clicked!')
      }
    })
  })
}
</script>

<style lang="scss" scoped>
.panel > div {
  width: 50%;
}
</style>