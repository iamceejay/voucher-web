import Vue from 'vue';
import Vuex from 'vuex';

import Auth from './Modules/Auth';
import Voucher from './Modules/Voucher';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
    Voucher
  }
})