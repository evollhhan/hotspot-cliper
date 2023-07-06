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
  background: rgba(0, 0, 0, .02);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, .1);
  font-family: Consolas, Monaco, monospace;
  font-size: 13px;
  border-radius: 4px;
}
</style>