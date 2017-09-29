import Vue from 'vue'
import Router from 'vue-router'

import home from '../pages/home/index.vue'
import productDetail from '../pages/product/detail.vue'
import productList from '../pages/product/productList.vue'
import shoppingcardsList from '../pages/shoppingcard/cardList.vue'
import Login from '../pages/security/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home
    },
    {
      path: '/security/login',
      name: 'login',
      component: Login
    },
    {
      path: '/product/detail',
      name: 'productDetail',
      component: productDetail
    },
    {
      path: '/product/list',
      name: 'productList',
      component: productList
    },
    {
      path: '/shoppingcard/list',
      name: 'shoppingcardList',
      component: shoppingcardsList
    }
  ]
})
