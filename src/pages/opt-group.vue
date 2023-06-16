<template>
  <section>
    <h3>options.group</h3>
    <div class="desc">Define a group of color.</div>
    <div class="panel flex">
      <!-- mask -->
      <div class="mask border">
        <canvas ref="canvas" />
        <div class="quote">mask image</div>
      </div>
      <!-- demo -->
      <div class="demo">
        <div ref="wrapper">
          <img :src="ASSETS.TEXTURE" @load="load" />
        </div>
        <div class="quote">click to see the area color.</div>
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
  const w = cvs.width / 3
  ctx.fillStyle = 'rgba(255, 0, 0, 1)'
  ctx.fillRect(0, 0, w, cvs.height)
  ctx.fillStyle = 'rgba(0, 255, 0, 1)'
  ctx.fillRect(w, 0, w, cvs.height)
  ctx.fillStyle = 'rgba(0, 0, 255, 1)'
  ctx.fillRect(w * 2, 0, w, cvs.height)

  const clip = new OneClip({
    maskImageUrl: cvs.toDataURL(),
    wrapper: wrapper.value!,
    group: [
      {
        color: [255, 0, 0],
        data: 'red'
      },
      {
        color: [0, 255, 0],
        data: 'green'
      },
      {
        color: [0, 0, 255],
        data: 'blue'
      }
    ]
  })

  wrapper.value?.addEventListener('click', (e) => {
    const res = clip.isTouched(e.offsetX, e.offsetY)
    if (res.touched) {
      showTip(`${res.data} area is clicked!`, 1200, { backgroundColor: res.data,  })
    }
  })
}
</script>

<style lang="scss" scoped>
.panel {
  > div {
    padding: 24px;
    width: 50%;
  }

  canvas {
    width: 100%;
  }

  img {
    display: block;
    width: 100%;
    object-fit: contain;
  }

  canvas,
  img {
    margin-bottom: 12px;
    border-radius: 4px;
  }
}

.quote {
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #6d6d6d;
}
</style>