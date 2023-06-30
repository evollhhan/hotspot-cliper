<template>
  <section>
    <h3>maskSource</h3>
    <div class="desc">Define a mask source. It can be a image url, a image element, a canvas element or a video element.</div>
    <!-- canvas -->
    <div class="panel flex">
      <div class="figure">
        <div class="img-wrap" ref="wrapImg">
          <img :src="ASSETS.TEXTURE" @load="loadCanvasDemo">
        </div>
        <div class="quote">click text to see the message</div>
      </div>
      <div class="figure border">
        <canvas ref="canvas" />
        <div class="quote">HTMLCanvasElement</div>
      </div>
    </div>
    <!-- video -->
    <div class="panel flex">
      <div class="figure">
        <div class="img-wrap" ref="wrapVideo">
          <img :src="ASSETS.TEXTURE">
        </div>
        <div class="quote">click text to see the message</div>
      </div>
      <div class="figure border">
        <video :src="ASSETS.VIDEO" controls @loadedmetadata="onLoadVideo" @play="onPlayVideo" ref="vdo" />
        <div class="quote">HTMLVideoElement</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ASSETS from '../assets'
import { OneClip } from '../core'
import { ref } from 'vue'
import showTip from '../components/tip'

const wrapImg = ref<HTMLDivElement>()
const wrapVideo = ref<HTMLDivElement>()
const vdo = ref<HTMLVideoElement>()
const canvas = ref<HTMLCanvasElement>()

const loadCanvasDemo = (e: Event) => {
  const img = e.target as HTMLImageElement
  const cvs = canvas.value!
  const ctx = cvs.getContext('2d')!
  cvs.width = img.naturalWidth
  cvs.height = img.naturalHeight
  ctx.fillStyle = '#000'
  ctx.font = 'bold 96px Arial, sans-serif'
  ctx.save()
  ctx.translate(cvs.width / 2, cvs.height / 2)
  const text = 'HELLO WORLD'
  const size = ctx.measureText(text)
  ctx.fillText(text, -size.width / 2, 0)
  ctx.fill()
  ctx.restore()

  cvs.toBlob((blob) => {
    const maskSource = URL.createObjectURL(blob!)
    const clip = new OneClip({
      maskSource,
      wrapper: wrapImg.value!,
      clipped: true
    })
    wrapImg.value?.addEventListener('click', (e) => {
      if (clip.isTouched(e.offsetX, e.offsetY).touched) {
        showTip('you click on the text!')
      }
    })
  })
}

const onLoadVideo = () => {
  if (vdo.value) {
    const clip = new OneClip({
      maskSource: vdo.value,
      wrapper: wrapVideo.value!,
      clipped: true
    })

    wrapVideo.value?.addEventListener('click', (e) => {
      if (clip.isTouched(e.offsetX, e.offsetY).touched) {
        showTip('you click on the video!')
      }
    })
  }
}

const onPlayVideo = () => {
  // todo
  console.log('play')
}
</script>

<style lang="scss" scoped>
.panel {
  margin-bottom: 12px;
}

.panel > div {
  width: 50%;
}

video {
  margin-bottom: 12px;
  display: block;
  width: 100%;
  object-fit: contain;
}
</style>