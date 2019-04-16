import Vue from 'vue'
import Router from 'vue-router'
import Indexs from '@/components/Index'
import Login from '@/components/Login'
import Company from '@/components/Company'
import Device from '@/components/Device'
import DeviceUpdate from '@/components/DeviceUpdate'
import DeviceDetail from '@/components/DeviceDetail'
import MyGame from '@/components/MyGame'
import GameDetail from '@/components/GameDetail'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Login',
    component: Login
  }, {
    path: '/deviceDetail',
    name: 'DeviceDetail',
    component: DeviceDetail
  }, {
    path: '/team',
    name: 'Index',
    component: Indexs
  },{
    path: '/myMatches',
    name: 'MyGame',
    component: MyGame
  },{
    path: '/matchDetail',
    name: 'GameDetail',
    component: GameDetail
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/company',
    name: 'Company',
    component: Company
  }, {
    path: '/device',
    name: 'Device',
    component: Device
  }, {
    path: '/deviceUpdate',
    name: 'DeviceUpdate',
    component: DeviceUpdate
  }],
  mode: 'history'
})
