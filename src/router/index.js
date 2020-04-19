import Vue from 'vue'
import Router from 'vue-router'
import HelloWanx from '@/components/HelloWanx'
import wanx_index from '@/components/wanx_index'
import wanx_bus from '@/components/wanx_bus'
import wanx_order from '@/components/wanx_order'
import wanx_user from '@/components/wanx_user'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWanx',
      component: HelloWanx
    },
    {
      path: '/wanx_index',
      name: 'wanx_index',
      component: wanx_index
    },
    {
      path: '/wanx_bus',
      name: 'wanx_bus',
      component: wanx_bus
    },
    {
      path: '/wanx_order',
      name: 'wanx_order',
      component: wanx_order
    },
    {
      path: '/wanx_user',
      name: 'wanx_user',
      component: wanx_user
    }
  ]
})
