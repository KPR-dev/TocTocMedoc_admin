<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container>
    <v-row>
      <v-breadcrumbs :items="items">
        <template v-slot:prepend>
          <v-icon size="small" icon="mdi-wallet"></v-icon>
          <v-card-title color="primary">
            Facturations
          </v-card-title>
        </template>
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-left"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-row>
    <v-divider></v-divider>
    <v-container class="mt-8">

      <v-row>
        <div class="d-flex align-center flex-column">
          <div class="d-flex flex-wrap justify-content-between" >
            <v-card class="mx-4 my-6" width="300" title="Factures" prepend-icon="mdi-wallet" style="background: #CEE5FF;">
              <div class="mx-4 my-6">
                <h1> {{ numberFactures }}</h1>
              </div>
            </v-card>
          </div>
        </div>
        <!-- <v-btn color="success" prepend-icon="mdi-plus-circle" @click="dialog = true">
          Ajouter un véhicule
        </v-btn> -->
        <!-- <v-card class="mx-4 my-6" type="button" width="300" title="Ajouter une facture"
          prepend-icon="mdi-wallet" @click="dialog = true" style="background: #00639A; color: white;">
          <div>
            <h1> <svg xmlns="http://www.w3.org/2000/svg" width="57" height="56" viewBox="0 0 57 56" fill="none">
                <path
                  d="M44.8334 30.3334H30.8334V44.3334H26.1667V30.3334H12.1667V25.6667H26.1667V11.6667H30.8334V25.6667H44.8334V30.3334Z"
                  fill="#E8E5FF" />
              </svg></h1>
          </div>
        </v-card> -->
      </v-row>
      <v-card class="mx-auto mt-8" >
        <v-card-title>
          Toutes les factures
          <v-spacer></v-spacer>
          <v-text-field v-model="search" label="Recherche" single-line hide-details variant="outlined"></v-text-field>
        </v-card-title><br><br>

        <v-data-table :headers="headers" :items="factures" :search="search">
          <template v-slot:item.actions="{ item }">
            <v-container>
              <v-row justify="center" align="center">
                <v-btn prepend-icon="mdi-pencil" @click="updateDialog = true; facture = item.columns;"></v-btn>
                <v-spacer></v-spacer>
                <v-btn prepend-icon="mdi-delete" color="red" @click="dialogDelete = true; facture = item.columns;"></v-btn>
              </v-row>
            </v-container>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-container>


  <!-- modal d'ajout un utilisateur------------------------------------------------------------------------------------------------------------------------------------------>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <v-form ref="form">
          <v-card-title>
            <span class="text-h6">Ajouter une facture</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="facture.lastname" clearable :rules="rules" label="Nom *"
                    hint="Veuillez entrer le nom" variant="outlined"></v-text-field>
                </v-col>


              </v-row>
            </v-container>
            <small class="text-danger">*Champs obligatoire</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
              Annuler
            </v-btn>
            <v-btn color="blue-darken-1" variant="flat" @click="validate">
              Enregistrer
            </v-btn>
          </v-card-actions>
        </v-form>
        <v-snackbar v-model="snackbar" :color="snackbarColor" class="snackbar">
          {{ snackbarText }}
          <!-- <v-btn color="white" text @click="snackbar.show = false" prepend-icon="mdi-close"></v-btn> -->
        </v-snackbar>
      </v-card>
    </v-dialog>
  </v-row>


  <!-- modal de modification d'un utilisateur------------------------------------------------------------------------------------------------------------------------------------------>
  <v-row justify="center">
    <v-dialog v-model="updateDialog" persistent width="1024">
      <v-card>
        <v-form ref="form">
          <v-card-title>
            <span class="text-h6">Modification d'une facture</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="facture.facture_code" clearable :rules="rules" label="Nom utilisateur *"
                    hint="Veuillez entrer le nom utilisateur" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="facture.lastname" clearable :rules="rules" label="Nom *"
                    hint="Veuillez entrer le nom" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="facture.firstname" :rules="rules" clearable label="Prénom *"
                    hint="Veuillez entrer le prenom" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="facture.phone_number" clearable :rules="rules" label="Télephone *"
                    hint="Veuillez entrer le télephone" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="facture.email" clearable :rules="rules" label="Email *"
                    hint="Veuillez entrer un email valide" variant="outlined"></v-text-field>
                </v-col>

              </v-row>
            </v-container>
            <small class="text-danger">*Champs obligatoire</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="annuler">
              Annuler
            </v-btn>
            <v-btn color="blue-darken-1" variant="flat" @click="updated_facture">
              Modifier
            </v-btn>
          </v-card-actions>
        </v-form>
        <v-snackbar v-model="snackbar" :color="snackbarColor" class="snackbar">
          {{ snackbarText }}
          <!-- <v-btn color="white" text @click="snackbar.show = false" prepend-icon="mdi-close"></v-btn> -->
        </v-snackbar>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" persistent max-width="600px">
      <v-card>
        <v-card-title class="text-h6">Êtes-vous sûr de bien vouloir supprimer cet élément?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialogDelete = false">Annuler</v-btn>
          <v-btn color="red" variant="flat" @click="deleteItemConfirm">Oui</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style>
