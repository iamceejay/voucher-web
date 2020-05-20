import { post, get } from '_helpers/ApiService'
import { vouchers } from '_helpers/DefaultValues'
import moment from 'moment'

export default {
  state: () => ({
    vouchers
  }),
  getters: {
    VOUCHERS(state) {
      return state.vouchers;
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