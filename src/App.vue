<template>
  <router-view />
</template>

<script>
 import { useAppStore } from './store/app'


export default {
    methods: {
      getAuthencated() {
        const appStore = useAppStore();
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
