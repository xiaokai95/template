import Vue from 'vue'

import 'normalize.css/normalize.css'
import Pagination from '@/components/Pagination'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import App from './App'
import store from './store'
import router from './router'
import '@/icons'
import '@/permission'
Vue.component('Pagination', Pagination)
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
