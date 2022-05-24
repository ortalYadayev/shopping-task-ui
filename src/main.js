import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/app.scss'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue'

createApp(App).use(router).use(store).use(BootstrapIconsPlugin).mount('#app')
