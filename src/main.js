import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/styles/common.scss'
import {lazyPlugin} from '@/directives'
import {componentPlugin} from '@/components'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app')


