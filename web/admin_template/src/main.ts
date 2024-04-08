import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
import router from './router';
import installer from './as-needed';
import 'amfe-flexible'
// import DictData from './components/DictData/index.vue';

//引入svg-icons
import 'virtual:svg-icons-register'
//引入全局公共组件
import globalComponents from './components/index.ts'

import 'element-plus/theme-chalk/display.css';
import './styles/themes/dark.scss';
import "./styles/nprogress.scss"
import './styles/index.scss';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(installer);
//使用全局公共组件
app.use(globalComponents)
// app.component('DictData', DictData);

app.mount('#app')
