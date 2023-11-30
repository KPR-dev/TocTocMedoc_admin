<template>
  <router-view />
</template>

<script>
import { useAppStore } from './store/app'
import local from './storage/local';

export default {
  methods: {
    async getAuthencated() {

      const user = local.getSharedData()
      // Vérifier si l'utilisateur est authentifié localement

      if (!user || !user.token || !user.token.access_token) {
        // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
        await this.$router.push('/connexion');
      }
    }
  },
  beforeMount() {
    this.getAuthencated()
  }
}

</script>
