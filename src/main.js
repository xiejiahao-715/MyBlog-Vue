import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/router/permission'
import store from './store'

import '@/assets/css/global.scss'


// import ElementPlus from 'element-plus'
// // 国际化
// import ElementPlusLocaleZhCn from 'zh-cn'

createApp(App)
    .use(store)
    .use(router)
    // .use(ElementPlus,{locale: ElementPlusLocaleZhCn})
    .mount('#app')


