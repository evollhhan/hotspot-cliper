<template>
  <section>
    <h3>clipped</h3>
    <div class="desc">{{ $t('ClippedDesc') }}</div>
    <div class="panel flex">
      <!-- demo -->
      <div class="figure" data-tag="演示区域">
        <div class="img-wrap" ref="wrapper">
          <img :src="ASSETS.TEXTURE" @load="load">
        </div>
        <div class="quote">clip result</div>
      </div>
      <!-- mask -->
      <div class="figure border" data-tag="遮罩源">
        <canvas ref="canvas" />
        <div class="quote">a round black shape</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ASSETS from '@/assets'
import { OneClip } from '@/core'
import showTip from '@/components/tip'

const wrapper = ref<HTMLDivElement>()
const canvas = ref<HTMLCanvasElement>()

const load = async () => {
  const clip = new OneClip({
    maskSource: ASSETS.BLACK_CIRCLE(canvas.value),
    wrapper: wrapper.value!,
    autoResize: true,
    clipped: true
  })

  wrapper.value?.addEventListener('click', (e) => {
    if (clip.isTouched(e.offsetX, e.offsetY).touched) {
      showTip('clicked!')
    }
  })
}
</script>

<style lang="scss" scoped>
.panel > div {
  width: 50%;
}
</style>