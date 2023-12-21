import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ContractForm from '@/components/ContractForm.vue'
import Calculation from '@/components/Calculation.vue'
import ContractPreview from '@/components/ContractPreview.vue'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

library.add(faCircleExclamation);

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

app.component('font-awesome-icon', FontAwesomeIcon);

app.component('ContractForm', ContractForm);
app.component('Calculation', Calculation);
app.component('ContractPreview', ContractPreview);

app.use(router)

app.mount('#app')