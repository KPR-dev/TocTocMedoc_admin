<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false"
        style="background: var(--material-theme-sys-light-primary-container, #CEE5FF);">
        <v-flex xs12 class="text-xs-center">
          <v-img src="@/assets/no.png" alt="Votre logo" class="logo v-img--scale-down"></v-img>
        </v-flex>
        <v-divider></v-divider>
        <v-divider></v-divider><br>
        <v-list density="compact" nav>
          <v-list-item to="/home" prepend-icon="mdi-grid" title="Tableau de bord" value="home"></v-list-item>
          <v-divider></v-divider>
          <v-list-item to="/administrateur" prepend-icon="mdi-account-group" title="administrateurs"
            value="administrateur"></v-list-item>
          <v-divider></v-divider>
          <v-list-item to="/utilisateur" prepend-icon="mdi-account-multiple" title="Utilisateurs"
            value="utilisateur"></v-list-item>
          <v-divider></v-divider>
          <v-list-item to="/tarifaire" prepend-icon="mdi mdi-list-box" title="Tarification"
            value="tarifaire"></v-list-item>
          <v-divider></v-divider>
          <v-list-item to="/grille" prepend-icon="mdi-barcode" title="Grille tarifaires" value="grille"></v-list-item>
          <v-divider></v-divider>
          <v-list-item to="/historique" prepend-icon="mdi-history" title="Historique" value="historique"></v-list-item>
          <v-divider></v-divider>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-divider></v-divider>
            <v-list density="compact" nav>
              <v-list-item @click="deconDialog = true" prepend-icon="mdi-logout" title="Se déconnecter"
                style="color: rgb(221, 39, 15);"></v-list-item>
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

                  <v-list-item-title>{{ currentUser.lastname }} {{ currentUser.firstname }} <v-avatar size="36" v-on="on"
                      class="ml-2 mr-2">
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
    <v-row justify="center">
      <v-dialog v-model="deconDialog" persistent width="330" content-class="custom-dialog">
        <v-card class="custom-card">
          <v-form ref="form">
            <v-card-title class="custom-title">
              <span class="text-h6">Voulez-vous vous déconnecter ?</span>
            </v-card-title>
            <v-card-text class="custom-text">
              <v-container>
                <v-btn class="ml-12" color="red" @click="logout">Oui</v-btn>
                <v-btn class="ml-12" color="blue darken-1" @click="non">Non</v-btn>
              </v-container>
            </v-card-text>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>



<style scoped>
/* Ajoutez ces styles à votre feuille de style CSS */



/* Ajoutez d'autres styles personnalisés selon vos besoins */

.logo-container {
  text-align: center;
  /* Change from center to right */
  margin-right: 20px;
  /* Add margin for spacing */
}

.logo {
  width: 10rem;
  height: 90px;
  margin-left: 40px;
  /* Add this line to ensure the logo is aligned to the right within its container */

}

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
import local from "@/storage/local";

export default {

  data: () => ({
    currentUser: '',
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
    deconDialog: false,

  }),
  mounted() {
    // Écoute les changements de la largeur de l'écran et met à jour l'état de la navigation
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    const users = local.getSharedData()
    this.currentUser = users.user
  },

  methods: {

    async validate_change() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        try {
          // console.log('change password =', this.password_change);

          const params = { new_password: this.password_change };

          const response = await this.$axios.put(`/user/update_password/${this.currentUser.id}`, null, { params });

          console.log('update_password =', response.data);
          this.password_change = ''; // Réinitialisez le mot de passe après la mise à jour réussie
          this.showSnackbar('Mot de passe modifié avec succès', 'success');
          this.dialog_change = false;
          this.$router.push('/connexion')
        } catch (error) {
          console.error('Erreur lors de la mise à jour du mot de passe:', error);
          this.showSnackbar('Une erreur s\'est produite lors de la modification du mot de passe...', 'error');
        }
      } else {
        console.log("BAD !!!");
        this.showSnackbar('Une erreur s\'est produite lors de la modification du mot de passe....', 'error');
      }
    },

    handleResize() {
      // Utilisez des breakpoints pour activer/désactiver le rail en fonction de la largeur de l'écran
      if (window.innerWidth <= 968) {
        this.rail = true;

      } else {
        this.rail = false;
      }
    },
    non() {
      // Vous pouvez attribuer une nouvelle valeur vide (null ou "") à la variable updateDialog

      this.deconDialog = null; // ou this.updateDialog = "";

    },
    async logout() {
      console.log("logout");
      appStore.logout();
      local.clearSharedData()
      this.$router.push('/connexion');
    },
    showSnackbar(text, color) {
      this.snackbar.text = text;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },
  },
};
</script>
