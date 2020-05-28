import { post, get } from '_helpers/ApiService'
import moment from 'moment'

const prefix = 'user-stripe'

export default {
  state: () => ({
    userStripes: [],
    userStripe: null
  }),
  getters: {
    USER_STRIPES(state) {
      return state.userStripes;
    },
  },
  mutations: {
    SET_USER_STRIPES(state, payload) {
      state.userStripes = payload
    },
    SET_USER_STRIPE(state, payload) {
      state.userStripes = payload
    },
  },
  actions: {
    async FETCH_USER_STRIPE( { commit, state }, payload )
    {
      await commit('SET_USER_STRIPE', data)
      return data
    },
    async ADD_USER_STRIPE( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}`, payload)
        return data
      } catch (err) {
        throw err
      }
    },
    UPDATE_USER_STRIPE( { commit, state }, payload )
    {
      const newData = state.userStripes.map( row => {
        if( row.id == payload.id ) {
          row.label = payload.label
          row.icon = payload.icon
        }
        return row
      })
      commit('SET_USER_STRIPES', newData)
    },
    async DELETE_USER_STRIPE( { commit, state }, payload )
    {
      const newData = state.userStripes.filter( row => row.id != payload.id )
      await commit('SET_USER_STRIPES', newData)
    }
  },
}