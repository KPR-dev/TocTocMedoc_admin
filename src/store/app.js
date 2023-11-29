// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isLogged: false,
    currentUser: {},
    token: String,
    authenticated: false,
  }),

  getters: {
    authenticated(state) {
      return state.authenticated
    },
  },
  mutations: {
    setAuthenticated(state, value) {
      state.authenticated = true
      window.localStorage.setItem('test session', JSON.stringify(value))
    },
  },

  actions: {

    logout() {
      this.currentUser = {}
      this.isLogged = !this.isLogged

    },
    setLogged() {
      this.isLogged = !this.isLogged
    },
    getCurrentUser(user) {
      this.currentUser = user;
    },
  }

})
