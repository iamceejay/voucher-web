import Vue from 'vue';
import Router from 'vue-router';
import store from '_store';
import guest from './_middleware/guest';
import auth from './_middleware/auth';
import authUser from './_middleware/authUser';
import authAdmin from './_middleware/authAdmin';
import authSeller from './_middleware/authSeller';
import authGU from './_middleware/authGU';
import authUS from './_middleware/authUS';
import middlewarePipeline from './_middleware/middlewarePipeline';
import Login from '_pages/Subdomain/Login';
import ForgotPassword from '_pages/ForgotPassword/';
import ResetForgotPassword from '_pages/ForgotPassword/ResetPassword';
import Register from '_pages/Register/';
import RegisterBuyer from '_pages/Subdomain/BuyerRegister';
import Vouchers from '_pages/Vouchers/';
import NewVoucher from '_pages/Vouchers/New/';
import StatisticsVoucher from '_pages/Vouchers/Statistics/';
import ProfileInfo from '_pages/Profile/Info/';
import ProfilePayment from '_pages/Profile/Payment/';
import ProfileSettings from '_pages/Profile/Settings/';
import Cart from '_pages/Subdomain/Cart';
import Wallet from '_pages/Subdomain/Wallet';
import VoucherCategory from '_pages/Vouchers/Category/';
import Orders from '_pages/Orders/';
import VoucherSearch from '_pages/Vouchers/Search/';
import VoucherSendEmail from '_pages/Vouchers/SendEmail/';
import VoucherTransfer from '_pages/Vouchers/Transfer/';
import VoucherDetail from '_pages/Subdomain/VoucherDetail';
import VoucherWalletDetail from '_pages/Subdomain/WalletDetail';
import VoucherPersonalized from '_pages/Subdomain/Personalized';
import Home from '_pages/Subdomain';
import Settings from '_pages/Settings/';
import SettingUser from '_pages/Settings/User/';
import Users from '_pages/Users/';
import Payment from '_pages/Subdomain/Payment';
import Transfer from '_pages/Transfer/';
import PageNotFound from '_pages/Errors/PageNotFound';
import UserNotAllowed from '_pages/Errors/UserNotAllowed';
import WishList from '_pages/Subdomain/WishList';
import GuestWallet from '_pages/Subdomain/GuestWallet';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        middleware: [guest],
      },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword,
      meta: {
        middleware: [guest],
      },
    },
    {
      path: '/forgot-password/:token',
      name: 'reset-forgot-password',
      component: ResetForgotPassword,
      meta: {
        middleware: [guest],
      },
    },
    {
      path: '',
      component: Home,
      meta: {
        middleware: [guest],
      },
    },
    ,
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        middleware: [guest],
      },
    },
    {
      path: '/register/buyer',
      name: 'register-buyer',
      component: RegisterBuyer,
      meta: {
        middleware: [guest],
      },
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {},
    },
    {
      path: '/vouchers',
      name: 'vouchers',
      component: Vouchers,
      meta: {
        middleware: [auth, authSeller],
      },
    },
    {
      path: '/vouchers/update/:id',
      name: 'vouchers-update',
      component: NewVoucher,
      meta: {
        back: '/vouchers',
        middleware: [auth, authSeller],
      },
    },
    {
      path: '/vouchers/statistic/:id',
      name: 'vouchers-statistic',
      component: StatisticsVoucher,
      meta: {
        back: '/vouchers',
        middleware: [auth, authSeller],
      },
    },
    {
      path: '/profile-info',
      name: 'profile-info',
      component: ProfileInfo,
      meta: {
        middleware: [auth, authUS],
      },
    },
    {
      path: '/profile-payment',
      name: 'profile-payment',
      component: ProfilePayment,
      meta: {
        middleware: [auth, authUser],
      },
    },
    {
      path: '/profile-settings',
      name: 'profile-settings',
      component: ProfileSettings,
      meta: {
        middleware: [auth, authUS],
      },
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      meta: {
        back: '',
        // middleware: [ auth, authUser ]
      },
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: Wallet,
      meta: {
        middleware: [auth, authUser],
      },
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      meta: {
        middleware: [auth, authUser],
      },
    },
    {
      path: '/voucher/:id',
      name: 'voucher-detail',
      component: VoucherWalletDetail,
      meta: {
        back: '/wallet',
        // middleware: [ authGUS ]
      },
    },
    {
      path: '/vouchers/category/:slug',
      name: 'vouchers-category',
      component: VoucherCategory,
      meta: {
        middleware: [authGU],
      },
    },
    {
      path: '/vouchers/search',
      name: 'vouchers-search',
      component: VoucherSearch,
      meta: {
        middleware: [authGU],
      },
    },
    {
      path: '/vouchers/send-email/:id',
      name: 'vouchers-send-email',
      component: VoucherSendEmail,
      meta: {
        back: '/wallet',
        middleware: [auth, authUser],
      },
    },
    {
      path: '/vouchers/transfer/:id',
      name: 'vouchers-transfer',
      component: VoucherTransfer,
      meta: {
        back: '/wallet',
        middleware: [auth, authUser],
      },
    },
    {
      path: '/vouchers/:id',
      name: 'vouchers-detail',
      component: VoucherDetail,
      meta: {
        back: '/home',
        // middleware: [ authGUS ]
      },
    },
    {
      path: '/vouchers/personalized/:id',
      name: 'vouchers-personalized',
      component: VoucherPersonalized,
      meta: {
        back: '/wallet',
        middleware: [auth, authUser],
      },
    },
    {
      path: '/guest-wallet',
      name: 'guest-wallet',
      component: GuestWallet,
      meta: {
        middleware: [guest],
      },
    },
    {
      path: '/seller/:id',
      name: 'seller-detail',
      component: Home,
      meta: {
        back: '',
        // middleware: [ authGUS ]
      },
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment,
      meta: {
        middleware: [auth, authUser],
      },
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: {
        middleware: [auth, authAdmin],
      },
    },
    {
      path: '/settings/user/:id',
      name: 'settings-user',
      component: SettingUser,
      meta: {
        middleware: [auth, authAdmin],
      },
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: {
        middleware: [auth, authAdmin],
      },
    },
    {
      path: '/transfer/:id',
      name: 'transfer',
      component: Transfer,
      // meta: {
      //   middleware: [ auth, authAdmin ]
      // }
    },
    { path: '/.well-known/*' },
    {
      path: '*',
      name: '404',
      component: PageNotFound,
      meta: {
        middleware: [auth],
      },
    },
    {
      path: '/error/not-allowed',
      name: 'not-allowed',
      component: UserNotAllowed,
      meta: {
        middleware: [auth],
      },
    },
    {
      path: '/wish-list',
      name: 'wish-list',
      component: WishList,
      meta: {
        middleware: [auth, authUser],
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;

  const context = {
    to,
    from,
    next,
    router,
    store,
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
