import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/router/permission'
import store from './store'

// 全局样式表
import '@/assets/css/global.scss'

// 导致自定义后的github样式表,主要修改的是 将github默认pre>code有关的样式移除了，使用highlight提供的code代码快的样式
import '@/assets/css/markdown/my-github-markdown.scss'

// ElementUI相关组件的样式
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/message/style/css'

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')


