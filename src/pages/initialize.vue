<template>
  <section>
    <h2>{{ $t('Initialize') }}</h2>
    <show-code :code="code" />
  </section>
</template>

<script lang="ts" setup>
import ShowCode from '@/components/show-code.vue'

const code = `// your target wrapper element
const wrapper = document.querySelector('.wrapper')

const clip = new OneClip({
  maskSource: 'https://www.example.com/your-mask-image.png',
  wrapper
})

wrapper.addEventListener('click', (e) => {
  const res = clip.isTouched(e.offsetX, e.offsetY)
  if (res.touched) {
    // clicked!
  }
})
`

</script>

<style lang="scss" scoped>
</style>