import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import underscore from 'vue-underscore'

Vue.component('v-icon', Icon)

import './plugins/filters'

Vue.use(BootstrapVue)
Vue.use(Notifications)
Vue.use(underscore)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
