import Vue from "vue"
import App from './App.vue'

// Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 全局样式
import './style/index.scss'

Vue.use(ElementUI, { size: 'small' })

Vue.config.productionTip = false

new Vue({
  // template: `<div id="app">Hello World</div>`
  render: h => h(App),
}).$mount('#app')
