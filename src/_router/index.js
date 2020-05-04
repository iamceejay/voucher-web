import Vue from 'vue'
import Router from 'vue-router'
import store from '_store';
import guest from './_middleware/guest'
import middlewarePipeline from './_middleware/middlewarePipeline'
import Dashboard from '_pages/dashboard'
import Login from '_pages/login'
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
      path: '/', 
      component: Login,
      meta: {
        middleware: [ guest ]
      } 
    },{ 
      path: '/dashboard', 
      name: 'dashboard', 
      component: Dashboard,
      meta: {
        // middleware: [IsAuth]
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