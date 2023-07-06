<template>
  <div class="welcome">
    <!-- header actions -->
    <div class="actions">
      <btn :animate="true" :delay=".1" :icon="'icon-image'" :label="'change background'" @click="upload" />
      <btn :animate="true" :delay=".2" :icon="'icon-draw'" :label="'draw a shape'" @click="draw" />
      <btn v-if="!isEdit" :animate="true" :delay=".3" :icon="'icon-download'" :label="'download mask image'" @click="save" />
      <btn v-if="isEdit" :animate="true" :delay=".4" :icon="'icon-erase'" :label="'erase'" @click="erase" />
      <btn v-if="isEdit" :animate="true" :delay=".5" :icon="'icon-done'" :label="'save and preview'" @click="update" />
      <div style="flex-grow: 1"></div>
      <input ref="input" class="input" type="file" @change="onUpload" />
    </div>
    <!-- playround -->
    <canvas
      v-show="isEdit"
      :style="wrapStyle"
      ref="canvas"
      @mousedown="onDrawStart"
    />
    <i
      v-show="isEdit"
      class="brush"
      :class="{ erase: state.isErasing }"
      :style="{ transform: state.brushTransform }"
    />
    <!-- preview -->
    <div v-show="!isEdit" class="wrapper" ref="wrapper" :style="wrapStyle" />
    <!-- preview pointer -->
    <i class="pointer" :style="style" :class="{ active: state.active }" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, computed } from 'vue';
import showTip from '../components/tip'
import Btn from '../components/btn.vue'
import { OneClip } from '../core'
import ASSETS from '../assets'

const wrapper = ref<HTMLDivElement>()
const input = ref<HTMLInputElement>()
const canvas = ref<HTMLCanvasElement>()
const clipper = ref<OneClip>()
const isEdit = ref(false)
const wrapStyle = ref({})

const state = reactive({
  x: 0,
  y: 0,
  active: false,
  hidden: true,
  brushTransform: '',
  isErasing: false,
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
    maskSource: ASSETS.TITLE,
    wrapper: wrapper.value!,
    autoResize: true,
    maskSize: 'contain',
    clipped: true
  })

  clipper.value = clip

  wrapper.value?.addEventListener('click', (e) => {
    if (clip.isTouched(e.offsetX, e.offsetY).touched) {
      showTip('clicked!')
    }
  })

  wrapper.value?.addEventListener('mousemove', (e) => {
    const { offsetX: x, offsetY: y } = e
    state.x = x
    state.y = y
    state.active = clip.isTouched(x, y).touched
    state.hidden = false
  })

  wrapper.value?.addEventListener('mouseleave', () => {
    state.hidden = true
  })

  const cvs = canvas.value!
  cvs.width = window.innerWidth
  cvs.height = window.innerHeight
  const ctx = cvs.getContext('2d')!
  const img = new Image()
  img.src = ASSETS.TITLE
  img.onload = () => {
    const scale = Math.min(cvs.width / img.width, cvs.height / img.height)
    ctx.drawImage(img, (cvs.width - img.width * scale) / 2, (cvs.height - img.height * scale) / 2, img.width * scale, img.height * scale)
    ctx.globalCompositeOperation = 'source-in'
    ctx.fillStyle = '#f33'
    ctx.beginPath()
    ctx.rect(0, 0, cvs.width, cvs.height)
    ctx.closePath()
    ctx.fill()
    ctx.globalCompositeOperation = 'source-over'
  }

  cvs.addEventListener('mousemove', (e) => {
    const x = e.offsetX - 20 + 'px'
    const y = e.offsetY - 20 + 'px'
    state.brushTransform = `translate3d(${x}, ${y}, 0)`
  })
})

const upload = () => {
  input.value?.click()
}

const onUpload = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]

  if (!file) {
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    const res = reader.result as ArrayBuffer
    const blob = new Blob([res])
    wrapStyle.value = {
      backgroundImage: `url(${URL.createObjectURL(blob)})`
    }
  }
  reader.readAsArrayBuffer(file)
}

const draw = () => {
  if (!isEdit.value) {
    isEdit.value = true
    return
  }

  const cvs = canvas.value!
  const ctx = cvs.getContext('2d')!
  ctx.globalCompositeOperation = 'source-over'
  state.isErasing = false
}

const erase = () => {
  const cvs = canvas.value!
  const ctx = cvs.getContext('2d')!
  ctx.globalCompositeOperation = 'destination-out'
  state.isErasing = true
}

const onDrawStart = () => {
  const cvs = canvas.value!
  const ctx = cvs.getContext('2d')!
  const onmove = (e: MouseEvent) => {
    const { offsetX: x, offsetY: y } = e
    ctx.beginPath()
    ctx.fillStyle = '#f33'
    ctx.arc(x, y, 20, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }
  cvs.addEventListener('mousemove', onmove)
  cvs.addEventListener('mouseup', () => {
    cvs.removeEventListener('mousemove', onmove)
  })
}

const update = () => {
  const cvs = canvas.value!
  const clip = clipper.value!
  isEdit.value = false
  URL.revokeObjectURL(clip.options.maskSource as string)
  cvs.toBlob(blob => {
    if (blob) {
      clip.options.maskSource = URL.createObjectURL(blob)
      clip.update()
    }
  })
}

const save = () => {
  const link = document.createElement('a')
  link.download = 'oneclip.png'
  link.href = canvas.value!.toDataURL('image/png')
  link.click()
}
</script>

<style lang="scss" scoped>
.welcome {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.actions {
  position: absolute;
  top: 0;
  left: 0;
  padding: 32px;
  display: flex;
  z-index: 10;

  button {
    margin-right: 12px;
  }
}


.wrapper {
  width: 100%;
  height: 100%;
  background-color: #2c5576;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
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

.input {
  width: 0;
  height: 0;
  overflow: hidden;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 4;
}

.brush {
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 51, 51, .32);
  box-shadow: 0 0 0 1px #f33;
  border-radius: 50%;
  transition: .1s;
  pointer-events: none;
  z-index: 5;

  &.erase {
    background-color: rgba(0, 0, 0, .32);
    box-shadow: 0 0 0 1px #000;
  }
}
</style>