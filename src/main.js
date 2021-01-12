import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import axios from 'axios'

import mavonEditor from 'mavon-editor'

import "element-ui/lib/theme-chalk/index.css"
import 'mavon-editor/dist/css/index.css'

import "./axios"
import "./permission"
import "./icons"
import { JSEncrypt } from 'jsencrypt'

Vue.use(Element)
Vue.use(mavonEditor)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$getRsaEncrypt = function(str) {
  let encrypt = new JSEncrypt()

  encrypt.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCNGF7SYb4F8wMHnEXVjfgJJVZqKK/ZiSzZnOtRQoa6qTLs+kw72/2shtXx+hIBkRNbNncsbUnw9QZASL9Xqd90PVDWMYQLaB5JCaiRu8iBU2P8OmOGUz7YbuNvmEsfYEPn9v33Sh1zuh9hFWlFTtHbN6VQv0Rge4JaTxVM8Q9CUQIDAQAB')

  return encrypt.encrypt(str);
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
