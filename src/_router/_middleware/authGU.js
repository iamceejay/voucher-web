const authGU = async ({ next, store }) => {
  const auth = localStorage.getItem('_auth') ? await JSON.parse(localStorage.getItem('_auth')) : null
  if( auth ) {
    if( !['user', 'guest'].includes(auth.data.user_role.role.name) ) {
      return next({ name: 'not-allowed' })
    }
  }

  return next() 
}

export default authGU