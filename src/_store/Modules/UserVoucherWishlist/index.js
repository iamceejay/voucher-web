import { post, get, del } from '_helpers/ApiService'
import { toFormData } from '_helpers/CustomFunction'

const prefix = 'user-voucher-wishlist'

export default {
  state: () => ({
    user_voucher_wishlist: [],
    wishlistItems: 0
  }),
  getters: {
    AUTH_USER_VOUCHER_WISHLIST(state) {
      return state.user_voucher_wishlist;
    },
    COUNT_WISHLIST(state) {
      return state.wishlistItems
    },
  },
  mutations: {
    SET_AUTH_USER_VOUCHER_WISHLIST(state, payload) {
      state.user_voucher_wishlist = payload;
    },
    SET_COUNT_WISHLIST(state, payload) {
      state.wishlistItems = payload;
    },
  },
  actions: {
    async FETCH_VOUCHERS_BY_USER( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}/user/${payload}`)
        await commit('SET_AUTH_USER_VOUCHER_WISHLIST', data.user_voucher_wishlist)
        await commit('SET_COUNT_WISHLIST', data.user_voucher_wishlist.length)
        return data
      } catch (err) {
        console.log('err', err)
      }
    },
    async ADD_USER_VOUCHER_WISHLIST( { commit, state }, payload )
    {
      const formData = toFormData(payload)
      const { data } = await post(`${prefix}`, formData)

      return data
    },
    async DELETE_USER_VOUCHER_WISHLIST( { commit, state }, payload )
    {
      await del(`${prefix}/${payload.id}`, {})
      const newList = state.user_voucher_wishlist.filter( vouch => vouch.id != payload.id);
      await commit('SET_AUTH_USER_VOUCHER_WISHLIST', newList)
    },
  }
}