import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MusicListItem from '../views/MusicListItem'
import { FooterMusicStore } from '@/store/FooterMusic.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/MusicListItem',
    name: 'MusicListItem',
    component: MusicListItem
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/SearchMusic.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/infoUser',
    name: 'InfoUser',
    // 独享路由守卫
    beforeEnter: (to, from, next) => {
      // pinia要在这里定义
      const store = FooterMusicStore()
      if (store.isLogin || store.token || localStorage.getItem('token')) {
        next()
      } else {
        next('/login')
      }
    },
    component: () => import('../views/InfoUser.vue')
  }
] 

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局前置守卫
router.beforeEach((to, from) => {
  const store = FooterMusicStore()
  if (to.path === '/login') {
    store.isFooterMusic = false
  } else {
    store.isFooterMusic = true
  }
}) 

export default router
