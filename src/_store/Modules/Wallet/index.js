import { post, get, del } from '_helpers/ApiService'
import { mergeList } from '_helpers/CustomFunction'
import moment from 'moment'

const prefix = 'order'

export default {
  state: () => ({
    wallet: null,
    wallets: [],
    countCart: 0,
  }),
  getters: {
    WALLET(state) {
      return state.wallet
    },
    WALLETS(state) {
      return state.wallets
    },
    COUNT_CART(state) {
      return state.countCart
    },
  },
  mutations: {
    SET_WALLET(state, payload) {
      state.wallet = payload;
    },
    SET_WALLETS(state, payload) {
      state.wallets = payload;
    },
    SET_COUNT_CART(state, payload) {
      state.countCart = payload;
    },
  },
  actions: {
    async FETCH_TOTAL_USER_CART( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}/total-user-cart`, {})
        await commit('SET_COUNT_CART', data.total)
        return data
      } catch (err) {
        throw err
      }
    },
    async FETCH_WALLETS( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}`, payload)
        const newList = (payload.paginate) ? mergeList( state.wallets, data.orders ) : data.orders
        await commit('SET_WALLETS', newList)
        return data
      } catch (err) {
        throw err
      }
    },
    async FETCH_WALLET_STAT( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}`, payload)
        return data
      } catch (err) {
        throw err
      }
    },
    async FETCH_SEARCH_WALLETS( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}/search`, payload)
        const newList = (payload.paginate) ? mergeList( state.wallets, data.orders ) : data.orders
        await commit('SET_WALLETS', newList)
        return data
      } catch (err) {
        throw err
      }
    },
    async FETCH_WALLET( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}/${payload}`, {})
        await commit('SET_WALLET', data.order)
        return data
      } catch (err) {
        throw err
      }
    },
    async ADD_WALLET( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}`, payload)
        await commit('SET_COUNT_CART', state.countCart + 1)
        return data
      } catch (err) {
        throw err
      }
    },
    UPDATE_WALLET( { commit, state }, payload )
    {
      const newList = state.wallets.map( row => {
        if(row.id == payload.id) {
          row = payload
        }
        return row
      });
      commit('SET_WALLET', payload)
      commit('SET_WALLETS', newList)
    },
    async DELETE_WALLET( { commit, state }, payload )
    {
      try {
        const { data } = await del(`${prefix}/${payload.id}`, {})
        const newList = state.wallets.filter( row => row.id != payload.id);
        await commit('SET_WALLETS', newList)
      } catch (err) {
        throw err
      }
    },
    async REVERSE_WALLET( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}/reverse-order`, payload)
        const newList = state.wallets.map( row => {
          if( row.id == payload.id ) {
            row.reversed = !row.reversed
          }
          return row
        });
        await commit('SET_WALLETS', newList)
      } catch (err) {
        throw err
      }
    },
    async PAYMENT( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}/payment`, payload)
        return data
      } catch (err) {
        throw err
      }
    },
    async DOWNLOAD_WALLET( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}/download-voucher`, {
          id: payload
        }, {}, {responseType: 'arraybuffer'})
        const date = moment().local().format('Y-m-d')
        let blob = new Blob([data], { type: 'application/pdf' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = `voucher-${date}.pdf`
        link.click()

        const newList = state.wallets.data.map( row => {
          if(row.id == payload) {
            row.sent_via = 'voucher_download'
          }
          return row
        })
        await commit('SET_WALLETS', {
          ...state.wallets,
          data: newList
        })
      } catch (err) {
        throw err
      }
    },
    async DOWNLOAD_INVOICE( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}/download-invoice`, {
          id: payload.id
        }, {}, {responseType: 'arraybuffer'})
        // const date = moment().local().format('Y-m-d')
        let blob = new Blob([data], { type: 'application/pdf' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = `${payload.customer_invoice.invoice_no}.pdf`
        link.click()
      } catch (err) {
        throw err
      }
    },
    async SEND_WALLET( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}/send-voucher-pdf`, payload)
        return data
      } catch (err) {
        throw err
      }
    },
    async TRANSFER_WALLET( { commit, state }, payload )
    {
      try {
        const { data } = await post(`transfer/transfer-send-mail`, payload)
        return data
      } catch (err) {
        throw err
      }
    },
    async TRANSFERRING_WALLET( { commit, state }, payload )
    {
      try {
        const { data } = await post(`transfer`, payload)
        return data
      } catch (err) {
        throw err
      }
    },
  },
}