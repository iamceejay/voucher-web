const guest = async ({ next, store }) => {
  const auth = localStorage.getItem('_auth')
    ? await JSON.parse(localStorage.getItem('_auth'))
    : null;

  if (process.env.VUE_APP_VALENTINE_LANDING === 'true') {
    return next({ name: 'valentines' });
  }

  if (store.getters.AUTH_USER.isAuth || auth?.isAuth) {
    let path = localStorage.getItem('cart') > 0 ? 'cart' : 'home';
    localStorage.removeItem('cart');

    return next({ name: path });
  }

  return next();
};

export default guest;
