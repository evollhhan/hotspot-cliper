<template>
  <ul class="flex">
    <li @click="emit('update:mode', 0)">
      <img :src="ASSETS.SCENE">
    </li>
    <li @click="emit('update:mode', 1)">TEXT</li>
  </ul>
</template>

<script setup lang="ts">
import ASSETS from '../assets'

const emit = defineEmits(['update:mode'])
</script>

<style lang="scss" scoped>
ul {
  justify-content: center;
}

li {
  margin: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  border: 1px solid rgba(0, 0, 0, .12);
  border-radius: 4px;
  transition: .2s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 12px #e2e2e2;
  }

  img {
    width: 100%;
  }
}
</style>