<template>
  <section>
    <h3>group</h3>
    <div class="desc">{{ $t('GroupDesc') }}</div>
    <div class="panel flex">
      <!-- demo -->
      <div class="figure demo">
        <div ref="wrapper">
          <img :src="ASSETS.TEXTURE" @load="load" />
        </div>
        <div class="quote">click to see the area color.</div>
      </div>
      <!-- mask -->
      <div class="figure mask border">
        <canvas ref="canvas" />
        <div class="quote">a mask image with 3 colors.</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ASSETS from '@/assets'
import { OneClip } from '@/core'
import showTip from '@/components/tip'

const canvas = ref<HTMLCanvasElement>()
const wrapper = ref<HTMLDivElement>()

const load = () => {
  const clip = new OneClip({
    maskSource: ASSETS.COLOR_RECT(canvas.value),
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
.panel > div {
  width: 50%;
}
</style>