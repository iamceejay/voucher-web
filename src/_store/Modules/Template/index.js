import { post, get } from '_helpers/ApiService'
import { templates } from '_helpers/DefaultValues'
import { toFormData } from '_helpers/CustomFunction'
import moment from 'moment'

const prefix = 'template'

export default {
  state: () => ({
    templates: [],
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
    async FETCH_TEMPLATES( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}`, {})
        await commit('SET_TEMPLATES', data.templates)
        return data
      } catch (err) {
        console.log('err', err)
      }
    },
    async FETCH_TEMPLATE( { commit, state }, payload )
    {
      await commit('SET_TEMPLATE', data)
      return data
    },
    async ADD_TEMPLATE( { commit, state }, payload )
    {
      try {
        const formData = toFormData(payload)
        const { data } = await post(`${prefix}`, formData)
        await commit('SET_TEMPLATES', [
          ...state.templates,
          data.template
        ])
        return data
      } catch (err) {
        throw e
      }
      return data
    },
    async UPDATE_TEMPLATE( { commit, state }, payload )
    {
      try {
        const formData = toFormData(payload)
        const { data } = await post(`${prefix}/${payload.id}`, formData)
        const newList = state.templates.map( row => {
          if( row.id == payload.id ) {
            row = data.template
          }
          return row
        })
        await commit('SET_TEMPLATES', newList)
        return data
      } catch (err) {
        throw e
      }
      return data
    },
    async DELETE_TEMPLATE( { commit, state }, payload )
    {
      const newData = state.templates.filter( row => row.id != payload.id )
      await commit('SET_TEMPLATES', newData)
    }
  },
}