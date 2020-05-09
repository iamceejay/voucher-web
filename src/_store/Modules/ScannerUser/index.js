import { post, get } from '_helpers/ApiService'

export default {
  state: () => ({
    scannerUsers: [
      {
        id: 1,
        firstName: 'Mike',
        lastName: 'Jhonson',
      }, {
        id: 2,
        firstName: 'Chris',
        lastName: 'Jhonson',
      }, {
        id: 3,
        firstName: 'Jasper',
        lastName: 'Jhonson',
      }, {
        id: 4,
        firstName: 'Joe',
        lastName: 'Jhonson',
      }
    ],
  }),
  getters: {
    SCANNER_USERS(state) {
      return state.scannerUsers;
    },
  },
  mutations: {
    SET_SCANNER_USERS(state, payload) {
      state.scannerUsers = payload;
    },
  },
  actions: {
    DELETE_SCANNER_USER( { commit, state }, payload )
    {
      console.log('payload', payload)
      const newList = state.scannerUsers.filter( user => user.id != payload.id);
      commit('SET_SCANNER_USERS', newList)
    }
  },
}