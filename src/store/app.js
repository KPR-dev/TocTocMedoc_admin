// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        isLogged: false,
        currentUser: {},
        token: String,
        authenticated: false,
        user: {}
    }),

    getters: {
        authenticated(state) {
            return state.authenticated
        },
    },
    mutations: {
        setAuthenticated(state, value) {
            state.authenticated = true
            state.user = value
            console.log('storevapp = ', value)
            window.localStorage.setItem('test session', JSON.stringify(value))
        },
        setToken(state, token) {
          state.token = token;
        },
    },

    actions: {

      setToken(token) {
        this.setToken(token);
      },

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
