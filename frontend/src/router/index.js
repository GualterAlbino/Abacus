import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Transacao.vue'

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
    component: () => import('../views/Transacao.vue')
  },
  {
    path: '/categorias',
    name: 'categorias',
    component: () => import('../views/Categoria.vue')
  },
  {
    path: '/historico',
    name: 'historico',
    component: () => import('../views/Historico.vue')
  },
  {
    path: '/config',
    name: 'configuracao',
    component: () => import('../views/Configuracao.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
