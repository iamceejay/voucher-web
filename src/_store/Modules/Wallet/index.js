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
    async FETCH_WALLET( { commit, state }, payload )
    {
      try {
        const data = state.wallets.filter( row => row.id == payload )[0]
        await commit('SET_WALLET', data)
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
    async PAYMENT( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}/payment`, payload)
        return data
      } catch (err) {
        throw err
      }
    },
  },
}