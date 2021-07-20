import Vue from 'vue'
import App from './App.vue'
import router1 from '_router'
import subdomainRoute from '_router/subdomain'
import store from '_store'
import '_assets/css/tailwind.css'
import '_assets/css/styles.css'
import helpers from '_helpers/Functions'
import BackBtn from '_components/Button/BackBtn';

import Vuex from 'vuex'
import VueFileAgent from 'vue-file-agent'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import '_helpers/VeeValidate'
import VueTippy, { TippyComponent } from "vue-tippy";
import punnycode from 'punycode'
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

const host = window.location.hostname;
const parts = host.split('.');



Vue.mixin({
  computed: {
    wildcard() {
        const host = window.location.hostname;
        const parts = host.split('.');
        if ( parts.length === 3 ) {
          return punnycode.toUnicode(parts[0])
        }

        return null
    },
  }
})


const router = () => {

  if ( parts.length === 3 ) {
    return subdomainRoute
  }

  return router1
};

new Vue({
  router: router(),
  store,
  render: h => h(App),
}).$mount('#app')
