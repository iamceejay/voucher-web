import { post, get } from '_helpers/ApiService'
import { categories } from '_helpers/DefaultValues'
import moment from 'moment'

const prefix = 'voucher-category'

export default {
  state: () => ({
    categories: [],
    category: null
  }),
  getters: {
    CATEGORY(state) {
      return state.category;
    },
    CATEGORIES(state) {
      return state.categories;
    },
  },
  mutations: {
    SET_CATEGORIES(state, payload) {
      state.categories = payload
    },
    SET_CATEGORY(state, payload) {
      state.category = payload
    },
  },
  actions: {
    async FETCH_CATEGORY( { commit, state }, payload )
    {
      const { data } = await get(`${prefix}/${payload}`, {})
      await commit('SET_CATEGORY', data.voucher_category)
      return data
    },
    async FETCH_CATEGORIES( { commit, state }, payload )
    {
      const { data } = await get(`${prefix}`, {})
      await commit('SET_CATEGORIES', data.voucher_categories)
      return data
    },
    async ADD_CATEGORY( { commit, state }, payload )
    {
      const data = {
        ...payload,
        id: state.categories.length + 1,
        status: 1
      }
      await commit('SET_CATEGORIES', [
        ...state.categories,
        data
      ])
      return data
    },
    UPDATE_CATEGORY( { commit, state }, payload )
    {
      const newData = state.categories.map( row => {
        if( row.id == payload.id ) {
          row.label = payload.label
          row.icon = payload.icon
        }
        return row
      })
      commit('SET_CATEGORIES', newData)
    },
    async DELETE_CATEGORY( { commit, state }, payload )
    {
      const newData = state.categories.filter( row => row.id != payload.id )
      await commit('SET_CATEGORIES', newData)
    }
  },
}