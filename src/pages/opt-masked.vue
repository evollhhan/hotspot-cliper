<template>
  <section>
    <h3>option.masked</h3>
    <div class="desc">If option.masked is true, the parent element will be masked.</div>
    <div class="panel flex">
      <div class="figure border">
        <canvas ref="canvas" />
        <div class="quote">mask image</div>
      </div>
      <div class="figure">
        <div class="img-wrap" ref="wrapper">
          <img :src="ASSETS.TEXTURE" @load="load">
        </div>
        <div class="quote">result</div>
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
    const maskImageUrl = URL.createObjectURL(blob!)
    const clip = new OneClip({
      maskImageUrl,
      wrapper: wrapper.value!,
      masked: true
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
.btn {
  width: 100%;
  text-align: center;
  line-height: 64px;
  font-size: 16px;
  box-shadow: 0 0 0 1px #d2d2d2;
  color: #2196f3;
  cursor: pointer;

  &:hover {
    opacity: .72;
  }
}


.panel > div {
  width: 50%;
}
</style>