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
    isInfiniteLoad: false,
    isLoadMore: false,
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
    IS_INFINITE_LOAD(state) 
    {
      return state.isInfiniteLoad;
    },
    IS_LOAD_MORE(state) 
    {
      return state.isLoadMore;
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
    SET_IS_INFINITE_LOAD(state, payload) 
    {
      state.isInfiniteLoad = payload
    },
    SET_IS_LOAD_MORE(state, payload) 
    {
      state.isLoadMore = payload
    },
  },
  actions: {
  },
}