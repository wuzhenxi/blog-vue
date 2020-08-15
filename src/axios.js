import axios from 'axios'
import Element from 'element-ui'
import router from './router'
import store from './store'

// axios.defaults.baseURL = "http://localhost:8081"
axios.defaults.baseURL = "https://139.9.176.197:8081"

// 前置拦截
axios.interceptors.request.use(config => {
  let token = localStorage.getItem("blog_token");
  if(token && ("undefined" != token)) {
    config.headers = {
      'Authorization': token
    }
  }
  return config
})

axios.interceptors.response.use(response => {
    let res = response.data;
    if (res.code === 200) {
      return response
    } else if (res.code === 400) {
      Element.Notification.warning(res.msg, {duration: 3 * 1000})
    } else {

      Element.Notification.error('错了哦，这是一条错误消息', {duration: 3 * 1000})

      return Promise.reject(response.data.msg)
    }
  },
  error => {
    console.log(error)
    if(error.response.data) {
      error.message = error.response.data.msg
    }

    if(error.response.status === 400) {
      Element.Message.warning(error.message, {duration: 3 * 1000})
    }

    if(error.response.status === 401) {
      store.commit("REMOVE_INFO")
      router.push("/login")
    }

    Element.Message.error(error.message, {duration: 3 * 1000})
    return Promise.reject(error)
  }
)