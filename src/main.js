import '@/assets/BootStrap/css/bootstrap.min.css';
import '@/assets/BootStrap/js/bootstrap.bundle.min.js';

import axios from 'axios'
import Cookies from 'js-cookie';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

axios.defaults.baseURL = 'http://127.0.0.1:8000/';
axios.defaults.timeout = 60000;
axios.defaults.withCredentials = true;

app.config.globalProperties.$axios = axios;
app.use(router)
app.mount('#app')
