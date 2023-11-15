<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container>
    <v-row>
      <v-breadcrumbs :items="items">
        <template v-slot:prepend>
          <v-icon size="small" icon="mdi-account-group"></v-icon>
          <v-card-title color="primary">
            Utilisateurs
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
            <v-card class="mx-4 my-6" width="300" title="Utilisateurs" prepend-icon="mdi-account-group"
              style="background: #CEE5FF;">
              <div class="mx-4 my-6">
                <h1>{{ numberusers }}</h1>
              </div>
            </v-card>
          </div>
        </div>
        <v-card class="mx-4 my-6" width="300" title="Ajouter un utilisateur" prepend-icon="mdi-account-group"
          @click="dialog = true" style="background: #00639A; color: white;">
          <div>
            <h1><svg xmlns="http://www.w3.org/2000/svg" width="57" height="56" viewBox="0 0 57 56" fill="none">
                <path
                  d="M44.8334 30.3334H30.8334V44.3334H26.1667V30.3334H12.1667V25.6667H26.1667V11.6667H30.8334V25.6667H44.8334V30.3334Z"
                  fill="#E8E5FF" />
              </svg></h1>
          </div>
        </v-card>
      </v-row>
      <v-card class="mx-auto mt-8">
        <v-card-title>
          Liste des utilisateurs
          <v-spacer></v-spacer>
          <v-text-field v-model="search" label="Recherche" single-line hide-details variant="outlined"></v-text-field>
        </v-card-title>

        <v-data-table :headers="headers" :items="users" :search="search" items-per-page="5">
          <template v-slot:item.actions="{ item }">
            <v-container>
              <v-row justify="center" align="center">
                <v-btn prepend-icon="mdi-pencil" @click="editUser(item)"></v-btn>
                <v-spacer></v-spacer>
                <v-btn prepend-icon="mdi-delete" color="red" @click="dialogDelete = true; user = item.user;"></v-btn>
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
            <span class="text-h6">Ajouter un utilisateur</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="user.lastname" clearable :rules="rules" label="Nom *"
                    hint="Veuillez entrer le nom" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="user.firstname" :rules="rules" clearable label="Prénom *"
                    hint="Veuillez entrer le prenom" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="user.phone" clearable :rules="rules" label="Télephone *"
                    hint="Veuillez entrer le télephone" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="user.email" clearable :rules="rules" label="Email *"
                    hint="Veuillez entrer un email valide" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select v-model="user.role" :items="roles" label="Rôle *" hint="Veuillez sélectionner un rôle"
                    variant="outlined"></v-select>
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
            <span class="text-h6">Modification d'un utilisateur</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="user.lastname" clearable :rules="rules" label="Nom *"
                    hint="Veuillez entrer le nom" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="user.firstname" :rules="rules" clearable label="Prénom *"
                    hint="Veuillez entrer le prenom" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="user.phone" clearable :rules="rules" label="Télephone *"
                    hint="Veuillez entrer le télephone" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="user.email" clearable :rules="rules" label="Email *"
                    hint="Veuillez entrer un email valide" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select v-model="user.role" :items="roles" label="Rôle *" hint="Veuillez sélectionner un rôle"
                    variant="outlined"></v-select>
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
            <v-btn color="blue-darken-1" variant="flat" @click="updated_user">
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
          <v-btn color="red" variant="flat" @click="delete_user">Oui</v-btn>
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

      { key: "user.lastname", title: "Nom" },
      { key: "user.firstname", title: "Prénom" },
      { key: "user.phone", title: "Télephone" },
      { key: "user.email", title: "Email" },
      { key: "user.role", title: "Role" },
      // { key: "subscription_date", title: "Date de subscription" },
      { key: "rate.libelle", title: "Son Tarif" },
      { key: "credit", title: "Credit" },
      { title: "Actions", key: "actions", sortable: false },
    ],
    users: [],
    user: {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      role: ""
    },

    roles: ['ADMIN', 'USER'],
    rules: [
      (v) => !!v || 'Ce champ est requis', // Add any validation rules you need
    ],

  }),

  mounted() {
    this.get_user();
  },

  computed: {

    numberusers() {
      // Utilisez la propriété length pour obtenir le nombre de tickets dans le tableau
      return this.users.length;
    },
    formattedDate() {
      return (date) => moment(date).format("DD/MM/YYYY à HH:mm");
    },
  },

  methods: {

    editUser(item) {
      // Copier toutes les propriétés de item dans l'objet user que vous utilisez pour la modification
      this.user = { ...item.user };

      // Ouvrir le dialogue de modification
      this.updateDialog = true;
    },

    showSnackbar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },

    annuler() {
      // Vous pouvez attribuer une nouvelle valeur vide (null ou "") à la variable updateDialog
      this.updateDialog = null; // ou this.updateDialog = "";
      this.user = ""
    },

    async get_user() {
      try {
        const response = await this.$axios.get("/account/all");
        this.users = response.data;
        console.log('all users =', this.users); // Ajoutez cette ligne
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async add_user() {
      try {
        const Data = {

          firstname: this.user.firstname,
          lastname: this.user.lastname,
          email: this.user.email,
          phone: this.user.phone,
          role: this.user.role,
          password: "root"
        };
        const response = await this.$axios.post("/user/add", Data);
        this.user = {};  // Effacez les données après l'ajout réussi
        console.log('Add user =', response.Data);
        this.get_user();  // Rafraîchissez la liste des utilisateurs
        this.showSnackbar('Utilisateur ajouté avec succès', 'success');
        this.dialog = false;
      } catch (error) {
        console.error('Error adding user:', error);
        this.showSnackbar('Une erreur s\'est produite lors de l\'ajout de l\'utilisateur, veuillez vérifier les champs', 'error');
      }
    },

    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        console.log(this.user);
        await this.add_user();
        await this.get_user();
        this.showSnackbar('Utilisateur ajouté avec succès', 'success');
        this.dialog = false;
      } else {
        console.log("BAD  !!!!");
        this.showSnackbar('Une erreur s\'est produite lors de l\'ajout de l\'utilisateur verifiez les champs', 'error');
      }
    },

    async updated_user() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        try {
          console.log('USER =', this.user);
          const requestData = {
            id: this.user.id,
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            phone: this.user.phone,
            email: this.user.email,
            role: this.user.role,
          };

          const response = await this.$axios.put('/user/update_user/' + this.user.code, requestData);
          console.log('Update user =', response.data);
          this.user = {}; // Effacez les données du conducteur après la mise à jour réussie
          this.showSnackbar('Utilisateur modifié avec succès', 'success');
          this.updateDialog = false;
          this.get_user();
        } catch (error) {
          console.error('Erreur lors de la mise à jour:', error);
          this.showSnackbar('Une erreur s\'est produite lors de la modification ...', 'error');
        }
      } else {
        console.log("BAD !!!!");
        this.showSnackbar('Une erreur s\'est produite lors de la modification ...', 'error');
      }
    },
    async delete_user() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        try {
          console.log('USER =', this.user);

          const response = await this.$axios.put('/user/delete/' + this.user.id);
          console.log('Update user =', response.data);
          this.user = {}; // Effacez les données du conducteur après la mise à jour réussie
          this.showSnackbar('Utilisateur effacé avec succès', 'success');
          this.deleteDialog = false;
          this.get_user();
        } catch (error) {
          console.error('Erreur lors de la suppression:', error);
          this.showSnackbar('Une erreur s\'est produite lors de la suppression ...', 'error');
        }
      } else {
        console.log("BAD !!!!");
        this.showSnackbar('Une erreur s\'est produite lors de la suppression ...', 'error');
      }
    },



    deleteItemConfirm() {
      console.log('rate =', this.user);
      const requestData = {
        id: this.user.id,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        phone: this.user.phone,
        email: this.user.email,
        role: this.user.role,
      };
      this.$axios.delete('/user/delete/'+this.user.id, requestData)
        .then(() => {
          this.showSnackbar('Utilisateur supprimé avec succès', 'success');
          this.get_user(); // Rafraîchit la liste des Utilisateurs après la suppression
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression du Utilisateur:', error);
          this.showSnackbar('Erreur lors de la suppression du Utilisateur', 'error');
        })
        .finally(() => {
          this.dialogDelete = false; // Ferme la boîte de dialogue après la suppression
        });
    },
  },


}

</script>

