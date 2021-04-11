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
        throw err     
      }
    },
    async FETCH_COMMISSION_STAT( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}/commission-stats`, {})
        return data
      } catch (err) {
        throw err     
      }
    },
    async FETCH_SELLER_INVOICES( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}`, payload)
        await commit('SET_SELLER_INVOICES', data.seller_invoices)
        return data
      } catch (err) {
        throw err     
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
        throw err     
      }
    },
    async UPDATE_SELLER_INVOICE( { commit, state }, payload )
    {
      try {
        const { data } = await put(`${prefix}/${payload.id}`, payload)
        const newData = state.seller_invoices.map( row => {
          if( row.id == payload.id ) {
            row = data.seller_invoice
          }
          return row
        })
        await commit('SET_SELLER_INVOICES', newData)
        return data
      } catch (err) {
        throw err     
      }
    },
    async DELETE_SELLER_INVOICE( { commit, state }, payload )
    {
      try {
        const { data } = await del(`${prefix}/${payload.id}`, {})
        const newData = state.seller_invoices.filter( row => row.id != payload.id);
        await commit('SET_SELLER_INVOICES', newData)
      } catch (err) {
        throw err
      }
    },
    async SEND_SELLER_INVOICE( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}/send-invoice/${payload.id}`)
        const newData = state.seller_invoices.map( row => {
          if( row.id == payload.id ) {
            row.email_sent = !row.email_sent
          }
          return row
        })
        await commit('SET_SELLER_INVOICES', newData)
        return data
      } catch (err) {
        throw err     
      }
    },
    async DOWNLOAD_SELLER_INVOICES_PDF( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}/download-pdf-invoices`, payload, {}, {responseType: 'arraybuffer'})
        let blob = new Blob([data], { type: 'application/zip' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = `invoices(${payload.from}-to-${payload.to}).zip`
        link.click()
      } catch (err) {
        throw err
      }
    },

    async DOWNLOAD_BUYER_INVOICES_PDF( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}/download-buyer-pdf-invoices`, payload, {}, {responseType: 'arraybuffer'})
        let blob = new Blob([data], { type: 'application/zip' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = `invoices(${payload.from}-to-${payload.to}).zip`
        link.click()
      } catch (err) {
        throw err
      }
    },
    
    async DOWNLOAD_SELLER_INVOICES_CSV( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}/download-csv-invoices`, payload, {}, {responseType: 'arraybuffer'})
        let blob = new Blob([data], { type: 'text/csv;charset=utf-8;' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = `payouts(${payload.from}-to-${payload.to}).csv`
        link.click()
      } catch (err) {
        throw err
      }
    },
  },
}