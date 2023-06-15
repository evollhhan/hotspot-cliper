<template>
  <button
    :class="{ animate: props.animate, played: isPlayed }"
    :style="{ animationDelay: props.delay + 's' }"
    @animationend="onend"
    @click="emit('click')"
  >
    <i :class="[props.icon]" />
    <div v-if="label" class="label" v-text="label" />
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isPlayed = ref(false)

const emit = defineEmits(['click'])

const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  delay: {
    type: Number,
    default: 0.1
  },
  animate: {
    type: Boolean,
    default: true
  },
  label: {
    type: String,
    default: ''
  }
})

const onend = () => {
  isPlayed.value = true
}
</script>

<style lang="scss" scoped>
button {
  position: relative;
  padding: 9px 12px;
  font-size: 18px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, .12);
  background: #f2f2f2;
  border-radius: 4px;
  color: #4d4d4d;
  cursor: pointer;
  border: none;
  transition: .2s;

  &:hover {
    background: rgba(0, 0, 0, .06);
  }

  &.animate {
    animation: showButton .3s both cubic-bezier(0.18, 0.89, 0.32, 1.28);
  }

  &.played {
    animation: none;
  }

  &:active {
    transform: scale(.92);
  }

  &:hover {
    .label {
      opacity: 1;
    }
  }
}

@keyframes showButton {
  from {
    transform: scale(.4);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.label {
  position: absolute;
  padding: 8px;
  top: 100%;
  left: 0;
  font-size: 12px;
  margin-top: 12px;
  white-space: nowrap;
  background: #000;
  color: #fff;
  border-radius: 4px;
  transition: .1s;
  opacity: 0;
}
</style>
