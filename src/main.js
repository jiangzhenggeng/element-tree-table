// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-default/index.css'
import '../lib/index.css'

import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui'
import TreeGrid from './index'

Vue.use(ElementUI)
Vue.use(TreeGrid)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
