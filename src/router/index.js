import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Ping from '@/components/Ping'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/ping',
      name: 'Ping',
      component: Ping
    }
  ],
  mode: 'history'
})
