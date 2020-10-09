import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Ping from '@/components/Ping'
import Rieman from '@/components/rieman'
import Graph from '@/components/graph'
import Input from '@/components/input'
import Templatecreate from '@/components/templatecreate'
import Manifold from '@/components/manifold'
import Ahp from '@/components/ahp'
import D3mhl from '@/components/d3mhl'

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
      path: '/rieman',
      name: 'rieman',
      component: Rieman
    },
    {
      path: '/graph',
      name: 'graph',
      component: Graph
    },
    {
      path: '/input',
      name: 'input',
      component: Input
    },
    {
      path: '/templatecreate',
      name: 'templatecreate',
      component: Templatecreate
    },
    {
      path: '/manifold',
      name: 'manifold',
      component: Manifold
    },
    {
      path: '/ahp',
      name: 'ahp',
      component: Ahp
    },
    {
      path: '/d3mhl',
      name: 'd3mhl',
      component: D3mhl
    },
  ],
  mode: 'history'
})
