<template>
  <section>
    <h3>maskSource</h3>
    <div class="desc">{{ $t('MaskSourceDesc') }}</div>
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
        <div class="quote">play the video and try to click the moving black ball.</div>
      </div>
      <div class="figure border">
        <video :src="ASSETS.VIDEO" controls loop @loadeddata="onLoadVideo" ref="vdo" />
        <div class="quote">HTMLVideoElement</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ASSETS from '@/assets'
import { OneClip } from '@/core'
import { ref } from 'vue'
import showTip from '@/components/tip'

const wrapImg = ref<HTMLDivElement>()
const canvas = ref<HTMLCanvasElement>()

const loadCanvasDemo = async () => {
  const clip = new OneClip({
    maskSource: ASSETS.HELLO_WORLD(canvas.value),
    wrapper: wrapImg.value!,
    clipped: true
  })

  wrapImg.value?.addEventListener('click', (e) => {
    if (clip.isTouched(e.offsetX, e.offsetY).touched) {
      showTip('you click on the text!')
    }
  })
}

const wrapVideo = ref<HTMLDivElement>()
const vdo = ref<HTMLVideoElement>()

const onLoadVideo = () => {
  if (vdo.value) {
    const clip = new OneClip({
      maskSource: vdo.value,
      wrapper: wrapVideo.value!,
      group: [
        {
          color: [0, 0, 0],
          data: 'video'
        }
      ]
    })

    wrapVideo.value?.addEventListener('click', (e) => {
      if (clip.isTouched(e.offsetX, e.offsetY).touched) {
        showTip('you click on the black ball!', 1200, {
          backgroundColor: '#000'
        })
      }
    })

    document.body.appendChild(clip.cvs)
  }
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

.img-wrap {
  position: relative;
}
</style>