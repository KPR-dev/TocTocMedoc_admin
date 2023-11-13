// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isLogged: false,
    currentUser: {},
    token: String,
  }),
  // getters: {
  //   //TODO: Pour les verifications des roles
  //   getRole(state) {
  //     if (state.currentUser.role == 'Administrateur' || state.currentUser.role == 'Agent' || state.currentUser.role == 'Comptable' || state.currentUser.role == 'Chef d\'agent') {
  //       return true
  //     } else {
  //       return false
  //     }
  //   }
  // },

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
  // actions: {
  //   //TODO: Pour récupérer l'utilisateur qui vient de se connecter
  //   setCurrentUser(user) {
  //     this.currentUser = user;
  //   },
  //   //TODO: Variable qui qui indique si quelqu'un est connecté ou pas
  //   setLogged() {
  //     this.isLogged = !this.isLogged
  //   },
  //   //TODO: Fonction de déconnexion
  //   logout() {
  //     this.currentUser = {}
  //     this.isLogged = !this.isLogged
  //     window.location.reload();
  //   }
  // }
})
