import Vue from 'vue';
import Vuex from 'vuex';

import Auth from './Modules/Auth/'
import Voucher from './Modules/Voucher/'
import ScannerUser from './Modules/ScannerUser/'
import Cart from './Modules/Cart/'
import Seller from './Modules/Seller/'
import Wallet from './Modules/Wallet/'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
    Voucher,
    ScannerUser,
    Cart,
    Seller,
    Wallet,
  }
})