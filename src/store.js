import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || "",
    user: {},
    test: 'hello world!!!'
  },
  getters: {
    isLoggedIn(state) {
      if (state.token.length > 0) {
        return true
      }
    },
    authStatus(state) {
      return state.status
    }
  },
  mutations: {
    auth_request(state) {
      state.status = "loading"
    },
    auth_success(state, token, user) {
      status.status = "success"
      status.token = token
      status.user = user
    },
    auth_error(state) {
      state.status = "error"
    },
    logout(state) {
      state.status = ""
      state.token = ""
    }
  },
  actions: {
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        // 这是其中一种类似config的写法，也可以使用axios.post('', {...})
        axios({url: 'http://localhost:3000/login', data:user, method: 'POST'})
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defualts.headers.common['Authorization'] = token
          commit('auth_success', token, user)
          // 返回一个状态由resp决定的Promise对象。
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          // 返回一个状态为失败的Promise对象
          reject(err)
        })
      })
    },
    register({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'http://localhost:3000/register', data:user, method:'POST'})
        .then( resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common["authorization"] = token
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout({commit}) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        // 使用Vue.delete(target), target可以是对象或数组。
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  }
});
