import Vue from 'vue';
import Vuex from 'vuex';

import Auth from './Modules/Auth/'
import Voucher from './Modules/Voucher/'
import ScannerUser from './Modules/ScannerUser/'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
    Voucher,
    ScannerUser,
  }
})