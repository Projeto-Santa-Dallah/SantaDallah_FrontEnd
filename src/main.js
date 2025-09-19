
import './assets/main.css'
import 'v-calendar/style.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import "./plugins/axios"
const app = createApp(App)


app.use(createPinia())
app.use(router)

// Use plugin defaults (optional)
app.use(setupCalendar, {})

// Use the components
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)


app.mount('#app')