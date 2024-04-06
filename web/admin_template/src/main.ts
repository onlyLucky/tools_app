import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
import router from './router';
import installer from './as-needed';
import 'amfe-flexible'
// import DictData from './components/DictData/index.vue';

import 'element-plus/theme-chalk/display.css';
import './styles/themes/dark.scss';
import "./styles/nprogress.scss"
import './styles/index.scss';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(installer);
// app.component('DictData', DictData);

app.mount('#app')
