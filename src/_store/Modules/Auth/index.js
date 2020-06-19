import { post, get } from '_helpers/ApiService'

const prefix = 'auth'

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
        const { data } = await post(`${prefix}/login`, payload)
        return data
      } catch (err) {
        throw err
      }
    },
    async LOGOUT(context, payload) 
    {
      try {
        const { data } = await post(`${prefix}/logout`)
        return data
      } catch (err) {
        throw err
      }
    },
    async FORGOT_PASSWORD(context, payload) 
    {
      try {
        const { data } = await post(`${prefix}/forgot-password`, payload)
        return data
      } catch (err) {
        throw err
      }
    },
    async RESET_PASSWORD(context, payload) 
    {
      try {
        const { data } = await post(`${prefix}/reset-password`, payload)
        return data
      } catch (err) {
        throw err
      }
    },
    async CHANGE_ROLE( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}/change-role`, payload)
        return data
      } catch (err) {
        throw err
      }
    }
  },
}