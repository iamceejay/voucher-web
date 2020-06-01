import Vue from 'vue';
import Vuex from 'vuex';

import Auth from './Modules/Auth/'
import Voucher from './Modules/Voucher/'
import ScannerUser from './Modules/ScannerUser/'
import Cart from './Modules/Cart/'
import Seller from './Modules/Seller/'
import Wallet from './Modules/Wallet/'
import User from './Modules/User/'
import Category from './Modules/Category/'
import Template from './Modules/Template/'
import Region from './Modules/Region/'
import Alert from './Modules/Alert/'
import UserStripe from './Modules/UserStripe/'
import UserVoucher from './Modules/UserVoucher/'
import QrCode from './Modules/QrCode/'
import Redemption from './Modules/Redemption/'
import GlobalSetting from './Modules/GlobalSetting/'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
    Voucher,
    ScannerUser,
    Cart,
    Seller,
    Wallet,
    User,
    Category,
    Template,
    Region,
    Alert,
    UserStripe,
    UserVoucher,
    QrCode,
    Redemption,
    GlobalSetting,
  }
})