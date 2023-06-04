import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Contas.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'autenticacao',
    component: () => import('../views/Autenticacao.vue')
  },
  {
    path: '/contas',
    name: 'contas',
    component: () => import('../views/Contas.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
