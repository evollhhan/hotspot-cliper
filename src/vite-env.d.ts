/// <reference types="vite/client" />

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string) => string
  }
}

export {}