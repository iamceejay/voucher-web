import { post, get, put } from '_helpers/ApiService'
import { mergeList, toFormData } from '_helpers/CustomFunction'
import moment from 'moment'

const prefix = 'user-voucher'

export default {
  state: () => ({
    userVoucher: [],
    userStripe: null
  }),
  getters: {
    USER_VOUCHERS(state) {
      return state.userVoucher;
    },
  },
  mutations: {
    SET_USER_VOUCHERS(state, payload) {
      state.userVoucher = payload
    },
    SET_USER_VOUCHER(state, payload) {
      state.userVoucher = payload
    },
  },
  actions: {
    async FETCH_USER_VOUCHER( { commit, state }, payload )
    {
      await commit('SET_USER_VOUCHER', data)
      return data
    },
    async ADD_USER_VOUCHER( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}`, payload)
        return data
      } catch (err) {
        throw err
      }
    },
    async UPDATE_USER_VOUCHER( { commit, state }, payload )
    {
      // payload id is order id
      try {
        const formData = toFormData(payload)
        const { data } = await post(`${prefix}/${payload.id}`, formData)
        // await commit('SET_WALLET', data.order)
        return data
      } catch (err) {
        throw err
      }
    },
    async UPLOAD_CUSTOM_IMAGE_USER_VOUCHER( { commit, state }, payload )
    {
      // payload id is order id
      try {
        const formData = toFormData(payload)
        const { data } = await post(`${prefix}/upload-custom-image/${payload.id}`, formData)
        // await commit('SET_WALLET', data.order)
        return data
      } catch (err) {
        throw err
      }
    },
    async UPLOAD_TEMPLATES_USER_VOUCHER( { commit, state }, payload )
    {
      // payload id is order id
      try {
        const formData = toFormData(payload)
        const { data } = await post(`${prefix}/upload-templates/${payload.id}`, formData)
        // await commit('SET_WALLET', data.order)
        return data
      } catch (err) {
        throw err
      }
    },
    async DELETE_USER_VOUCHER( { commit, state }, payload )
    {
      const newData = state.userVoucher.filter( row => row.id != payload.id )
      await commit('SET_USER_VOUCHERS', newData)
    }
  },
}