import router from "./router";

const whiteList = ['/blogs', '/login', '/401', '/404', 'favicon.ico'] 

// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    const token = sessionStorage.getItem("blog_token")
    const userInfo = JSON.parse(sessionStorage.getItem("blog_user"))
    if (token) { // 判断当前的token是否存在 ； 登录存入的token
      if (to.path === '/login') {
        next({ path: '/login' })
      } else {
        // 查看系统日志
        if(to.path.indexOf('/log/query') != -1 && userInfo) {
          if(userInfo.logView) {
            next()
          } else {
            next({
              path: '/401'
            })
          }
        } else {
          next()
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next({
          path: '/401'
        })
      }
    }
  } else {// 不需要权限
    if (whiteList.indexOf(to.path) !== -1 || to.path.indexOf('/blog/') != -1) {
      next()
    } else {
      next(`/404`)
    }
  }
})