import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './route'
import store from './store'
// import JsonExcel from 'vue-json-excel'
import { createPinia } from 'pinia'
const pinia = createPinia()
createApp(App).use(router).use(store).use(pinia).mount('#app')
