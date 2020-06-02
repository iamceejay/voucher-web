import { put, post, get, del } from '_helpers/ApiService'
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
      try {
        const { data } = await get(`${prefix}/${payload}`, {})
        await commit('SET_CATEGORY', data.voucher_category)
        return data
      } catch (err) {
        throw e
      }
    },
    async FETCH_CATEGORIES( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}`, {})
        await commit('SET_CATEGORIES', data.voucher_categories)
        return data
      } catch (err) {
        throw e
      }
    },
    async ADD_CATEGORY( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}`, payload)
        await commit('SET_CATEGORIES', [
          ...state.categories,
          data.voucher_category
        ])
        return data
      } catch (err) {
        throw e
      }
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
    async UPDATE_CATEGORY( { commit, state }, payload )
    {
      try {
        const { data } = await put(`${prefix}/${payload.id}`, payload)
        const newList = state.categories.map( row => {
          if( row.id == payload.id ) {
            row = data.voucher_category
          }
          return row
        })
        await commit('SET_CATEGORIES', newList)
        return data
      } catch (err) {
        throw e
      }
    },
    async DELETE_CATEGORY( { commit, state }, payload )
    {
      try {
        const { data } = await del(`${prefix}/${payload.id}`, {})
        const newList = state.categories.filter( row => row.id != payload.id);
        await commit('SET_CATEGORIES', newList)
      } catch (err) {
        throw err
      }
    }
  },
}