<template>
  <div>
    <playground />
    <section>
      <h2>Initialize</h2>
      <Initialize />
    </section>
    <section>
      <h2>Parameters</h2>
    </section>
    <opt-threshold />
    <opt-clipped />
    <opt-group />
  </div>
</template>

<script setup lang="ts">
import Initialize from './pages/initialize.vue'
import Playground from './pages/playground.vue'
import OptGroup from './pages/opt-group.vue'
import OptClipped from './pages/opt-clipped.vue'
import OptThreshold from './pages/opt-threshold.vue'
</script>
