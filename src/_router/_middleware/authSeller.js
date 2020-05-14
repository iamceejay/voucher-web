const authSeller = async ({ next, store }) => {
  const auth = localStorage.getItem('_auth') ? await JSON.parse(localStorage.getItem('_auth')) : null
  if( auth ) {
    if( auth.data.user_role.role.name != 'seller' ) {
      return next({ name: 'not-allowed' })
    }
  }

  return next() 
}

export default authSeller