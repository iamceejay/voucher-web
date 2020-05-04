export default function IsAuth({ next, store }) {
  const auth = localStorage.getItem('_auth') ? JSON.parse(localStorage.getItem('_auth')) : null
  if(store.getters.AUTH_USER.isAuth || auth?.isAuth) {
    return next({ name: 'dashboard' })
  }

  return next() 
}