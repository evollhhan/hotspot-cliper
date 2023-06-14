<template>
  <section>
    <h3>Alpha Clip</h3>
    <div class="desc">Clip content by using a mask image with alpha channel.</div>
    <div class="demo">
      <!-- view area -->
      <div class="view flex">
        <div ref="preview" />
        <div ref="demo">
          <test-content :mode="mode" @update="update" />
        </div>
      </div>
      <!-- option area -->
      <div class="options flex">
        <div class="wrap">
          <mask-selector @update:url="mask = $event" />
        </div>
        <div class="wrap">
          <content-selector @update:mode="mode = $event" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { HotspotClipper } from '../core'
import TestContent from '../components/test-content.vue'
import ContentSelector from '../components/content-selector.vue'
import MaskSelector from '../components/mask-selector.vue';
import ASSETS from '../assets'

const preview = ref<HTMLCanvasElement>()
const demo = ref<HTMLDivElement>()
const clipper = ref<HotspotClipper>()
const mode = ref(0)
const mask = ref(ASSETS.MASK)

const update = () => {
  if (clipper.value) {
    clipper.value.update()
  } else {
    const instance = new HotspotClipper({
      maskImageUrl: mask.value,
      wrapper: demo.value!,
      willMaskWrapper: true,
      maskSize: 'cover',
      effectAlpha: 0.5
    })

    preview.value?.appendChild(instance.cvs)

    clipper.value = instance
  }
}

const reload = () => {
  const instance = clipper.value
  if (instance) {
    instance.options.maskImageUrl = mask.value
    instance.load()
  }
}

watch(() => mask.value, reload)
</script>

<style lang="scss" scoped>
.demo {
  width: 100%;
  box-shadow: 0 0 0 1px #d2d2d2;
  border-radius: 4px;
  overflow: hidden;
}

.view {
  position: relative;
  box-shadow: 0 0 0 1px #d2d2d2;
  cursor: default;
  z-index: 1;

  > div {
    width: 50%;
    max-height: 512px;
    overflow: hidden;
  }

  > div:first-child {
    box-shadow: 0 0 0 1px #d2d2d2;
  }
}

.options {
  background-color: #fcfcfc;

  > div {
    width: 50%;
  }
}
</style>