.snackbar {
  position: absolute;
  bottom: 20%;
  left: 5%;
}
</style>

<script>
import { VDataTable } from "vuetify/labs/VDataTable";
import moment from "moment";

export default {
  components: {
    VDataTable,
  },
  data: () => ({
    selectedItem: null, // Initialisez la valeur sélectionnée
    snackbar: false,
    snackbarText: '',
    snackbarColor: '',
    // Durée en millisecondes (6 secondes ici, ajustez-la selon vos besoins)
    snackbarTimeout: 1000,
    updateDialog: false,
    dialog: false,
    dialog_driver: false,
    dialog_role: false,
    dialogDelete: false,
    search: "",
    headers: [





    ],
    factures: [],
    facture: {
      firstname: "",
      lastname: "",
      phone_number: "",
      email: "",
      facture_code: "",
    },



    rules: [
      (value) => !!value || "Veuillez renseigner ce champs",
    ],

  }),

  mounted() {
    this.getFacture();
    // this.Change_select();

  },

  computed: {

    numberFactures() {
      // Utilisez la propriété length pour obtenir le nombre de tickets dans le tableau
      return this.factures.length;
    },
    formattedDate() {
      return (date) => moment(date).format("DD/MM/YYYY à HH:mm");
    },
  },

  methods: {
    showSnackbar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },


    annuler() {
      // Vous pouvez attribuer une nouvelle valeur vide (null ou "") à la variable updateDialog
      this.updateDialog = null; // ou this.updateDialog = "";
      this.facture = ""
    },

    async getFacture() {
      this.$axios.get("/facture/all").then((response) => {
        this.factures = response.data;

        console.log('all facture =', response.data);
      });
    },

    async add_facture() {
      console.log(this.facture)
      this.$axios
        .post("/facture/add", this.facture).then((response) => {
          this.facture = {};
          console.log('Add facture =', response);
          this.getFacture();

        })
        .catch((error) => {
          console.log(error.response.data.detail);

        });
    },
    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        console.log(this.facture);
        await this.add_facture();
        await this.getFacture();
        this.showSnackbar('Utilisateur ajouté avec succès', 'success');
        this.dialog = false;
      } else {
        console.log("BAD  !!!!");
        this.showSnackbar('Une erreur s\'est produite lors de l\'ajout d\'un Utilisateur verifiez les champs', 'error');
      }
    },
    async updated_facture() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        try {
          console.log('facture =', this.facture);
          const requestData = {
            id: this.facture.id,
            firstname: this.facture.firstname,
            lastname: this.facture.lastname,
            phone_number: this.facture.phone_number,
            email: this.facture.email,
            facture_code: this.facture.facture_code,
            role: this.facture.role,
            // created_at: this.facture.created_at,
            // updated_at: this.facture.updated_at,
          };

          const response = await this.$axios.put('/facture/update_facture/'+this.facture.facture_code, requestData);
          console.log('Update facture =', response.data);
          this.facture = {}; // Effacez les données du conducteur après la mise à jour réussie
          this.showSnackbar('Utilisateur modifié avec succès', 'success');
          this.updateDialog = false;
          this.getFacture();
        } catch (error) {
          console.error('Erreur lors de la mise à jour:', error);
          this.showSnackbar('Une erreur s\'est produite lors de la modification ...', 'error');
        }
      } else {
        console.log("BAD !!!!");
        this.showSnackbar('Une erreur s\'est produite lors de la modification ...', 'error');
      }
    },
  }



}



</script>

