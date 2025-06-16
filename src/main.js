import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.router'
import { createPinia } from 'pinia';
import { useTheme } from './helpers/ThemeHelper';

const app = createApp(App);

const pinia = createPinia()

const themeHelper = useTheme();

app.config.globalProperties.$theme = themeHelper;

app.use(pinia).use(router).mount('#app');
