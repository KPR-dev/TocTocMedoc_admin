<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container>
    <v-row>
      <v-breadcrumbs :items="items">
        <template v-slot:prepend>
          <v-icon size="small" icon="mdi-barcode"></v-icon>
          <v-card-title color="primary">
            Grille tarifaire
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
          <div class="d-flex flex-wrap justify-content-between">
            <v-card class="mx-4 my-6" width="300" title="Grilles" prepend-icon="mdi-barcode"
              style="background: #CEE5FF;">
              <div class="mx-4 my-6">
                <h1>{{ numbergrille }}</h1>
              </div>
            </v-card>
            <v-card class="mx-4 my-6" width="300" title="Ajouter une grille" prepend-icon="mdi-barcode"
              @click="dialog = true" style="background: #00639A; color: white;">
              <div>
                <h1><svg xmlns="http://www.w3.org/2000/svg" width="57" height="56" viewBox="0 0 57 56" fill="none">
                    <path
                      d="M44.8334 30.3334H30.8334V44.3334H26.1667V30.3334H12.1667V25.6667H26.1667V11.6667H30.8334V25.6667H44.8334V30.3334Z"
                      fill="#E8E5FF" />
                  </svg></h1>
              </div>
            </v-card>
          </div>
        </div>

      </v-row>
      <v-card class="mx-auto mt-8">
        <v-btn prepend-icon="mdi-reload" color="blue" @click="get_tarif"><v-span>Actualiser</v-span></v-btn>
        <v-card-title>
          Liste des tarifs
          <v-spacer></v-spacer>
          <v-text-field v-model="search" label="Recherche" single-line hide-details variant="outlined"></v-text-field>
        </v-card-title>

        <v-data-table :headers="headers" :items="users" :search="search" items-per-page="5">
          <template v-slot:item.actions="{ item }">
            <v-container>
              <v-row justify="center" align="center">
                <v-btn prepend-icon="mdi-pencil" @click=" updateDialog = true; user = item;"></v-btn>

                <v-btn prepend-icon="mdi-delete" color="red" @click="dialogDelete = true; user = item;"></v-btn>
              </v-row>
            </v-container>
          </template>
        </v-data-table>
      </v-card>

    </v-container>
  </v-container>



  <!-- modal d'ajout d'une grille------------------------------------------------------------------------------------------------------------------------------------------>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <v-form ref="form">
          <v-card-title>
            <span class="text-h6">Ajouter une grille</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="user.libelle" clearable :rules="rules" label="Action *"
                    hint="Veuillez entrer l'action" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="user.credit" :rules="rules" clearable label="Crédit *"
                    hint="Veuillez entrer le nombre de credit" variant="outlined"></v-text-field>
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

  <v-row justify="center">
    <v-dialog v-model="updateDialog" persistent width="1024">
      <v-card>
        <v-form ref="form">
          <v-card-title>
            <span class="text-h6">Modification de la grille</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="user.libelle" clearable :rules="rules" label="Action *"
                    hint="Veuillez entrer l'action" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="user.credit" :rules="rules" clearable label="Crédit *"
                    hint="Veuillez entrer le nombre de credit" variant="outlined"></v-text-field>
                </v-col>


              </v-row>
            </v-container>
            <small class="text-danger">*Champs obligatoire </small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="annuler">
              Annuler
            </v-btn>
            <v-btn color="blue-darken-1" variant="flat" @click="updated_tarif">
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
    snackbarTimeout: 100,
    updateDialog: false,
    dialog: false,
    dialog_driver: false,
    dialog_role: false,
    dialogDelete: false,
    search: "",


    headers: [

      { key: "id", title: "#" },
      { key: "libelle", title: "Libellé" },
      { key: "credit", title: "Crédit" },
      { key: "created_at", title: "Créer le" },
      { title: "Actions", key: "actions", sortable: false },

    ],
    users: [],
    userIds: [],
    user: {
      libelle: "",
      credit: "",
    },
    id_compte: "",

    rules: [
      (v) => !!v || 'Ce champ est requis', // Add any validation rules you need
    ],
    databaseOptions: [],

  }),

  mounted() {
    this.get_tarif();

  },

  computed: {

    numbergrille() {
      // Utilisez la propriété length pour obtenir le nombre de tickets dans le tableau
      return this.users.length;
    },
    formattedDate() {
      return (date) => moment(date).format("DD/MM/YYYY à HH:mm");
    },
  },

  methods: {

    /* editUser(item) {
      // Copier toutes les propriétés de item dans l'objet user que vous utilisez pour la modification
      this.user = { ...item.user };

      // Ouvrir le dialogue de modification
      this.updateDialog = true;
    }, */

    showSnackbar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },

    annuler() {
      // Vous pouvez attribuer une nouvelle valeur vide (null ou "") à la variable updateDialog
      this.updateDialog = false;
      //this.choiceDialog = null; // ou this.updateDialog = "";
      this.user = "";
    },
    annuler1() {
      // Vous pouvez attribuer une nouvelle valeur vide (null ou "") à la variable updateDialog

      this.choiceDialog = null; // ou this.updateDialog = "";
    },
    annuler2() {
      // Vous pouvez attribuer une nouvelle valeur vide (null ou "") à la variable updateDialog

      this.subDialog = null; // ou this.updateDialog = "";
    },


    async get_tarif() {
      try {
        const response = await this.$axios.get("/price_list/all");
        for (var i = 0; i < response.data.length; i++) {
          response.data[i].subscription_date = this.formattedDate(
            response.data[i].subscription_date
          );
          response.data[i].updated_at = this.formattedDate(
            response.data[i].updated_at
          );
          response.data[i].created_at = this.formattedDate(
            response.data[i].created_at
          );
        }
        this.users = response.data;
        console.log('all tarifs =', this.users);

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async add_tarif() {
      try {
        const Data = {

          libelle: this.user.libelle,
          credit: this.user.credit,

        };
        const response = await this.$axios.post("/price_list/add", Data);
        this.user = {};  // Effacez les données après l'ajout réussi
        console.log('Add user =', response.Data);
        this.get_tarif();  // Rafraîchissez la liste des Grilles
        this.showSnackbar('Grille ajouté avec succès', 'success');
        this.dialog = false;
      } catch (error) {
        console.error('Error adding user:', error);
        this.showSnackbar('Une erreur s\'est produite lors de l\'ajout de la grille, veuillez vérifier les champs', 'error');
      }
    },

    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        console.log(this.user);
        await this.add_tarif();
        await this.get_tarif();
        this.showSnackbar('Grille ajoutée avec succès', 'success');
        this.dialog = false;
      } else {
        console.log("BAD  !!!!");
        this.showSnackbar('Une erreur s\'est produite lors de l\'ajout de la Grille verifiez les champs', 'error');
      }
    },

    async updated_tarif() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        try {
          console.log('USER =', this.user);
          const requestData = {
            // id_compte : this.id_compte,
            id: this.user.id,
            libelle: this.user.libelle,
            credit: this.user.credit,

          };
          console.log('id_compte=', this.id_compte.id)

          const response = await this.$axios.put('/price_list/update/' + this.user.id, requestData);
          console.log('Update grille =', response.data);
          this.user = {}; // Effacez les données du conducteur après la mise à jour réussie
          this.showSnackbar('Grille modifié avec succès', 'success');
          this.updateDialog = false;
          this.get_tarif();
        } catch (error) {
          console.error('Erreur lors de la mise à jour:', error);
          this.showSnackbar('Une erreur s\'est produite lors de la modification ...', 'error');
        }
      } else {
        console.log("BAD !!!!");
        this.showSnackbar('Une erreur s\'est produite lors de la modification ...', 'error');
      }
    },

    deleteItemConfirm() {
      console.log('user =', this.user);
      const requestData = {
        id: this.user.id,
        libelle: this.user.libelle,
        credit: this.user.credit,

      };
      this.$axios.delete('/price_list/delete/' + this.user.id, requestData)
        .then(() => {
          this.showSnackbar('Grille supprimé avec succès', 'success');
          this.get_tarif(); // Rafraîchit la liste des Grilles après la suppression
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression du Grille:', error);
          this.showSnackbar('Erreur lors de la suppression du Grille', 'error');
        })
        .finally(() => {
          this.user = {};
          this.dialogDelete = false; // Ferme la boîte de dialogue après la suppression
        });



    },

    async validate_rate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        try {
          console.log('rate id =', this.sub.id);

          // Choisissez un Grille spécifique ou ajustez votre logique pour sélectionner le bon Grille
          const IdCompte = this.id_compte;
          console.log('id_compte =', IdCompte);

          const params = { rate_id: this.sub.id };
          const response = await this.$axios.put(`/account/subscribe_rate/${IdCompte}`, null, { params });

          console.log('subscribe_rate user =', response.data);
          this.sub = {}; // Effacez les données du conducteur après la mise à jour réussie
          this.subDialog = false;
          this.choiceDialog = false;
          this.updateDialog = false;
          this.choiceDialog = false;
          this.get_tarif();
        } catch (error) {
          console.error('Erreur lors de la mise à jour:', error);
          this.showSnackbar('Une erreur s\'est produite lors de la modification ...', 'error');
        }
      } else {
        console.log("BAD !!!!");
        this.showSnackbar('Une erreur s\'est produite lors de la modification ...', 'error');
      }
    },






  },


}

</script>

