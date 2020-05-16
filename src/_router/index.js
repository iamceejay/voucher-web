import Vue from 'vue'
import Router from 'vue-router'
import store from '_store';
import guest from './_middleware/guest'
import auth from './_middleware/auth'
import authUser from './_middleware/authUser'
import authSeller from './_middleware/authSeller'
import authUS from './_middleware/authUS'
import authSSU from './_middleware/authSSU'
import middlewarePipeline from './_middleware/middlewarePipeline'
import Login from '_pages/Login/'
import Register from '_pages/Register/'
import Home from '_pages/Home/'
import Vouchers from '_pages/Vouchers/'
import NewVoucher from '_pages/Vouchers/New/'
import StatisticsVoucher from '_pages/Vouchers/Statistics/'
import OrdersEarnings from '_pages/OrdersEarnings/'
import Profile from '_pages/Profile/'
import Redemptions from '_pages/Redemptions/'
import Scanner from '_pages/Scanner/'
import ScannerUsers from '_pages/ScannerUsers/'
import ScannerUserNew from '_pages/ScannerUsers/New/'
import Cart from '_pages/Cart/'
import Wallet from '_pages/Wallet/'
import VoucherCategory from '_pages/Vouchers/Category/'
import Orders from '_pages/Orders/'
import VoucherSearch from '_pages/Vouchers/Search/'
import VoucherSendEmail from '_pages/Vouchers/SendEmail/'
import VoucherTransfer from '_pages/Vouchers/Transfer/'
import VoucherDetail from '_pages/Vouchers/Detail/'
import VoucherPersonalized from '_pages/Vouchers/Personalized/'
import SellerDetail from '_pages/Seller/Detail/'
import Payment from '_pages/Payment/'
import PageNotFound from '_pages/Errors/PageNotFound'
import UserNotAllowed from '_pages/Errors/UserNotAllowed'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { 
      path: '/login', 
      name: 'login', 
      component: Login,
      meta: {
        middleware: [ guest ]
      } 
    },{ 
      path: '', 
      component: Home,
      meta: {
        middleware: [ guest ]
      } 
    },{ 
      path: '/register', 
      name: 'register', 
      component: Register,
      meta: {
        middleware: [ guest ]
      } 
    },{ 
      path: '/home', 
      name: 'home', 
      component: Home,
      meta: {
      } 
    },{ 
      path: '/vouchers', 
      name: 'vouchers', 
      component: Vouchers,
      meta: {
        middleware: [ auth, authSeller ]
      } 
    },{ 
      path: '/vouchers/new', 
      name: 'vouchers-new', 
      component: NewVoucher,
      meta: {
        middleware: [ auth, authSeller ]
      } 
    },{ 
      path: '/vouchers/update/:id', 
      name: 'vouchers-update', 
      component: NewVoucher,
      meta: {
        middleware: [ auth, authSeller ]
      } 
    },{ 
      path: '/vouchers/statistic/:id', 
      name: 'vouchers-statistic', 
      component: StatisticsVoucher,
      meta: {
        middleware: [ auth, authSeller ]
      } 
    },{ 
      path: '/scanner', 
      name: 'scanner', 
      component: Scanner,
      meta: {
        middleware: [ auth, authSSU ]
      } 
    },{ 
      path: '/orders-earnings', 
      name: 'orders-earnings', 
      component: OrdersEarnings,
      meta: {
        middleware: [ auth, authSeller ]
      } 
    },{ 
      path: '/redemptions', 
      name: 'redemptions', 
      component: Redemptions,
      meta: {
        middleware: [ auth, authSeller ]
      } 
    },{ 
      path: '/profile-settings', 
      name: 'profile-settings', 
      component: Profile,
      meta: {
        middleware: [ auth, authUS ]
      } 
    },{ 
      path: '/scanner-users', 
      name: 'scanner-users', 
      component: ScannerUsers,
      meta: {
        middleware: [ auth, authSeller ]
      } 
    },{ 
      path: '/scanner-users/new', 
      name: 'scanner-users-new', 
      component: ScannerUserNew,
      meta: {
        middleware: [ auth, authSeller ]
      } 
    },{ 
      path: '/cart', 
      name: 'cart', 
      component: Cart,
      meta: {
        middleware: [ auth, authUser ]
      } 
    },{ 
      path: '/wallet', 
      name: 'wallet', 
      component: Wallet,
      meta: {
        middleware: [ auth, authUser ]
      } 
    },{ 
      path: '/orders', 
      name: 'orders', 
      component: Orders,
      meta: {
        middleware: [ auth, authUser ]
      } 
    },{ 
      path: '/vouchers/category/:id', 
      name: 'vouchers-category', 
      component: VoucherCategory,
      meta: {
        middleware: [ auth, authUser ]
      } 
    },{ 
      path: '/vouchers/search', 
      name: 'vouchers-search', 
      component: VoucherSearch,
      meta: {
        middleware: [ auth, authUser ]
      } 
    },{ 
      path: '/vouchers/send-email/:id', 
      name: 'vouchers-send-email', 
      component: VoucherSendEmail,
      meta: {
        middleware: [ auth, authUser ]
      } 
    },{ 
      path: '/vouchers/transfer/:id', 
      name: 'vouchers-transfer', 
      component: VoucherTransfer,
      meta: {
        middleware: [ auth, authUser ]
      } 
    },{ 
      path: '/vouchers/:id', 
      name: 'vouchers-detail', 
      component: VoucherDetail,
      meta: {
        middleware: [ auth, authUser ]
      } 
    },{ 
      path: '/vouchers/personalized/:id', 
      name: 'vouchers-personalized', 
      component: VoucherPersonalized,
      meta: {
        middleware: [ auth, authUser ]
      } 
    },{ 
      path: '/seller/:id', 
      name: 'seller-detail', 
      component: SellerDetail,
      meta: {
        middleware: [ auth, authUser ]
      } 
    },{ 
      path: '/payment', 
      name: 'payment', 
      component: Payment,
      meta: {
        middleware: [ auth, authUser ]
      } 
    },{ 
      path: '*', 
      name: '404', 
      component: PageNotFound,
      meta: {
        middleware: [ auth ]
      } 
    },{ 
      path: '/error/not-allowed', 
      name: 'not-allowed', 
      component: UserNotAllowed,
      meta: {
        middleware: [ auth ]
      } 
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    router,
    store
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router