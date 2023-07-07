<template>
  <div class="sidebar">
    <div
      v-for="item in sidebar"
      :key="item.name"
    >
      <div class="category">{{ $t(item.name) }}</div>
      <div
        v-for="label in item.labels"
        :key="label.name"
      >
        <div>{{ $t(label.name) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const sidebar = [
  {
    name: 'Introduction'
  },
  {
    name: 'Initialize',
  },
  {
    name: 'Parameters',
    labels: [
      {
        name: 'maskSource',
      },
      {
        name: 'threshold',
      },
      {
        name: 'clipped'
      },
      {
        name: 'group'
      }
    ]
  },
  {
    name: 'Methods'
  }
]
</script>

<style lang="scss" scoped>
.sidebar {
  position: sticky;
  top: 52px;
  padding-top: 8px;
  font-size: 13px;
  line-height: 2;
  color: var(--color-text-light);
}

.category {
  font-weight: bold;
  margin-top: 12px;
  color: var(--color-text);
}
</style>