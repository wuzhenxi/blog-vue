import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userInfo: JSON.parse(sessionStorage.getItem("blog_user"))
  },
  mutations: {
    // set
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem("blog_token", token)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      sessionStorage.setItem("blog_user", JSON.stringify(userInfo))
    },
    REMOVE_INFO: (state) => {
      state.token = ''
      state.userInfo = {}
      localStorage.setItem("blog_token", '')
      sessionStorage.setItem("blog_user", JSON.stringify(''))
    }

  },
  getters: {

    getUser: state => {
      return state.userInfo
    },

    getToken: state => {
      return state.token
    },
    
    getState: state => {
      return state
    }

  },
  actions: {
  },
  modules: {
  }
})
