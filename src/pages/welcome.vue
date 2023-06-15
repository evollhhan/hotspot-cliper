<template>
  <div class="welcome">
    <div ref="wrapper" />
    <i class="pointer" :style="style" :class="{ active: state.active }" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, computed } from 'vue';
import showTip from '../components/tip'
import { OneClip } from '../core'
import ASSETS from '../assets'

const wrapper = ref<HTMLDivElement>()

const state = reactive({
  x: 0,
  y: 0,
  active: false,
  hidden: false
})

const style = computed(() => {
  const x = state.x - 16
  const y = state.y - 16
  const scale = state.active ? 1.5 : 1
  const alpha = state.active ? .34 : 0
  return {
    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
    backgroundColor: `rgba(0, 188, 212, ${alpha})`,
    opacity: state.hidden ? 0 : 1
  }
})

onMounted(() => {
  const clip = new OneClip({
    maskImageUrl: ASSETS.TITLE,
    wrapper: wrapper.value!,
    masked: true,
    maskSize: 'cover'
  })

  wrapper.value?.addEventListener('click', (e) => {
    if (clip.isTouched(e.offsetX, e.offsetY)) {
      showTip('clicked!')
    }
  })

  wrapper.value?.addEventListener('mousemove', (e) => {
    const { offsetX: x, offsetY: y } = e
    state.x = x
    state.y = y
    state.active = clip.isTouched(x, y)
    state.hidden = false
  })

  wrapper.value?.addEventListener('mouseleave', () => {
    state.hidden = true
  })
})
</script>

<style lang="scss" scoped>
.welcome {
  position: relative;
  margin: 0 auto;
  max-width: 1366px;
  width: 100%;
  height: 768px;

  > div {
    width: 100%;
    height: 100%;
    background-color: #2c5576;
  }

  .pointer {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    box-shadow: 0 0 8px #00bcd4, 0 0 0 1px #00bcd4;
    pointer-events: none;
    transition: .1s;
    z-index: 1;

    &::before {
      display: block;
      content: '';
      width: 6px;
      height: 6px;
      background-color: #00bcd4;
      border-radius: 50%;
    }
  }
}
</style>