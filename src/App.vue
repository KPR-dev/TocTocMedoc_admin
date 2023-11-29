<template>
  <router-view />
</template>

<script>
import { useAppStore } from './store/app'


export default {
  methods: {
    getAuthencated() {
      const appStore = useAppStore();

      // Vérifier si l'utilisateur est authentifié localement

      if (!appStore.isLogged) {
        this.$router.push('/connexion')
      }
    }
  },
  beforeMount() {
    this.getAuthencated()
  }
}

</script>
