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
import Resume from '../views/resume/'

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
    component: Blogs,
    meta: {
      title: '博客预览'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '用户登录'
    }
  },
  {
    path: '/401',
    name: 'Page401',
    component: Page401,
    meta: {
      title: '无权限'
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '404'
    }
  },
  {
    path: '/blog/add',
    name: 'BlogAdd',
    component: BlogEdit,
    meta: {
      requireAuth: true,
      title: '新增博客'
    }
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail,
    meta: {
      title: '博客详情'
    }
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    component: BlogEdit,
    meta: {
      requireAuth: true,
      title: '编辑博客'
    }
  },
  {
    path: '/log/query',
    name: 'LogQuery',
    component: LogQuery,
    meta: {
      requireAuth: true,
      title: '日志查看'
    }
  },
  {
    path: '/account',
    name: 'Profile',
    component: Profile,
    meta: {
      requireAuth: true,
      title: '个人中心'
    }
  },
  {
    path: '/resume',
    name: 'Resume',
    component: Resume,
    meta: {
      title: '个人简历'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
