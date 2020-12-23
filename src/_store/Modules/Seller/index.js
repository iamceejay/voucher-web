import { post, get } from '_helpers/ApiService'
import { vouchers } from '_helpers/DefaultValues'
import moment from 'moment'

export default {
  state: () => ({
    seller: null,
    seller_modal: false,
    seller_id: '',
  }),
  getters: {
    SELLER(state) {
      return state.seller;
    },
    SELLER_MODAL(state) {
      return state.seller_modal;
    },
    SELLER_ID(state) {
      return state.seller_id
    }
  },
  mutations: {
    SET_SELLER(state, payload) {
      state.seller = payload;
    },
    SET_SELLER_MODAL(state, payload) {
      state.seller_modal = payload
    },
    SET_SELLER_ID(state, payload) {
      state.seller_id = payload
    }
  },
  actions: {
    async FETCH_SELLER( { commit, state }, payload )
    {
      const data = {
        seller_id: 2,
        detail: {
          user_id: 2,
          webUrl: 'https://www.google.com',
          logo: '@/_assets/img/company-default-logo.png',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          companyName: "Chris's Corp"
        },
        user: {
          id: 2,
          detail: {
            firstName: 'Chris',
            lastName: 'Joe',
            address: 'Germany',
            region: 'X'
          },
        },
        vouchers,
      }
      await commit('SET_SELLER', data)
      return data
    },
    async ADD_SELLER( { commit, state }, payload )
    {
      return data
    },
    UPDATE_SELLER( { commit, state }, payload )
    {
      commit('SET_SELLER', null)
    },
    DELETE_SELLER( { commit, state }, payload )
    {
      commit('SET_SELLER', null)
    }
  },
}