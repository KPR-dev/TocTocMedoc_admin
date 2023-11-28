// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    //  isLogged: false,
     isLogged: true,
    currentUser: {},
    token: String,
  }),


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
