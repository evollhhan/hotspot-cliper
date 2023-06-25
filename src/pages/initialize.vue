<template>
  <section>
    <div class="code" v-html="html" />
  </section>
</template>

<script lang="ts" setup>
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/atom-one-light.css'

hljs.registerLanguage('javascript', javascript)

const html = hljs.highlight(`// your target wrapper element
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
`, { language: 'javascript' }).value

</script>

<style lang="scss" scoped>
.code {
  padding: 12px;
  white-space: pre;
  background: rgba(0, 0, 0, .02);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, .1);
  font-family: Consolas, Monaco, monospace;
  font-size: 13px;
  border-radius: 4px;
}
</style>