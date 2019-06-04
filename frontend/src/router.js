import Vue from 'vue'
import Router from 'vue-router'

import index from './views/index/main'
import Typhoon from './views/index/typhoon/typhoon.vue'
import fog from './views/index/fog/fog.vue'
import wind from './views/index/wind/wind.vue'
import warning from './views/index/warning/warning.vue'

Vue.use(Router)

export default new Router({
  routes: [
     { path: '/', name: 'index', component: index },
     { path: '/typhoon', name: 'typhoon', component: Typhoon },
     { path: '/fog', name: 'fog', component: fog },
     { path: '/wind', name: 'wind', component: wind },
     { path: '/warning', name: 'warning', component: warning },
  ]
})