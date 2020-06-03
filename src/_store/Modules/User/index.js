import { post, get, put, del } from '_helpers/ApiService'
import { toFormData } from '_helpers/CustomFunction'
import moment from 'moment'

const prefix = 'user'

export default {
  state: () => ({
    users: [],
    user: null
  }),
  getters: {
    USER(state) {
      return state.user;
    },
    USERS(state) {
      return state.users;
    },
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },
    SET_USERS(state, payload) {
      state.users = payload
    },
  },
  actions: {
    async FETCH_USER_FILTER( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}/user-filter`, payload)
        await commit('SET_USERS', data.users)
        return data
      } catch (err) {
        throw err
      }
    },
    async FETCH_USER( { commit, state }, payload )
    {
      try {
        const { data } = await get(`${prefix}/${payload.id}`, {
          ...payload
        })
        await commit('SET_USER', data.user)
        return data
      } catch (err) {
        throw err
      }
    },
    async ADD_USER( { commit, state }, payload )
    {
      try {
        if( payload.company && typeof payload.company.logo == 'string' ) {
          payload.company.logo = ''
        }
        const formData = toFormData(payload)
        const { data } = await post(`auth/register`, formData)
        await commit('SET_USER', data.user)
        return data
      } catch (err) {
        throw err
      }
    },
    async UPDATE_USER( { commit, state }, payload )
    {
      try {
        if( payload.company && typeof payload.company.logo == 'string' ) {
          payload.company.logo = ''
        }
        const formData = toFormData(payload)
        const { data } = await post(`${prefix}/${payload.id}`, formData)
        let auth = await JSON.parse(localStorage.getItem('_auth'))
        auth = {
          ...auth,
          data: data.user
        }
        await commit('SET_AUTH_USER', auth)
        await localStorage.setItem('_auth', JSON.stringify(auth))
        await commit('SET_USER', data.user)
        return data
      } catch (err) {
        throw err
      }
    },
    async DELETE_USER( { commit, state }, payload )
    {
      try {
        const { data } = await del(`${prefix}/${payload.id}`, {})
        const newData = state.users.filter( row => row.id != payload.id);
        await commit('SET_USERS', newData)
      } catch (err) {
        throw err
      }
    },
    async CHANGE_PASSWORD( { commit, state }, payload )
    {
      try {
        const { data } = await put(`${prefix}/change-password/${payload.id}`, payload)
        return data
      } catch (err) {
        throw err
      }
    },
    async UPDATE_USER_STATUS( { commit, state }, payload )
    {
      try {
        const { data } = await put(`${prefix}/user-status/${payload.id}`, payload)
        const newData = state.users.map( row => {
          if( row.id == payload.id ) {
            row.isActivated = !row.isActivated
          }
          return row
        })
        await commit('SET_USERS', newData)
        return data
      } catch (err) {
        throw err
      }
    },
  },
}