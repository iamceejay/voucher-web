import { post, get } from '_helpers/ApiService'
import { templates } from '_helpers/DefaultValues'
import moment from 'moment'

export default {
  state: () => ({
    templates,
    template: null
  }),
  getters: {
    TEMPLATES(state) {
      return state.templates;
    },
  },
  mutations: {
    SET_TEMPLATES(state, payload) {
      state.templates = payload
    },
    SET_TEMPLATE(state, payload) {
      state.templates = payload
    },
  },
  actions: {
    async FETCH_TEMPLATE( { commit, state }, payload )
    {
      await commit('SET_TEMPLATE', data)
      return data
    },
    async ADD_TEMPLATE( { commit, state }, payload )
    {
      const data = {
        ...payload,
        id: state.templates.length + 1,
        status: 1
      }
      await commit('SET_TEMPLATES', [
        ...state.templates,
        data
      ])
      return data
    },
    UPDATE_TEMPLATE( { commit, state }, payload )
    {
      const newData = state.templates.map( row => {
        if( row.id == payload.id ) {
          row.label = payload.label
          row.icon = payload.icon
        }
        return row
      })
      commit('SET_TEMPLATES', newData)
    },
    async DELETE_TEMPLATE( { commit, state }, payload )
    {
      const newData = state.templates.filter( row => row.id != payload.id )
      await commit('SET_TEMPLATES', newData)
    }
  },
}