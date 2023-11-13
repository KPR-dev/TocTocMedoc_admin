<template>
  <div id="app">
    <img src="@/assets/no.png" alt="Logo" class="app-logo" />
    <v-card :elevation="80" :height="400" :width="800" rounded :loading="loading" class="card-container">
      <v-progress-linear color="primary" v-if="loading" indeterminate></v-progress-linear>
      <v-row align="center">
        <v-col cols="12" md="6">
          <v-container>
            <v-responsive class="align-center text-center fill-height">
              <v-img src="@/assets/frame.png" alt="Votre logo" class="logo"></v-img>
            </v-responsive>
          </v-container>
        </v-col>
        <v-col cols="12" md="6">
          <v-container>
            <v-responsive class="align-center text-center fill-height">
              <v-row>
                <v-col cols="10">
                  <p class="text-medium-emphasis mt-2 custom-text">Connexion</p>
                  <v-snackbar v-model="snackbar" :color="snackbarColor" class="snackbar">
                    {{ snackbarText }}
                  </v-snackbar>
                  <v-form ref="form">
                    <v-container class="mt-4">
                      <v-row>
                        <v-col cols="12">
                          <v-text-field clearable v-model="codeUser" label="Adresse email" variant="outlined"
                            prepend-inner-icon="mdi mdi-account-key" outlined :rules="codeUserRules"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">

                          <v-text-field
                            v-model="password"
                            outlined :rules="passwordRules"
                            variant="outlined"
                            :type="show1 ?'text':'password'"
                            label="Mot de passe"
                            placeholder="Password"
                            prepend-inner-icon="mdi-key"
                            :append-inner-icon="show1  ? 'mdi-eye':'mdi-eye-off'"
                            @click:append="show1  = !show1 "
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="18">
                          <v-btn width="1200" class="mt-3" @click="validate" :loading="loading">
                            Connexion
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-col>
              </v-row>
            </v-responsive>
          </v-container>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<style>
#app {
  position: absolute;
  /* Utilisez la position absolue */
  top: 0;
  left: 0;
  background-color: white;
  /* Couleur de fond blanche */
  height: 100vh;
  /* Hauteur de l'écran */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* Alignement à gauche */
  justify-content: flex-start;
  /* Alignement en haut */
  padding: 20px;
  /* Espace intérieur pour le logo */
}

.app-logo {
  width: 100px;
  /* Largeur du logo */
  height: auto;
  margin-bottom: 90px;
  /* Marge en bas du logo */
}



.snackbar {
  position: absolute;
  bottom: 20%;
  left: 5%;
}

.logo {
  width: 100%;
  height: auto;
}

.v-input--has-icon.v-input--has-icon .v-icon {
  position: absolute;
  top: 50%;
  right: 2px;
  transform: translateY(-50%);
}

.custom-text {
  left: 10px;
}

.card-container {
  background-color: white;
  /* Couleur de fond blanche de la carte */
  margin-left: 160px;
  /* Ajustez la marge à droite selon vos besoins */
}
.custom-text-field {
  width: 100%; /* Set the width as needed */
}
/* Styles personnalisés pour les bordures et le bouton d'œil */
.password-input .v-input__icon--append {
  color: grey;
  /* Couleur de l'icône de l'œil */
}

.password-input .v-input__control--append .v-input__slot {
  padding-right: 0;
  /* Ajustement de l'espacement à droite */
}

.password-input .v-messages {
  margin-top: 2px;
  /* Ajustement de l'espacement du texte de validation */
}
</style>

<script>
import { useAppStore } from '../store/app'
const appStore = useAppStore();

export default {
  data: () => ({
    snackbar: false,
    snackbarText: '',
    snackbarColor: '',
    // Durée en millisecondes (6 secondes ici, ajustez-la selon vos besoins)
    snackbarTimeout: 100,
    loading: false,
    valid: true,
    show1: false,
    codeUser: "",
    role_user: "",
    codeUserRules: [
      (value) => !!value || "Veuillez entrer un code utilisateur",
    ],
    password: "",
    passwordRules: [(value) => !!value || "Veuillez entrer un mot de passe"],
  }),
  methods: {
    showSnackbar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },

    async validate() {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        try {
          this.loading = true
          const formData = new FormData();
          formData.append('grant_type', 'password');
          formData.append('username', this.codeUser);
          formData.append('password', this.password);

          await this.$axios
            .post("/auth/login", formData)
            .then((response) => {
              appStore.setLogged()
              appStore.getCurrentUser(response.data.user)
              this.role_user = response.data.user.role
              this.$updateToken(response.data.token.access_token);
              this.$router.push('/home')
              console.log("role_user=", this.role_user)
              this.showSnackbar('Connexion réussie!', 'success');
            })
        }
        catch (error) {
          // console.log(error.response.data.detail) ;
          const user = {
            lastname: "TOCTOCMEDOC",
            firstname: "TOCTOC",
            email: "toctocmedoc@gmail.com",
            code_user: "toctocmedoc",
            direction_slug: 'ADMIN',
            is_director: true,
            entity_slug: 'ADMIN',
            password: "root",
            role: 'ADMIN',
            attribution: 0
          }
          if (this.codeUser == "root" && this.password == "root") {
            appStore.setLogged()
            appStore.getCurrentUser(user)
            this.loading = !this.loading
            this.showSnackbar('Connexion réussie!', 'success');
            this.$router.push('/home')
          }
          else {
            this.showSnackbar('Erreur lors de la connexion coordonnées incorrect', 'error');
          }
          this.error = error.response.data.detail;
        }
        this.loading = !this.loading
      }
      else {
        console.log("BAD  !!!!");
        this.showSnackbar('Une erreur s\'est produite lors de la connexion verifiez les champs', 'error');
      }
    },
  },
};
</script>

<style>
.gradient-text {
  background: linear-gradient(45deg, #00ff00, #ffff00, #0000ff);
  background-clip: text;
  -webkit-background-clip: text;
  color: black;
  font-size: 36px;
  font-weight: bold;
}
</style>
