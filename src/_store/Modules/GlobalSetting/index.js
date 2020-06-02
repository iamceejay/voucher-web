import { put, post, get, del } from '_helpers/ApiService'
import moment from 'moment'

const prefix = 'global-settings'

export default {
  state: () => ({
    global_settings: [],
    global_setting: null
  }),
  getters: {
    GLOBAL_SETTING(state) {
      return state.global_setting;
    },
    GLOBAL_SETTINGS(state) {
      return state.global_settings;
    },
  },
  mutations: {
    SET_GLOBAL_SETTINGS(state, payload) {
      state.global_settings = payload
    },
    SET_GLOBAL_SETTING(state, payload) {
      state.global_setting = payload
    },
  },
  actions: {
    async FETCH_GLOBAL_SETTING( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}/${payload}`, {})
        await commit('SET_GLOBAL_SETTING', data.global_settings)
        return data
      } catch (err) {
        throw e
      }
    },
    async FETCH_GLOBAL_SETTINGS( { commit, state }, payload )
    {
      const { data } = await get(`${prefix}`, {})
      await commit('SET_GLOBAL_SETTINGS', data.global_settingss)
      return data
    },
    async ADD_GLOBAL_SETTING( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}`, payload)
        await commit('SET_GLOBAL_SETTINGS', [
          ...state.global_settings,
          data.global_settings
        ])
        return data
      } catch (err) {
        throw e
      }
    },
    async UPDATE_GLOBAL_SETTING( { commit, state }, payload )
    {
      try {
        const { data } = await put(`${prefix}/${payload.id}`, payload)
        await commit('SET_GLOBAL_SETTING', data.global_settings)
        return data
      } catch (err) {
        throw e
      }
    },
    async DELETE_GLOBAL_SETTING( { commit, state }, payload )
    {
      try {
        const { data } = await del(`${prefix}/${payload.id}`, {})
        const newList = state.global_settings.filter( row => row.id != payload.id);
        await commit('SET_GLOBAL_SETTINGS', newList)
      } catch (err) {
        throw err
      }
    }
  },
}