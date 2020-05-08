import Vue from 'vue'
import App from './App.vue'
import router from '_router'
import store from '_store';
import '_assets/css/tailwind.css'
import '_assets/css/styles.css'

import Vuex from 'vuex'
import VueFileAgent from 'vue-file-agent';
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueFileAgent);
Vue.use(VueSweetalert2);

Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
