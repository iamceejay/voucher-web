import { post, get, put } from '_helpers/ApiService'
import { mergeList, toFormData } from '_helpers/CustomFunction'
import moment from 'moment'

const prefix = 'user-voucher'

export default {
  state: () => ({
    userVoucher: null,
    userVouchers: [],
    userStripe: null
  }),
  getters: {
    USER_VOUCHER(state) {
      return state.userVoucher;
    },
    USER_VOUCHERS(state) {
      return state.userVouchers;
    },
  },
  mutations: {
    SET_USER_VOUCHER(state, payload) {
      state.userVoucher = payload
    },
    SET_USER_VOUCHERS(state, payload) {
      state.userVouchers = payload
    },
  },
  actions: {
    async FETCH_USER_VOUCHER( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}/${payload}`, {})
        await commit('SET_USER_VOUCHER', data.user_voucher)
        return data
      } catch (err) {
        throw err
      }
    },
    async FETCH_SEARCH_USER_VOUCHERS( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}/search/user-vouchers`, payload)
        const newList = (payload.paginate) ? mergeList( state.userVouchers, data.user_vouchers ) : data.user_vouchers
        await commit('SET_USER_VOUCHERS', newList)
        return data
      } catch (err) {
        throw err
      }
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
    async UPDATE_BUYER_VOUCHER( { commit, state }, payload )
    {
      // payload id is order id
      try {
        const formData = toFormData(payload)
        const { data } = await post(`buyer-voucher/${payload.id}`, formData)
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
        // const formData = toFormData(payload)

        let formData = new FormData;
        formData.set('id', payload.id)
        formData.set('custom_image', payload.custom_image, `${payload.file_name}.part`)
        formData.set('is_last', payload.is_last)

        const { data } = await post(`${prefix}/upload-custom-image/${payload.id}`, formData, {
          'Content-Type': 'application/octet-stream'
        })
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
        // const formData = toFormData(payload)
        let formData = new FormData;
        formData.set('id', payload.id)
        formData.set('template[status]', payload.template.status)
        formData.set('template[attachment]', payload.template.attachment, `${payload.file_name}.part`)
        formData.set('template[is_last]', payload.template.is_last)

        const { data } = await post(`${prefix}/upload-template/${payload.id}`, formData, {
          'Content-Type': 'application/octet-stream'
        })
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
    },
    async DOWNLOAD_USER_VOUCHER( { commit, state }, payload )
    {
      try {
        const { data } = await post(`order/download-voucher`, {
          id: payload
        }, {}, {responseType: 'arraybuffer'})
        const date = moment().local().format('Y-m-d')
        let blob = new Blob([data], { type: 'application/pdf' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = `Gutschein-${date}.pdf`
        link.click()

        if(state.userVouchers.data) {
          const newList = state.userVouchers.data.map( row => {
            if(row.id == payload) {
              row.sent_via = 'voucher_download'
            }
            return row
          })
          await commit('SET_WALLETS', {
            ...state.userVouchers,
            data: newList
          })
        }
      } catch (err) {
        throw err
      }
    },
    async DOWNLOAD_BUYER_VOUCHER( { commit, state }, payload )
    {
      try {
        const { data } = await post(`order/download-buyer-voucher`, {
          id: payload
        }, {}, {responseType: 'arraybuffer'})
        const date = moment().local().format('Y-m-d')
        let blob = new Blob([data], { type: 'application/pdf' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = `Gutschein-${date}.pdf`
        link.click()

        if(state.userVouchers.data) {
          const newList = state.userVouchers.data.map( row => {
            if(row.id == payload) {
              row.sent_via = 'voucher_download'
            }
            return row
          })
          await commit('SET_WALLETS', {
            ...state.userVouchers,
            data: newList
          })
        }
      } catch (err) {
        throw err
      }
    },
    async FETCH_SEARCH_GIFT_USER_VOUCHERS( { commit, state }, payload )
    {
      try {
        const { data } = await post('gift/search/user-vouchers', payload)
        const newList = (payload.paginate) ? mergeList( state.userVouchers, data.user_vouchers ) : data.user_vouchers
        await commit('SET_USER_VOUCHERS', newList)
        return data
      } catch (err) {
        throw err
      }
    },
  },
}