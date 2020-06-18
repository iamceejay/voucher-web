import { post, get, del } from '_helpers/ApiService'

const prefix = 'scanner-user'

export default {
  state: () => ({
    scannerUsers: [],
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
    async FETCH_SCANNER_USERS( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}`, payload)
        await commit('SET_SCANNER_USERS', data.scanner_users)
        return data
      } catch (err) {
        console.log('err', err)
      }
    },
    async ADD_SCANNER_USER( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}`, payload)
        // await commit('SET_SCANNER_USERS', [
        //   ...state.scannerUsers,
        //   data.scanner_user
        // ])
        return data
      } catch (err) {
        throw err
      }
    },
    async DELETE_SCANNER_USER( { commit, state }, payload )
    {
      try {
        const { data } = await del(`${prefix}/${payload.id}`, {})
        const newList = state.scannerUsers.filter( row => {
          if(row.id == payload.id) {
            row.status = !row.status
          }
          return row
        });
        await commit('SET_SCANNER_USERS', newList)
      } catch (err) {
        throw err
      }
    }
  },
}