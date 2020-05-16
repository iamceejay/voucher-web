import { post, get } from '_helpers/ApiService'
import { vouchers } from '_helpers/DefaultValues'
import moment from 'moment'

export default {
  state: () => ({
    categories: [
      {
        id: 1,
        label: 'Book',
        icon: 'fa-book'
      },{
        id: 2,
        label: 'Mall',
        icon: 'fa-building'
      },{
        id: 3,
        label: 'Hotel',
        icon: 'fa-building'
      },{
        id: 4,
        label: 'Restaurant',
        icon: 'fa-building'
      },{
        id: 5,
        label: 'Gadgets',
        icon: 'fa-mobile'
      },
    ],
    vouchers
  }),
  getters: {
    VOUCHERS(state) {
      return state.vouchers;
    },
    CATEGORIES(state) {
      return state.categories;
    },
  },
  mutations: {
    SET_VOUCHERS(state, payload) {
      state.vouchers = payload;
    },
  },
  actions: {
    ADD_VOUCHER( { commit, state }, payload )
    {
      commit('SET_VOUCHERS', [
        ...state.vouchers,
        {
          ...payload,
          id: state.vouchers.length + 1,
        }
      ])
    },
    UPDATE_VOUCHER( { commit, state }, payload )
    {
      const newList = state.vouchers.map( vouch => {
        if(vouch.id == payload.id) {
          vouch = payload
        }
        return vouch
      });
      commit('SET_VOUCHERS', newList)
    },
    DEACTIVATE_VOUCHER( { commit, state }, payload )
    {
      const newList = state.vouchers.map( vouch => {
        if(vouch.id == payload.id) {
          vouch.status = !vouch.status
        }
        return vouch
      });
      commit('SET_VOUCHERS', newList)
    },
    DELETE_VOUCHER( { commit, state }, payload )
    {
      const newList = state.vouchers.filter( vouch => vouch.id != payload.id);
      commit('SET_VOUCHERS', newList)
    }
  },
}