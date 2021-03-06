import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import interceptors from './config/axios'
import './plugins/moment'

Vue.config.productionTip = false
interceptors()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
