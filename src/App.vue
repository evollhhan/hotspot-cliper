<template>
  <div class="box" @click="onclick">
  </div>
</template>

<script setup lang="ts">
const onclick = () => {
  console.log('clicked')
}
</script>

<style scoped>
.box {
  width: 300px;
  height: 300px;
  background-color: #f33;
}
</style>
