<template>
  <div class="headbar">
    <div class="wrap">
      <div class="logo">ONE-CLIP</div>
      <div style="flex-grow: 1;"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.headbar {
  position: sticky;
  top: 0;
  height: 52px;
  border-bottom: 1px solid var(--border-color);
  background-color: #fafafa;
  z-index: 2;
}

.wrap {
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: var(--page-width);
  height: 100%;
}

.logo {
  font-weight: bold;
  color: #2d2d2d;
  font-size: 18px;
}
</style>