import { createApp } from 'vue'
import './style/style.scss'
import './style/font.scss'
import App from './App.vue'
import locales from './locales'

// highlight.js
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/atom-one-light.css'
hljs.registerLanguage('javascript', javascript)

const app = createApp(App)
app.use(locales)
app.mount('#app')


