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
        const { data } = await get(`${prefix}/${payload.id}`, payload)
        await commit('SET_VOUCHER', data.voucher)
        return data
      } catch (err) {
        console.log('err', err)
      }
    },
    async FETCH_VOUCHERS( { commit, state }, payload )
    {
      try {
        let withParams = payload?.noParams ? false : true
        let params = {}
        if( withParams ) {
          params = {
            paginate: 15,
            ...payload
          }
        }
        const { data } = await get(`${prefix}`, params)
        await commit('SET_VOUCHERS', withParams ? mergeList( state.vouchers, data.vouchers ) : data.vouchers )
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
      const formData = toFormData(payload)
      const { data } = await post(`${prefix}`, formData)
      // await commit('SET_VOUCHERS', [
      //   ...state.vouchers,
      //   data.voucher,
      // ])
    },
    async UPDATE_VOUCHER( { commit, state }, payload )
    {
      try {
        const formData = toFormData(payload)
        const { data } = await post(`${prefix}/${payload.id}`, formData)
        return data
      } catch (err) {
        throw err     
      }
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
    async FEATURE_UPDATE_VOUCHER( { commit, state }, payload )
    {
      const { data } = await post(`${prefix}/update-feature/${payload.id}`, {})
      const newList = state.vouchers.map( vouch => {
        if(vouch.id == payload.id) {
          vouch.is_featured = vouch.is_featured ? 0 : 1
        }
        return vouch
      })
      await commit('SET_VOUCHERS', newList)
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