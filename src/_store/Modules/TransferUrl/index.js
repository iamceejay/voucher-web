import { post, get } from '_helpers/ApiService'
import moment from 'moment'

const prefix = 'transfer-url'

export default {
  state: () => ({
    transfer_url: null
  }),
  getters: {
    TRANSFER_URL(state) {
      return state.transfer_url;
    },
  },
  mutations: {
    SET_TRANSFER_URL(state, payload) {
      state.transfer_url = payload
    },
  },
  actions: {
    async FETCH_TRANSFER_URL( { commit, state }, payload )
    {
      await commit('SET_TRANSFER_URL', data)
      return data
    },
    async ADD_TRANSFER_URL( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}`, payload)
        return data
      } catch (err) {
        throw err
      }
    },
    async UPDATE_TRANSFER_URL( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}/${payload.id}`, payload)
        const newList = state.transfer_url.map( row => {
          if( row.id == payload.id ) {
            row = data.transfer_url
          }
          return row
        })
        return data
      } catch (err) {
        throw err     
      }
    },
    async DELETE_TRANSFER_URL( { commit, state }, payload )
    {
      const newData = state.transfer_url.filter( row => row.id != payload.id )
      await commit('SET_TRANSFER_URL', newData)
    }
  },
}