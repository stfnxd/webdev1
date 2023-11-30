import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ContractForm from '@/components/ContractForm.vue'
import ContractPreview from '@/components/ContractPreview.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.component('ContractForm', ContractForm);
app.component('ContractPreview', ContractPreview);

app.use(router)

app.mount('#app')
