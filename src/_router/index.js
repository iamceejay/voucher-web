import Vue from 'vue'
import Router from 'vue-router'
import store from '_store';
import guest from './_middleware/guest'
import auth from './_middleware/auth'
import middlewarePipeline from './_middleware/middlewarePipeline'
import Login from '_pages/Login/'
import Home from '_pages/Home/'
import MyVouchers from '_pages/MyVouchers/'
import NewVoucher from '_pages/MyVouchers/New'
import OrdersEarnings from '_pages/OrdersEarnings/'
import Profile from '_pages/Profile/'
import Redemptions from '_pages/Redemptions/'
import Scanner from '_pages/Scanner/'
import ScannerUsers from '_pages/ScannerUsers/'
import ScannerUserNew from '_pages/ScannerUsers/New'
import PageNotFound from '_pages/Errors/PageNotFound'
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
      component: Login,
      meta: {
        middleware: [ guest ]
      } 
    },{ 
      path: '/home', 
      name: 'home', 
      component: Home,
      meta: {
        middleware: [ auth ]
      } 
    },{ 
      path: '/my-vouchers', 
      name: 'my-vouchers', 
      component: MyVouchers,
      meta: {
        middleware: [ auth ]
      } 
    },{ 
      path: '/vouchers/new', 
      name: 'vouchers-new', 
      component: NewVoucher,
      meta: {
        middleware: [ auth ]
      } 
    },{ 
      path: '/scanner', 
      name: 'scanner', 
      component: Scanner,
      meta: {
        middleware: [ auth ]
      } 
    },{ 
      path: '/orders-earnings', 
      name: 'orders-earnings', 
      component: OrdersEarnings,
      meta: {
        middleware: [ auth ]
      } 
    },{ 
      path: '/redemptions', 
      name: 'redemptions', 
      component: Redemptions,
      meta: {
        middleware: [ auth ]
      } 
    },{ 
      path: '/profile-settings', 
      name: 'profile-settings', 
      component: Profile,
      meta: {
        middleware: [ auth ]
      } 
    },{ 
      path: '/scanner-users', 
      name: 'scanner-users', 
      component: ScannerUsers,
      meta: {
        middleware: [ auth ]
      } 
    },{ 
      path: '/scanner-users/new', 
      name: 'scanner-users-new', 
      component: ScannerUserNew,
      meta: {
        middleware: [ auth ]
      } 
    },{ 
      path: '*', 
      name: '404', 
      component: PageNotFound,
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
    store
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router