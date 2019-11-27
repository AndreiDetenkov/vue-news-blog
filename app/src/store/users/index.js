import axios from 'axios'

export default {
  state: {
    users: [],
    loading: false
  },
  mutations: {
    LOADING(state, payload) {
      state.loading = payload
    },
    GET_USERS_SUCCESS(state, payload) {
      state.users = payload
    }
  },
  actions: {
    GET_USERS({ commit, dispatch }) {
      commit('LOADING', true)
      return axios({
        method: 'GET',
        url: '/users/list'
      })
        .then(response => {
          commit('GET_USERS_SUCCESS', response.data)
          commit('LOADING', false)
        })
        .catch(error => {
          commit('LOADING', false)
          dispatch('NOTIFICATION', {
            open: true,
            color: 'error',
            text: error.response.data.message
          })
        })
    }
  },
  getters: {}
}
