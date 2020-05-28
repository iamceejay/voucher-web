import { post, get } from '_helpers/ApiService'
import moment from 'moment'

const prefix = 'qr-code'

export default {
  state: () => ({
    qrCodes: [],
    qrCode: null
  }),
  getters: {
    QR_CODES(state) {
      return state.qrCodes;
    },
    QR_CODE(state) {
      return state.qrCode;
    },
  },
  mutations: {
    SET_QR_CODES(state, payload) {
      state.qrCode = payload
    },
    SET_QR_CODE(state, payload) {
      state.qrCode = payload
    },
  },
  actions: {
    async FETCH_QR_CODE( { commit, state }, payload )
    {
      await commit('SET_QR_CODE', data)
      return data
    },
    async ADD_QR_CODE( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}`, payload)
        return data
      } catch (err) {
        throw err
      }
    },
    UPDATE_QR_CODE( { commit, state }, payload )
    {
      const newData = state.qrCode.map( row => {
        if( row.id == payload.id ) {
          row.label = payload.label
          row.icon = payload.icon
        }
        return row
      })
      commit('SET_QR_CODES', newData)
    },
    async DELETE_QR_CODE( { commit, state }, payload )
    {
      const newData = state.qrCode.filter( row => row.id != payload.id )
      await commit('SET_QR_CODES', newData)
    },
    async SCAN_QR( { commit, state }, payload )
    {
      try {
        await commit('SET_QR_CODE', null)
        const { data } = await post(`${prefix}/scan`, payload)
        await commit('SET_QR_CODE', data.qr_code)
        return data
      } catch (err) {
        throw err
      }
    },
  },
}