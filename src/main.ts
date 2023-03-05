import { createApp } from 'vue'
import './style.css'
import { createPinia, Pinia } from 'pinia'
import App from './App.vue'

const pinia: Pinia = createPinia()
const app = createApp(App)

app.use(pinia)

app.mount('#app')
