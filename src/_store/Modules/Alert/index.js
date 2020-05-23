import { post, get } from '_helpers/ApiService'

export default {
  state: () => ({
    isLoading: {
      status: null,
      data: null
    },
    isProcessing: {
      status: null,
      data: null
    },
  }),
  getters: {
    IS_LOADING(state) 
    {
      return state.isLoading;
    },
    IS_PROCESSING(state) 
    {
      return state.isProcessing;
    },
  },
  mutations: {
    SET_IS_LOADING(state, payload) 
    {
      state.isLoading = {
        ...state.isLoading,
        ...payload
      }
    },
    SET_IS_PROCESSING(state, payload) 
    {
      state.isProcessing = {
        ...state.isProcessing,
        ...payload
      }
    },
  },
  actions: {
  },
}