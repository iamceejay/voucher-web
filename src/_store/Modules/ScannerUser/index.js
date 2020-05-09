import { post, get } from '_helpers/ApiService'

export default {
  state: () => ({
    scannerUsers: [
      {
        id: 1,
        username: 'Mike',
        password: 'Jhonson',
        email: 'mike@gmail.com'
      }, {
        id: 2,
        username: 'Chris',
        password: 'Jhonson',
        email: 'chris@gmail.com'
      }, {
        id: 3,
        username: 'Jasper',
        password: 'Jhonson',
        email: 'jasper@gmail.com'
      }, {
        id: 4,
        username: 'Joe',
        password: 'Jhonson',
        email: 'joe@gmail.com'
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
    ADD_SCANNER_USER( { commit, state }, payload )
    {
      commit('SET_SCANNER_USERS', [
        ...state.scannerUsers,
        {
          id: ++state.scannerUsers.length,
          ...payload,
        }
      ])
    },
    DELETE_SCANNER_USER( { commit, state }, payload )
    {
      console.log('payload', payload)
      const newList = state.scannerUsers.filter( user => user.id != payload.id);
      commit('SET_SCANNER_USERS', newList)
    }
  },
}