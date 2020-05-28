import { post, get } from '_helpers/ApiService'
import moment from 'moment'

const prefix = 'redemption'

export default {
  state: () => ({
    redemptions: [],
    redemption: null
  }),
  getters: {
    REDEMPTIONS(state) {
      return state.redemptions;
    },
    REDEMPTION(state) {
      return state.redemption;
    },
  },
  mutations: {
    SET_REDEMPTIONS(state, payload) {
      state.redemption = payload
    },
    SET_REDEMPTION(state, payload) {
      state.redemption = payload
    },
  },
  actions: {
    async FETCH_REDEMPTION( { commit, state }, payload )
    {
      await commit('SET_REDEMPTION', data)
      return data
    },
    async ADD_REDEMPTION( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}`, payload)
        return data
      } catch (err) {
        throw err
      }
    },
    UPDATE_REDEMPTION( { commit, state }, payload )
    {
      commit('SET_REDEMPTIONS', newData)
    },
    async DELETE_REDEMPTION( { commit, state }, payload )
    {
      await commit('SET_REDEMPTIONS', newData)
    },
  },
}