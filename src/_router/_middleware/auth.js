const auth = async ({ next, store, router }) => {
  const auth = localStorage.getItem('_auth') ? await JSON.parse(localStorage.getItem('_auth')) : null
  if(!auth || typeof auth == 'null') {
    return router.push({ name: 'login' })
  }
  
  return next() 
}

export default auth