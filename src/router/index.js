import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Blogs from '../views/blog/Blogs.vue'
import BlogEdit from '../views/blog/BlogEdit.vue'
import BlogDetail from '../views/blog/BlogDetail.vue'
import NotFound from '../views/error-page/404.vue'
import Page401 from '../views/error-page/401.vue'
import LogQuery from '../views/log/logView.vue'
import Profile from '../views/account/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: {name: "Blogs"}
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/401',
    name: 'Page401',
    component: Page401
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/blog/add',
    name: 'BlogAdd',
    component: BlogEdit,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    component: BlogEdit,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/log/query',
    name: 'LogQuery',
    component: LogQuery,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/account',
    name: 'Profile',
    component: Profile,
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
