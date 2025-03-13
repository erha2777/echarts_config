// import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import echartsRouter from './module/echarts'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path:'/home',
    name: 'home',
    component: HomeView
  },
  ...echartsRouter
]

const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL), // history模式
  history: createWebHashHistory(), // hash模式
  routes
})

export default router
