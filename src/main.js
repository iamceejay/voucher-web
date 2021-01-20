import Vue from 'vue'
import App from './App.vue'
import router from '_router'
import store from '_store'
import '_assets/css/tailwind.css'
import '_assets/css/styles.css'
import helpers from '_helpers/Functions'
import BackBtn from '_components/Button/BackBtn';

import Vuex from 'vuex'
import VueFileAgent from 'vue-file-agent'
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import '_helpers/VeeValidate'
import VueTippy, { TippyComponent } from "vue-tippy";

import VueGtag from "vue-gtag"

const plugin = {
  install () {
    Vue.helpers = helpers
    Vue.prototype.$helpers = helpers
  }
}
Vue.use(VueTippy);

Vue.use(plugin)
Vue.use(VueFileAgent)
Vue.use(VueSweetalert2)
Vue.use(Vuex)
Vue.use(VueGtag, {
  config: { id: "G-FCYT763C30" }
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('BackBtn', BackBtn)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
