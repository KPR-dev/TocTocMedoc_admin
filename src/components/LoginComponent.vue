<template>
  <div>
    <div class="test">
      <img src="@/assets/no.png" alt="Logo" class="app-logo" />
      <v-card :elevation="80" :loading="loading" id="card" class="card-container xs12 md8 mx-auto">
        <v-progress-linear color="primary" v-if="loading" indeterminate></v-progress-linear>
        <v-row align="center">
          <v-col xs="12" md="6">
            <v-container id="image">
              <v-responsive class="align-center text-center fill-height">
                <v-img src="@/assets/frame.png" alt="Votre logo" class="logo"></v-img>
              </v-responsive>
            </v-container>
          </v-col>
          <v-col xs="12" md="6">
            <v-container>
              <v-responsive class="align-center text-center fill-height">
                <v-row>
                  <v-col cols="12">
                    <p class="text-medium-emphasis mt-2 custom-text">Connexion</p>
                    <v-snackbar v-model="snackbar" :color="snackbarColor" class="snackbar">
                      {{ snackbarText }}
                    </v-snackbar>
                    <v-form ref="form">
                      <v-container class="mt-4">
                        <v-row>
                          <v-col cols="18">
                            <v-text-field hint="Veuillez entrer votre email" clearable v-model="codeUser" label="Email"
                              prepend-icon="mdi mdi-account-key" variant="outlined" :rules="codeUserRules"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="20">
                            <v-text-field hint="Veuillez entrer votre mot de passe" clearable
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" v-model="password" label="Mot de passe"
                              prepend-icon="mdi mdi-lock" variant="outlined" :rules="passwordRules"
                              :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col md="8" cols="12">
                            <v-btn class="mt-3" @click="validate" :loading="loading">
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
  </div>
</template>

<style>
.test {
  position: relative;
  top: 0;
  left: 0;
  background-color: white;
  height: 100vh;
  width: 190vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
}

@media screen and (max-width: 500px) {
  #image {
    /* display: none !important; */
    visibility: hidden;
  }

}




.app-logo {
  width: 100px;
  /* Largeur du logo */
  height: auto;
  margin-bottom: 90px;
  /* Marge en bas du logo */
}

.card-container {
  width: 800px;
  /* La largeur de la carte prendra 100% de la largeur de son conteneur */
  /* margin-left: 160px; */
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



.custom-text {
  left: 10px;
}
</style>

<script>
import { useAppStore } from '../store/app'
const appStore = useAppStore();
import local from '../storage/local'

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
            .post("auth/login_admin", formData)
            .then((response) => {
              appStore.setLogged()
              appStore.getCurrentUser(response.data.user)
              this.role_user = response.data.user.role
              this.$updateToken(response.data.token.access_token);
              const value = response.data
              console.log('value =', value)
              // Stocker le jeton d'authentification dans le stockage local
              local.setSharedData(response.data)
              console.log('localstorage =', localStorage)

              this.$router.push('/home')
              console.log("role_user=", this.role_user)
              this.showSnackbar('Connexion réussie!', 'success');
            })
        }
        catch (error) {
          // console.log(error.response.data.detail) ;

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

