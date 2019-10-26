import Vue from 'vue'
import VueRouter from 'vue-router'

import Cookies from '@/plugins/cookies'
import store from './../store/index'

// ---------------------------- views

//Pages
import Home from '../views/Home.vue'
import login from '../views/login.vue'
import states from '../views/states.vue'
import transfer from '../views/transfer.vue'
import transaction from '../views/transaction.vue'
import accounts from '../views/accounts.vue'
import userInfo from '../views/userInfo.vue'

// ---------------------------- components


// ---------------------------- VueRouter

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    beforeEnter: requireAuth,
    component: Home,
    children: [
      {
        path: '',
        name: 'states',
        beforeEnter: requireAuth,
        component: states,
      },
      {
        path: 'transfer',
        name: 'transfer',
        beforeEnter: requireAuth,
        component: transfer,
      },
      {
        path: 'transactions',
        name: 'transaction',
        beforeEnter: requireAuth,
        component: transaction,
      },
      {
        path: 'accounts',
        name: 'accounts',
        beforeEnter: requireAuth,
        component: accounts,
      },
      {
        path: 'info',
        name: 'userInfo',
        beforeEnter: requireAuth,
        component: userInfo,
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter: isLoggedOut,
    component: login
  },
  {
    path: '/*',
    redirect: '/'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function requireAuth(to, from, next) {
  if (!store.getters.getLoginStatus) {
    let userToken = Cookies.getCookies('x-auth-tok')
    if (userToken) {
      store.dispatch('getAdminData' , {token: userToken})
      next()
    } else {
      next("/login")
    }
  } else {
    next()
  }
}

function isLoggedOut(to, from, next) {
  if (!store.getters.getLoginStatus) {
    let userToken = Cookies.getCookies('x-auth-tok')
    if (!userToken) {
      next()
    } else {
      next("/home")
    }
  } else {
    next()
  }
}


export default router
