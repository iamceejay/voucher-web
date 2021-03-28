import { put, post, get, del } from '_helpers/ApiService'
import { categories } from '_helpers/DefaultValues'
import moment from 'moment'

const prefix = 'voucher-sub-category'

export default {
  state: () => ({
    subcategories: [],
    subcategory: null
  }),
  getters: {
    SUBCATEGORY(state) {
      return state.subcategory;
    },
    SUBCATEGORIES(state) {
      return state.subcategories;
    },
  },
  mutations: {
    SET_SUBCATEGORIES(state, payload) {
      state.subcategories = payload
    },
    SET_SUBCATEGORY(state, payload) {
      state.subcategory = payload
    },
  },
  actions: {
    async FETCH_SUBCATEGORY( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}/${payload}`, {})
        await commit('SET_SUBCATEGORY', data.voucher_category)
        return data
      } catch (err) {
        throw err
      }
    },
    async FETCH_SUBCATEGORIES( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}`, {})
        await commit('SET_SUBCATEGORIES', data.voucher_categories)
        return data
      } catch (err) {
        throw err
      }
    },
    async ADD_SUBCATEGORY( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}`, payload)
        await commit('SET_SUBCATEGORIES', [
          ...state.subcategories,
          data.voucher_category
        ])
        return data
      } catch (err) {
        throw err
      }
    },
    async UPDATE_SUBCATEGORY( { commit, state }, payload )
    {
      try {
        const { data } = await put(`${prefix}/${payload.id}`, payload)
        return data
      } catch (err) {
        throw err
      }
    },
    async DELETE_SUBCATEGORY( { commit, state }, payload )
    {
      try {
        const { data } = await del(`${prefix}/${payload.id}`, {})
        const newList = state.subcategories.filter( row => row.id != payload.id);
        await commit('SET_SUBCATEGORIES', newList)
      } catch (err) {
        throw err
      }
    }
  },
}