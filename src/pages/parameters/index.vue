<template>
  <div>
    <section>
      <h2>{{ $t('Parameters') }}</h2>
    </section>
    <mask-source />
    <threshold />
    <clipped />
    <group />
  </div>
</template>

<script setup lang="ts">
import Group from './group.vue'
import Clipped from './clipped.vue'
import Threshold from './threshold.vue'
import MaskSource from './masksource.vue'
</script>
