import { post, get } from '_helpers/ApiService'

export default {
  state: () => ({
    auth: {
      isAuth: false,
      token: '',
      role: {
        id: null,
        name: null,
      },
      data: null
    },
  }),
  getters: {
    AUTH_USER(state) 
    {
      return state.auth;
    },
  },
  mutations: {
    SET_AUTH_USER(state, payload) 
    {
      state.auth = payload;
    },
  },
  actions: {
    async LOGIN(context, payload) 
    {
      try {
        const { data } = await post('auth/login', payload)
        return data
      } catch (err) {
        throw err
      }
    },
    async LOGOUT(context, payload) 
    {
      try {
        const { data } = await post('auth/logout')
        return data
      } catch (err) {
        throw err
      }
    }
  },
}