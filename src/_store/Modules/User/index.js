import { post, get } from '_helpers/ApiService'
import { users } from '_helpers/DefaultValues'
import moment from 'moment'

const prefix = 'user'

export default {
  state: () => ({
    users: [],
    user: null
  }),
  getters: {
    USER(state) {
      return state.user;
    },
    USERS(state) {
      return state.users;
    },
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },
    SET_USERS(state, payload) {
      state.users = payload
    },
  },
  actions: {
    async FETCH_USER_BY_ROLE( { commit, state }, type )
    {
      const newUsers = users.filter( row => row.user_role.role.name == type )
      await commit('SET_USERS', newUsers)
    },
    async FETCH_USER( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}/${payload.id}`, {
          ...payload.params
        })
        await commit('SET_USER', data.user)
        return data
      } catch (err) {
        throw err
      }
    },
    async ADD_USER( { commit, state }, payload )
    {
      return data
    },
    UPDATE_USER( { commit, state }, payload )
    {
      commit('SET_USER', null)
    },
    async DELETE_USER( { commit, state }, payload )
    {
      const newUsers = state.users.filter( row => row.id != payload.id )
      await commit('SET_USERS', newUsers)
    }
  },
}