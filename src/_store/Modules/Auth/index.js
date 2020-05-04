import { post, get } from '_helpers/ApiService'

export default {
  state: () => ({
    auth: {
      isAuth: false,
      data: {}
    },
  }),
  getters: {
    AUTH_USER(state) {
      return state.auth;
    },
  },
  mutations: {
    SET_AUTH_USER(state, payload) {
      state.auth = payload;
    },
  },
  actions: {
    async LOGIN(context, payload) {
      try {
        const { data } = await post('auth/login', payload)
        console.log('data', data)
        return data
      } catch (error) {
        
      }
    }
  },
}