import { post, get } from '_helpers/ApiService'
import moment from 'moment'

const prefix = 'order'

export default {
  state: () => ({
    wallet: null,
    wallets: [],
  }),
  getters: {
    WALLET(state) {
      return state.wallet
    },
    WALLETS(state) {
      return state.wallets
    },
  },
  mutations: {
    SET_WALLET(state, payload) {
      state.wallet = payload;
    },
    SET_WALLETS(state, payload) {
      state.wallets = payload;
    },
  },
  actions: {
    async FETCH_WALLETS( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}`, {
          paginate: 10,
          // user_id: payload.user_id
        })
        await commit('SET_WALLETS', data.orders)
        return data
      } catch (err) {
        console.log('err', err)
      }
    },
    async FETCH_WALLET( { commit, state }, payload )
    {
      const data = state.wallets.filter( row => row.id == payload )[0]
      await commit('SET_WALLET', data)
      return data
    },
    async ADD_WALLET( { commit, state }, payload )
    {
      const data = {
        ...payload,
        id: state.wallets.length + 1,
      }
      await commit('SET_WALLETS', [
        ...state.wallets,
        data
      ])
      return data
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
    DELETE_WALLET( { commit, state }, payload )
    {
      const newList = state.wallets.filter( row => row.id != payload.id);
      commit('SET_WALLETS', newList)
    }
  },
}