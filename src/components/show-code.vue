<template>
  <div
    class="code"
    v-html="html"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import hljs from 'highlight.js/lib/core'

const props = defineProps<{
  code: string
}>()

const html = computed(() => hljs.highlight(props.code, { language: 'javascript' }).value)
</script>

<style lang="scss" scoped>
.code {
  padding: 12px;
  white-space: pre;
  background: #282c34;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, .1);
  font-family: Menlo, Monaco, Consolas, Monaco, monospace;
  line-height: 1.5;
  font-size: 13px;
  color: #c6c6c6;
  border-radius: var(--border-radius);
}
</style>