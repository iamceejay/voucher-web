import { post, get } from '_helpers/ApiService'
import { regions } from '_helpers/DefaultValues'
import moment from 'moment'

export default {
  state: () => ({
    regions,
    region: null
  }),
  getters: {
    REGIONS(state) {
      return state.regions;
    },
  },
  mutations: {
    SET_REGIONS(state, payload) {
      state.regions = payload
    },
    SET_REGION(state, payload) {
      state.regions = payload
    },
  },
  actions: {
    async FETCH_REGION( { commit, state }, payload )
    {
      await commit('SET_REGION', data)
      return data
    },
    async ADD_REGION( { commit, state }, payload )
    {
      const data = {
        ...payload,
        id: state.regions.length + 1,
        status: 1
      }
      await commit('SET_REGIONS', [
        ...state.regions,
        data
      ])
      return data
    },
    UPDATE_REGION( { commit, state }, payload )
    {
      const newData = state.regions.map( row => {
        if( row.id == payload.id ) {
          row.label = payload.label
          row.icon = payload.icon
        }
        return row
      })
      commit('SET_REGIONS', newData)
    },
    async DELETE_REGION( { commit, state }, payload )
    {
      const newData = state.regions.filter( row => row.id != payload.id )
      await commit('SET_REGIONS', newData)
    }
  },
}