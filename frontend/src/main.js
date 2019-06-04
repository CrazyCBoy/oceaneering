import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import './assets/css/common.css'
import './assets/font/iconfont.css'

Vue.config.productionTip = false

Vue.prototype.bus = new Vue();

Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
