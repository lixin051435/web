import Vue from 'vue'
import Router from 'vue-router'
import Company from '@/components/Company'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Device from '@/components/Device'
import DeviceUpdate from '@/components/DeviceUpdate'
import DeviceDetail from '@/components/DeviceDetail'
import MyMatch from '@/components/MyMatch'
import MatchDetail from '@/components/MatchDetail'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Login',
    component: Login
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/deviceDetail',
    name: 'DeviceDetail',
    component: DeviceDetail
  }, {
    path: '/company',
    name: 'Company',
    component: Company
  },{
    path: '/myMatches',
    name: 'MyMatch',
    component: MyMatch
  },{
    path: '/matchDetail',
    name: 'MatchDetail',
    component: MatchDetail
  }, {
    path: '/index',
    name: 'Index',
    component: Index
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
