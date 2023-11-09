<template>
  <v-card>
    <v-layout>

      <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">


        <v-img src="@/assets/no.png" alt="Votre logo" class="logo v-img--scale-down" style="width: 100px; height: 90px;"></v-img>


        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item to="/home1" prepend-icon="mdi-grid" title="Tableau de bord" value="home1"></v-list-item>
          <v-list-item to="/utilisateur" prepend-icon="mdi-account-multiple" title="Utilisateurs" value="utilisateur"></v-list-item>
          <v-list-item to="/facture" prepend-icon="mdi-wallet" title="Facturations" value="facture"></v-list-item>
          <v-list-item to="/tarif" prepend-icon="mdi-barcode" title="Grille tarifaires" value="tarif"></v-list-item>


          <v-divider></v-divider>


        </v-list>



        <template v-slot:append>
          <div class="pa-2">
            <v-divider></v-divider>
            <v-list density="compact" nav>
              <v-list-item @click="logout()" prepend-icon="mdi-logout" title="Se déconnecter"
                style="color: rgb(221, 39, 15);" value="logout"></v-list-item>
            </v-list>
          </div>
        </template>
      </v-navigation-drawer>

      <v-app-bar :elevation="2" title="TocTocMedoc" rounded>
        <template v-slot:append>
          <v-snackbar v-model="snackbar.show" :color="snackbar.color" class="custom-snackbar">
            {{ snackbar.text }}
            <v-btn color="white" text @click="snackbar.show = false" prepend-icon="mdi-close"></v-btn>
          </v-snackbar>
          <!-- <v-list-item to="/historique" prepend-icon="mdi-bell" title="Notifications" value="historiques"
            style="color: black;"></v-list-item> -->
            <div class="text-center">
              <v-menu open-on-hover>
                <template v-slot:activator="{ on }">
                  <v-row align="center">
                    <v-list-item-title>{{ currentUser.lastname }}</v-list-item-title>
                    <v-avatar size="36" v-on="on" class="ml-2 mr-2">
                      <img src="../assets/logo.png" alt="Avatar de l'utilisateur" />
                    </v-avatar>
                  </v-row>
                </template>
                <v-list>
                  <v-list-item prepend-icon="mdi-cog">
                    <v-list-item-title>Paramètre</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>

        </template>
      </v-app-bar>

      <v-main>
        <router-view />
      </v-main>

    </v-layout>



  </v-card>
</template>



<style scoped>
/* Ajoutez ces styles à votre feuille de style CSS */



/* Ajoutez d'autres styles personnalisés selon vos besoins */



.custom-snackbar {
  position: fixed;
  bottom: 90%;
  left: 77%;
}

#gest:hover {
  background: #30267F;
  color: white;
}
.v-list-item--active {
  background-color: rgb(0, 64, 128); /* Change this to your desired navy blue color */
  color: white; /* Change this to the text color you want when the item is active */
}
</style>
<script>
import { useAppStore } from "../store/app";
const appStore = useAppStore();

export default {

  data: () => ({
    currentUser: appStore.currentUser,
    drawer: true,

    rail: false,
    open: ['Users'],
    snackbar: {
      show: true,
      text: 'Bienvenue chez TocTocMedoc',
      color: 'success', // Ajoutez la couleur de la notification ici (par exemple, 'success', 'error', 'warning', etc.)
    },

  }),
  mounted() {
    // Écoute les changements de la largeur de l'écran et met à jour l'état de la navigation
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },

  methods: {

    handleResize() {
      // Utilisez des breakpoints pour activer/désactiver le rail en fonction de la largeur de l'écran
      if (window.innerWidth <= 968) {
        this.rail = true;

      } else {
        this.rail = false;
      }
    },

    async logout() {
      console.log("logout");
      appStore.logout();
    },
    showSnackbar(text, color) {
      this.snackbar.text = text;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },
  },
};
</script>
