<template>
  <playground
    v-if="showPlayground"
    @exit="showPlayground = false"
  />
  <headbar />
  <div class="container">
    <div class="sidebar">
      <sidebar />
    </div>
    <div class="content">
      <introduction />
      <initialize />
      <parameters />
    </div>
  </div>
</template>

<script setup lang="ts">
import Headbar from './components/headbar.vue'
import Sidebar from './components/sidebar.vue'
import Introduction from './pages/introduction.vue'
import Initialize from './pages/initialize.vue'
import Playground from './pages/playground.vue'
import Parameters from './pages/parameters/index.vue'
import { ref } from 'vue'

const showPlayground = ref(false)
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  max-width: var(--page-width);

  .sidebar {
    width: 320px;
    flex-shrink: 0;
  }

  .content {
    flex-grow: 1;
  }
}
</style>