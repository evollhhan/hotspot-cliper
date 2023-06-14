<template>
<img v-if="props.mode === 0" :src="ASSETS.SCENE" @load="emits('update')">
<p v-if="props.mode === 1">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et commodo est, nec imperdiet est. Sed gravida rutrum tortor. Duis semper libero mauris, sit amet sagittis lorem iaculis eget. Cras ut scelerisque arcu. Vivamus laoreet ex nec tincidunt imperdiet. Aliquam posuere libero quis lorem tristique, sed sodales lacus tristique. Pellentesque nec nisi et magna iaculis volutpat sit amet luctus leo. Donec posuere lacus bibendum lorem aliquam lacinia. Morbi sit amet lobortis enim, ut feugiat tortor. Aliquam ornare nec urna at euismod. Nulla mauris ante, faucibus vitae cursus non, mollis a leo.
  Ut dignissim elementum metus vitae ultrices. Sed a dignissim est, ut mattis nisi. Pellentesque sed dapibus justo, vitae tempus dolor. Nam in porta lorem. Vivamus eget erat eget augue pretium iaculis. Donec commodo venenatis interdum. Suspendisse turpis purus, commodo eget mi a, imperdiet feugiat magna. Vestibulum sed tellus diam. Aenean quis placerat tellus. Vivamus convallis pellentesque nisi, vitae aliquam sem maximus vitae.
  Duis tempus non massa vel malesuada. 
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et commodo est, nec imperdiet est. Sed gravida rutrum tortor. Duis semper libero mauris, sit amet sagittis lorem iaculis eget. Cras ut scelerisque arcu. Vivamus laoreet ex nec tincidunt imperdiet. Aliquam posuere libero quis lorem tristique, sed sodales lacus tristique. Pellentesque nec nisi et magna iaculis volutpat sit amet luctus leo. Donec posuere lacus bibendum lorem aliquam lacinia. Morbi sit amet lobortis enim, ut feugiat tortor. Aliquam ornare nec urna at euismod. Nulla mauris ante, faucibus vitae cursus non, mollis a leo.
  Ut dignissim elementum metus vitae ultrices. Sed a dignissim est, ut mattis nisi. Pellentesque sed dapibus justo, vitae tempus dolor. Nam in porta lorem. Vivamus eget erat eget augue pretium iaculis. Donec commodo venenatis interdum. Suspendisse turpis purus, commodo eget mi a, imperdiet feugiat magna. Vestibulum sed tellus diam. Aenean quis placerat tellus. Vivamus convallis pellentesque nisi, vitae aliquam sem maximus vitae.
  Duis tempus non massa vel malesuada. 
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et commodo est, nec imperdiet est. Sed gravida rutrum tortor. Duis semper libero mauris, sit amet sagittis lorem iaculis eget. Cras ut scelerisque arcu. Vivamus laoreet ex nec tincidunt imperdiet. Aliquam posuere libero quis lorem tristique.
</p>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue'
import ASSETS from '../assets'

const props = defineProps({
  mode: {
    type: Number,
    default: 0
  },
})

const emits = defineEmits(['update'])

const check = () => props.mode === 1 && emits('update')

watch(() => props.mode, check)

onMounted(check)
</script>

<style lang="scss" scoped>
img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

p {
  line-height: 1.5;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
