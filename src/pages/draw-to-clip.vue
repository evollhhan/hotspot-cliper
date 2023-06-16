<template>
  <section>
    <h3>Draw to Clip</h3>
    <div class="desc">Draw a shape on the canvas to create a mask image. There is a circle mask in the center of the image. When you click on the circle, you will get a `clicked` tip.</div>
    <div class="panel">
      <div class="img-wrap" ref="wrapper">
        <img :src="ASSETS.TEXTURE" @load="render">
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

const render = () => {
  const cvs = document.createElement('canvas')
  const ctx = cvs.getContext('2d')!
  cvs.width = 1366 // texture width
  cvs.height = 915 // texture height
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
.img-wrap {
  margin: 24px auto;
  width: 100%;
  max-width: 960px;
}

img {
  display: block;
  width: 100%;
}

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
</style>