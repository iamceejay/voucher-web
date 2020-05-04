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

  },
}