import { post, get } from '_helpers/ApiService'
import { mergeList } from '_helpers/CustomFunction'
import moment from 'moment'

const prefix = 'redemption'

export default {
  state: () => ({
    redemptions: [],
    redemption: null
  }),
  getters: {
    REDEMPTIONS(state) {
      return state.redemptions;
    },
    REDEMPTION(state) {
      return state.redemption;
    },
  },
  mutations: {
    SET_REDEMPTIONS(state, payload) {
      state.redemptions = payload
    },
    SET_REDEMPTION(state, payload) {
      state.redemption = payload
    },
  },
  actions: {
    async FETCH_REDEMPTIONS( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}`, payload)
        const newList = (payload.paginate) ? mergeList( state.redemptions, data.redemptions ) : data.redemptions
        await commit('SET_REDEMPTIONS', newList)
        return data
      } catch (err) {
        throw err
      }
    },
    async FETCH_REDEMPTION( { commit, state }, payload )
    {
      await commit('SET_REDEMPTION', data)
      return data
    },
    async ADD_REDEMPTION( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}`, payload)
        return data
      } catch (err) {
        throw err
      }
    },
    UPDATE_REDEMPTION( { commit, state }, payload )
    {
      commit('SET_REDEMPTIONS', newData)
    },
    async DELETE_REDEMPTION( { commit, state }, payload )
    {
      await commit('SET_REDEMPTIONS', newData)
    },
    async REVOKE_REDEMPTION( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}/revoke`, payload)
        const newList = state.redemptions.data.map( row => {
          if( row.id == payload.id ) {
            row = data.redemption
          }
          return row
        })
        await commit('SET_REDEMPTIONS', {
          ...state.redemptions,
          data: newList
        })
        return data
      } catch (err) {
        throw err
      }
    },
    async DOWNLOAD_REDEMPTION_PDF( { commit, state }, payload ) {
      try {
        const { data } = await post(`${prefix}/download-pdf`, {
          redemption: payload
        }, {}, {responseType: 'arraybuffer'})
        let blob = new Blob([data], { type: 'application/pdf' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = `${payload.redemption.redemption_no}.pdf`
        link.click()
      } catch(err) {
        throw err
      }
    }
  },
}