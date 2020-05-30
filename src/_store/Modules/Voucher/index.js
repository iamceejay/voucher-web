import { post, get, put, del } from '_helpers/ApiService'
import { vouchers } from '_helpers/DefaultValues'
import { mergeList, toFormData } from '_helpers/CustomFunction'
import moment from 'moment'

const prefix = 'voucher'

export default {
  state: () => ({
    voucher: null,
    vouchers: [],
    featuredVouchers: [],
    newestVouchers: [],
  }),
  getters: {
    VOUCHER(state) {
      return state.voucher;
    },
    VOUCHERS(state) {
      return state.vouchers;
    },
    FEATURED_VOUCHERS(state) {
      return state.featuredVouchers;
    },
    NEWEST_VOUCHERS(state) {
      return state.newestVouchers;
    },
  },
  mutations: {
    SET_VOUCHER(state, payload) {
      state.voucher = payload;
    },
    SET_VOUCHERS(state, payload) {
      state.vouchers = payload;
    },
    SET_FEATURED_VOUCHERS(state, payload) {
      state.featuredVouchers = payload;
    },
    SET_NEWEST_VOUCHERS(state, payload) {
      state.newestVouchers = payload;
    },
  },
  actions: {
    async FETCH_VOUCHER( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}/${payload}`, {})
        await commit('SET_VOUCHER', data.voucher)
        return data
      } catch (err) {
        console.log('err', err)
      }
    },
    async FETCH_VOUCHERS( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}`, {
          paginate: 15,
          ...payload
        })
        await commit('SET_VOUCHERS', mergeList( state.vouchers, data.vouchers ))
        return data
      } catch (err) {
        console.log('err', err)
      }
    },
    async FETCH_SEARCH_VOUCHERS( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}/search`, payload)

        await commit('SET_VOUCHERS', mergeList( state.vouchers, data.vouchers ))
        return data

      } catch (err) {
        console.log('err', err)
      }
    },
    async FETCH_FEATURED_VOUCHERS( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}`, {
          // paginate: 10,
          featured: true
        })
        await commit('SET_FEATURED_VOUCHERS', data.vouchers)
        return data
      } catch (err) {
        console.log('err', err)
      }
    },
    async FETCH_NEWEST_VOUCHERS( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}`, {
          paginate: 10,
          newest: true,
          ...payload,
        })
        await commit('SET_NEWEST_VOUCHERS', mergeList( state.newestVouchers, data.vouchers ))
        return data
      } catch (err) {
        console.log('err', err)
      }
    },
    async ADD_VOUCHER( { commit, state }, payload )
    {
      const { data } = await post(`${prefix}`, payload)
      // await commit('SET_VOUCHERS', [
      //   ...state.vouchers,
      //   data.voucher,
      // ])
    },
    async UPDATE_VOUCHER( { commit, state }, payload )
    {
      const formData = toFormData(payload)
      const { data } = await post(`${prefix}/${payload.id}`, formData)
      return data
    },
    async STATUS_UPDATE_VOUCHER( { commit, state }, payload )
    {
      const { data } = await post(`${prefix}/update-status/${payload.id}`, {})
      const newList = state.vouchers.data.map( vouch => {
        if(vouch.id == payload.id) {
          vouch.is_active = vouch.is_active ? 0 : 1
        }
        return vouch
      })
      await commit('SET_VOUCHERS', {
        ...state.vouchers,
        data: newList
      })
    },
    async DELETE_VOUCHER( { commit, state }, payload )
    {
      const { data } = await del(`${prefix}/${payload.id}`, {})
      const newList = state.vouchers.data.filter( vouch => vouch.id != payload.id);
      await commit('SET_VOUCHERS', {
        ...state.vouchers,
        data: newList
      })
    }
  },
}