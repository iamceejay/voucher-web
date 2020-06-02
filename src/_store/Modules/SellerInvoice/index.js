import { put, post, get, del } from '_helpers/ApiService'
import { seller_invoices } from '_helpers/DefaultValues'
import moment from 'moment'

const prefix = 'seller-invoice'

export default {
  state: () => ({
    seller_invoices: [],
    seller_invoice: null
  }),
  getters: {
    SELLER_INVOICE(state) {
      return state.seller_invoice;
    },
    SELLER_INVOICES(state) {
      return state.seller_invoices;
    },
  },
  mutations: {
    SET_SELLER_INVOICES(state, payload) {
      state.seller_invoices = payload
    },
    SET_SELLER_INVOICE(state, payload) {
      state.seller_invoice = payload
    },
  },
  actions: {
    async FETCH_SELLER_INVOICE( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}/${payload}`, {})
        await commit('SET_SELLER_INVOICE', data.seller_invoice)
        return data
      } catch (err) {
        throw e
      }
    },
    async FETCH_SELLER_INVOICES( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}`, {})
        await commit('SET_SELLER_INVOICES', data.seller_invoices)
        return data
      } catch (err) {
        throw e
      }
    },
    async ADD_SELLER_INVOICE( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}`, payload)
        await commit('SET_SELLER_INVOICES', [
          ...state.seller_invoices,
          data.seller_invoice
        ])
        return data
      } catch (err) {
        throw e
      }
    },
    async UPDATE_SELLER_INVOICE( { commit, state }, payload )
    {
      try {
        const { data } = await put(`${prefix}/${payload.id}`, payload)
        const newList = state.seller_invoices.map( row => {
          if( row.id == payload.id ) {
            row = data.seller_invoice
          }
          return row
        })
        await commit('SET_SELLER_INVOICES', newList)
        return data
      } catch (err) {
        throw e
      }
    },
    async DELETE_SELLER_INVOICE( { commit, state }, payload )
    {
      try {
        const { data } = await del(`${prefix}/${payload.id}`, {})
        const newList = state.seller_invoices.filter( row => row.id != payload.id);
        await commit('SET_SELLER_INVOICES', newList)
      } catch (err) {
        throw err
      }
    },
    async SEND_SELLER_INVOICE( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}/send-invoice/${payload.id}`)
        return data
      } catch (err) {
        throw e
      }
    },
  },
}