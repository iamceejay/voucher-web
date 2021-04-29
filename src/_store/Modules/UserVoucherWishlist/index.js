import { post, get, del } from '_helpers/ApiService'
import { toFormData } from '_helpers/CustomFunction'

const prefix = 'user-voucher-wishlist'

export default {
  state: () => ({
    user_voucher_wishlist: []
  }),
  getters: {
    AUTH_USER_VOUCHER_WISHLIST(state) {
      return state.user_voucher_wishlist;
    },
  },
  mutations: {
    SET_AUTH_USER_VOUCHER_WISHLIST(state, payload) {
      state.user_voucher_wishlist = payload;
    },
  },
  actions: {
    async FETCH_VOUCHERS_BY_USER( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}/user/${payload}`)
        await commit('SET_AUTH_USER_VOUCHER_WISHLIST', data.user_voucher_wishlist)
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