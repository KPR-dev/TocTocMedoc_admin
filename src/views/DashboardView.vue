<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false" style="background: var(--material-theme-sys-light-primary-container, #CEE5FF);">
        <v-img src="@/assets/no.png" alt="Votre logo" class="logo v-img--scale-down"
          style="width:10rem; height: 90px;"></v-img>
          <v-divider></v-divider>
        <v-divider></v-divider><br>
        <v-list density="compact" nav>
          <v-list-item to="/home" prepend-icon="mdi-grid" title="Tableau de bord" value="home"></v-list-item>
          <v-divider></v-divider>
          <v-list-item to="/utilisateur" prepend-icon="mdi-account-multiple" title="Utilisateurs"
            value="utilisateur"></v-list-item>
            <v-divider></v-divider>
          <v-list-item to="/facture" prepend-icon="mdi-wallet" title="Facturations" value="facture"></v-list-item>
          <v-divider></v-divider>
          <v-list-item to="/tarif" prepend-icon="mdi-barcode" title="Grille tarifaires" value="tarif"></v-list-item>
          <v-divider></v-divider>
          <v-list-item to="/hisorique" prepend-icon="mdi-history" title="Historique" value="historique"></v-list-item>
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
              <template v-slot:activator="{ props }">
                <!-- <v-btn color="primary" v-bind="props"> Dropdown </v-btn> -->
                <v-list-item v-bind="props">

                  <v-list-item-title>{{ currentUser.lastname }} {{ currentUser.firstname }} <v-avatar size="36" v-on="on" class="ml-2 mr-2">
                    <img src="../assets/logo.png" alt="Avatar de l'utilisateur" />
                  </v-avatar></v-list-item-title>

                  <!-- <v-list-item-subtitle>{{ currentUser.email }}</v-list-item-subtitle> -->
                </v-list-item>
              </template>

              <v-list>
                <v-list-item @click="dialog_change = true" prepend-icon="mdi-cog">
                  <v-list-item-title>Options</v-list-item-title>
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

        <!-- modal changer le mot de passe------------------------------------------------------------------------------------------------------------------------------------------>
        <v-row justify="center">
      <v-dialog v-model="dialog_change" persistent width="650">
        <v-card>
          <v-form ref="form">
            <v-card-title>
              <span class="text-h6">Changer le mot de passe</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <!-- <v-col cols="12" sm="6">
                    <v-text-field hint="Ancien mot de passe" clearable :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      v-model="password_change" label="Ancien mot de passe" prepend-icon="mdi mdi-lock"
                      variant="outlined" :rules="passwordRules" :type="show1 ? 'text' : 'password'"
                      @click:append="show1 = !show1"></v-text-field>
                  </v-col> -->
                  <v-col cols="12" sm="8">
                    <v-text-field hint="Nouveau mot de passe" clearable :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      v-model="password_change" label="Nouveau mot de passe" prepend-icon="mdi mdi-lock"
                      variant="outlined" :rules="passwordRules" :type="show1 ? 'text' : 'password'"
                      @click:append="show1 = !show1"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small class="text-danger">*Champt obligatoire</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="dialog_change = false">
                Annuler
              </v-btn>
              <v-btn color="blue-darken-1" variant="flat" @click="validate_change">
                Enregistrer
              </v-btn>
            </v-card-actions>
          </v-form>

        </v-card>
      </v-dialog>
    </v-row>



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
  background-color: rgb(0, 64, 128);
  /* Change this to your desired navy blue color */
  color: white;
  /* Change this to the text color you want when the item is active */
}
</style>
<script>
import { useAppStore } from "../store/app";
const appStore = useAppStore();

export default {

  data: () => ({
    currentUser: appStore.currentUser,
    drawer: true,
    show1: false,
    password_change: "",
    passwordRules: [(value) => !!value || "Veuillez entrer le nouveau un mot de passe"],
    rail: false,
    open: ['Users'],
    dialog_change: false,
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
