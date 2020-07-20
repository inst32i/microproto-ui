import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Ping from '@/components/Ping'
import Zhang from '@/components/zhang'
import Chen from '@/components/chen'
import Graph from '@/components/graph'
import Config from '@/components/config'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/ping',
      name: 'ping',
      component: Ping
    },
    {
      path: '/zhang',
      name: 'zhang',
      component: Zhang
    },
    {
      path: '/chen',
      name: 'chen',
      component: Chen
    },
    {
      path: '/graph',
      name: 'graph',
      component: Graph
    },
    {
      path: '/config',
      name: 'config',
      component: Config
    }
  ],
  mode: 'history'
})
