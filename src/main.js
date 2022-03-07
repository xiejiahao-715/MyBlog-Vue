import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/router/permission'
import store from './store'

import '@/assets/css/global.scss'

// 导入github样式表，如果cdn引入这不需要导入
import "github-markdown-css"

// highlight.js样式表
import "highlight.js/styles/arduino-light.css"

import 'element-plus/es/components/message-box/style/css'

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')


