import Vue from 'vue';
import Router from 'vue-router';
import store from '_store';
import guest from './_middleware/guest';
import auth from './_middleware/auth';
import authUser from './_middleware/authUser';
import authAdmin from './_middleware/authAdmin';
import authSeller from './_middleware/authSeller';
import authGU from './_middleware/authGU';
import authGUS from './_middleware/authGUS';
import authUS from './_middleware/authUS';
import authSSU from './_middleware/authSSU';
import middlewarePipeline from './_middleware/middlewarePipeline';
import Login from '_pages/Login/';
import ForgotPassword from '_pages/ForgotPassword/';
import ResetForgotPassword from '_pages/ForgotPassword/ResetPassword';
import Register from '_pages/Register/';
import RegisterSeller from '_pages/Register/Seller/';
import RegisterBuyer from '_pages/Register/Buyer/';
import Home from '_pages/Home/';
import Valentines from '_pages/Home/Valentines';
import Easter from '_pages/Home/Easter';
import GuestWallet from '_pages/Home/Guest/Wallet';
import Vouchers from '_pages/Vouchers/';
import VouchersGift from '_pages/Vouchers/Gift';
import NewVoucher from '_pages/Vouchers/New/';
import BuyerNewVoucher from '_pages/Vouchers/New/Buyer';
import StatisticsVoucher from '_pages/Vouchers/Statistics/';
import OrdersEarnings from '_pages/OrdersEarnings/';
import Profile from '_pages/Profile/';
import ProfileInfo from '_pages/Profile/Info/';
import WebsiteConfiguration from '_pages/Profile/Info/WebConfig';
import ProfilePayment from '_pages/Profile/Payment/';
import ProfileSettings from '_pages/Profile/Settings/';
import Redemptions from '_pages/Redemptions/';
import Scanner from '_pages/Scanner/';
import ScannerUsers from '_pages/ScannerUsers/';
import ScannerUserNew from '_pages/ScannerUsers/New/';
import Cart from '_pages/Cart/';
import VoucherGiftCart from '_pages/Cart/Gift';
import Wallet from '_pages/Wallet/';
import WalletVouchers from '_pages/Wallet/Vouchers';
import VoucherCategory from '_pages/Vouchers/Category/';
import Orders from '_pages/Orders/';
import VoucherSearch from '_pages/Vouchers/Search/';
import VoucherSendEmail from '_pages/Vouchers/SendEmail/';
import VoucherTransfer from '_pages/Vouchers/Transfer/';
import VoucherDetail from '_pages/Vouchers/Detail/';
import VoucherWalletDetail from '_pages/Vouchers/WalletDetail/';
import BuyerVoucherWalletDetail from '_pages/Vouchers/WalletDetail/BuyerVoucher';
import VoucherPersonalized from '_pages/Vouchers/Personalized/';
import BuyerVoucherPersonalized from '_pages/Vouchers/Personalized/BuyerVoucher';
import SellerDetail from '_pages/Seller/Detail/';
import VoucherManageFeature from '_pages/Vouchers/ManageFeature/';
import Settings from '_pages/Settings/';
import SettingUser from '_pages/Settings/User/';
import Category from '_pages/Category/';
import SubCategory from '_pages/SubCategory/';
import AdminSubdomain from '_pages/Subdomain/AdminSubdomain';
import Payout from '_pages/Payout/';
import Template from '_pages/Template/';
import Users from '_pages/Users/';
import ManageOrders from '_pages/Orders/Manage/';
import Payment from '_pages/Payment/';
import Transfer from '_pages/Transfer/';
import BuyerVoucherTransfer from '_pages/Transfer/BuyerVoucher';
import PageNotFound from '_pages/Errors/PageNotFound';
import UserNotAllowed from '_pages/Errors/UserNotAllowed';
import WishList from '_pages/WishList';

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
    {
      path: '/liebe',
      name: 'valentines',
      component: Valentines,
    },
    {
      path: '/ostern',
      name: 'easter',
      component: Easter,
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
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        middleware: [guest],
      },
    },
    {
      path: '/register/seller',
      name: 'register-seller',
      component: RegisterSeller,
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
      path: '/vouchers-gift',
      name: 'vouchers-gift',
      component: VouchersGift,
      meta: {
        middleware: [auth, authSeller],
      },
    },
    {
      path: '/vouchers/new',
      name: 'vouchers-new',
      component: NewVoucher,
      meta: {
        back: '/vouchers',
        middleware: [auth, authSeller],
      },
    },
    {
      path: '/wallet/vouchers/new',
      name: 'buyers-vouchers-new',
      component: BuyerNewVoucher,
      meta: {
        back: '/wallet',
        middleware: [auth],
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
      path: '/scanner',
      name: 'scanner',
      component: Scanner,
      meta: {
        middleware: [auth, authSSU],
      },
    },
    {
      path: '/orders-earnings',
      name: 'orders-earnings',
      component: OrdersEarnings,
      meta: {
        middleware: [auth, authSeller],
      },
    },
    // {
    //   path: '/redemptions',
    //   name: 'redemptions',
    //   component: Redemptions,
    //   meta: {
    //     middleware: [auth, authAdmin],
    //   },
    // },
    {
      path: '/website-configuration',
      name: 'website-configuration',
      component: WebsiteConfiguration,
      meta: {
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
    // {
    //   path: '/scanner-users',
    //   name: 'scanner-users',
    //   component: ScannerUsers,
    //   meta: {
    //     middleware: [ auth, authSeller ]
    //   }
    // }, {
    //   path: '/scanner-users/new',
    //   name: 'scanner-users-new',
    //   component: ScannerUserNew,
    //   meta: {
    //     back: '/scanner-users',
    //     middleware: [ auth, authSeller ]
    //   }
    // },
    {
      path: '/vouchers-gift/:id',
      name: 'vouchers-gift-details',
      component: VoucherGiftCart,
      meta: {
        middleware: [auth, authSeller],
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
      path: '/wallet/vouchers',
      name: 'wallet-vouchers',
      component: WalletVouchers,
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
      path: '/buyer/voucher/:id',
      name: 'buyer-voucher-detail',
      component: BuyerVoucherWalletDetail,
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
      path: '/buyer/vouchers/personalized/:id',
      name: 'buyer-vouchers-personalized',
      component: BuyerVoucherPersonalized,
      meta: {
        back: '/wallet',
        middleware: [auth, authUser],
      },
    },
    {
      path: '/seller/:id',
      name: 'seller-detail',
      component: SellerDetail,
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
      path: '/featured-vouchers',
      name: 'featured-vouchers',
      component: VoucherManageFeature,
      meta: {
        middleware: [auth, authAdmin],
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
    // , {
    //   path: '/payment',
    //   name: 'payment',
    //   component: Payment,
    //   meta: {
    //     middleware: [ auth, authAdmin ]
    //   }
    // }
    {
      path: '/category',
      name: 'category',
      component: Category,
      meta: {
        middleware: [auth, authAdmin],
      },
    },
    {
      path: '/sub-category',
      name: 'sub-category',
      component: SubCategory,
      meta: {
        middleware: [auth, authAdmin],
      },
    },
    {
      path: '/subdomain',
      name: 'subdomain',
      component: AdminSubdomain,
      meta: {
        middleware: [auth, authAdmin],
      },
    },
    {
      path: '/payout',
      name: 'payout',
      component: Payout,
      meta: {
        middleware: [auth, authAdmin],
      },
    },
    {
      path: '/template',
      name: 'template',
      component: Template,
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
      path: '/manage-orders',
      name: 'manage-orders',
      component: ManageOrders,
      meta: {
        middleware: [auth, authAdmin],
      },
    },
    {
      path: '/ein-liebevolles-geschenk/:id',
      name: 'transfer',
      component: Transfer,
      // meta: {
      //   middleware: [ auth, authAdmin ]
      // }
    },
    {
      path: '/transfer/:id',
      redirect: { name: 'transfer' }
      // meta: {
      //   middleware: [ auth, authAdmin ]
      // }
    },
    {
      path: '/buyer-voucher/transfer/:id',
      name: 'buyer-transfer',
      component: BuyerVoucherTransfer,
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
    {
      path: '/voucher-redemptions',
      name: 'voucher-redemptions',
      component: Redemptions,
      meta: {
        middleware: [auth, authAdmin],
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
