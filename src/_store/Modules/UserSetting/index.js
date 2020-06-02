import { put, post, get, del } from '_helpers/ApiService'
import moment from 'moment'

const prefix = 'user-settings'

export default {
  state: () => ({
    user_settings: [],
    user_setting: null
  }),
  getters: {
    USER_SETTING(state) {
      return state.user_setting;
    },
    USER_SETTINGS(state) {
      return state.user_settings;
    },
  },
  mutations: {
    SET_USER_SETTINGS(state, payload) {
      state.user_settings = payload
    },
    SET_USER_SETTING(state, payload) {
      state.user_setting = payload
    },
  },
  actions: {
    async FETCH_USER_SETTING( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}/${payload}`, {})
        await commit('SET_USER_SETTING', data.user_settings)
        return data
      } catch (err) {
        throw e
      }
    },
    async FETCH_USER_SETTING_BY_USER( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}/by-user`, payload)
        await commit('SET_USER_SETTING', data.user_setting)
        return data
      } catch (err) {
        throw e
      }
    },
    async FETCH_USER_SETTINGS( { commit, state }, payload )
    {
      const { data } = await get(`${prefix}`, {})
      await commit('SET_USER_SETTINGS', data.user_settings)
      return data
    },
    async ADD_USER_SETTING( { commit, state }, payload )
    {
      try {
        const { data } = await post(`${prefix}`, payload)
        await commit('SET_USER_SETTING', data.user_setting)
        return data
      } catch (err) {
        throw e
      }
      return data
    },
    async UPDATE_USER_SETTING( { commit, state }, payload )
    {
      try {
        const { data } = await put(`${prefix}/${payload.id}`, payload)
        await commit('SET_USER_SETTING', data.user_settings)
        return data
      } catch (err) {
        throw e
      }
    },
    async DELETE_USER_SETTING( { commit, state }, payload )
    {
      try {
        const { data } = await del(`${prefix}/${payload.id}`, {})
        const newList = state.user_settings.filter( row => row.id != payload.id);
        await commit('SET_USER_SETTINGS', newList)
      } catch (err) {
        throw err
      }
    }
  },
}