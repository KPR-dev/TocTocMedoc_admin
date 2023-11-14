<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container>
    <v-row>
      <v-breadcrumbs :items="items">
        <template v-slot:prepend>
          <v-icon size="small" icon="mdi-barcode"></v-icon>
          <v-card-title color="primary">
            Grille Tarifaire
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
            <v-card class="mx-4 my-6" width="300" title="Tarifs" prepend-icon="mdi-barcode" style="background: #CEE5FF;">
              <div class="mx-4 my-6">
                <h1> {{ Rate }}</h1>
              </div>
            </v-card>
          </div>
        </div>
        <!-- <v-btn color="success" prepend-icon="mdi-plus-circle" @click="dialog = true">
          Ajouter un véhicule
        </v-btn> -->
        <v-card class="mx-4 my-6" type="button" width="300" title="Ajouter un tarif" prepend-icon="mdi-barcode"
          @click="dialog = true" style="background: #00639A; color: white;">
          <div>
            <h1> <svg xmlns="http://www.w3.org/2000/svg" width="57" height="56" viewBox="0 0 57 56" fill="none">
                <path
                  d="M44.8334 30.3334H30.8334V44.3334H26.1667V30.3334H12.1667V25.6667H26.1667V11.6667H30.8334V25.6667H44.8334V30.3334Z"
                  fill="#E8E5FF" />
              </svg></h1>
          </div>
        </v-card>
      </v-row>

      <!-- <v-card-title>
          Tous les tarifs
          <v-spacer></v-spacer>
 <v-text-field v-model="search" label="Recherche" single-line hide-details variant="outlined"></v-text-field>
        </v-card-title><br><br> -->

      <v-row>
        <v-col v-for="(rate, index) in rates" :key="index" cols="12" md="4" :headers="headers" :items="rates"
          :search="search">
          <v-card class="mx-4 my-6" width="300" style="border-radius: 8px;
background: var(--material-theme-sys-light-surface-variant, #DEE3EB)">
            <v-card-title>{{ rate.libelle }}</v-card-title>
            <v-card-subtitle>{{ rate.price }} FCFA</v-card-subtitle>
            <v-card-text>{{ rate.credit }} Crédits</v-card-text>
            <v-card-actions>
              <v-btn prepend-icon="mdi-pencil" @click="editRate(rate)"></v-btn>
              <v-btn prepend-icon="mdi-delete" color="red" @click="confirmDelete(rate)"></v-btn>
              <!-- Ajoutez les actions nécessaires ici -->
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- <v-data-table :headers="headers" :items="rates" :search="search">
          <template v-slot:item.actions="{ item }">
            <v-container>
              <v-row justify="center" align="center">
                <v-btn prepend-icon="mdi-pencil" @click="updateDialog = true; rate = item.columns;"></v-btn>
                <v-btn prepend-icon="mdi-delete" color="red" @click="dialogDelete = true; rate = item.columns;"></v-btn>
              </v-row>
            </v-container>
          </template>
        </v-data-table> -->

    </v-container>
  </v-container>


  <!-- modal d'ajout un tarif------------------------------------------------------------------------------------------------------------------------------------------>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="900">
      <v-card>
        <v-form ref="form">
          <v-card-title>
            <span class="text-h6">Ajouter un tarif</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="10" sm="4">
                  <v-text-field v-model="rate.libelle" clearable :rules="rules" label="Libelle *"
                    hint="Veuillez entrer le libelle" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="10" sm="4">
                  <v-text-field type="number" v-model="rate.price" clearable :rules="rules" label="Prix *"
                    hint="Veuillez entrer le prix" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="10" sm="4">
                  <v-text-field type="number" v-model="rate.credit" clearable :rules="rules" label="Crédit *"
                    hint="Veuillez entrer le crédit" variant="outlined"></v-text-field>
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


  <!-- modal de modification d'un tarif------------------------------------------------------------------------------------------------------------------------------------------>
  <v-row justify="center">
    <v-dialog v-model="updateDialog" persistent width="1024">
      <v-card>
        <v-form ref="form">
          <v-card-title>
            <span class="text-h6">Modification d'un tarif</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="10" sm="4">
                  <v-text-field v-model="rate.libelle" clearable :rules="rules" label="Libelle *"
                    hint="Veuillez entrer le libelle" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="10" sm="4">
                  <v-text-field v-model="rate.price" clearable :rules="rules" label="Prix *"
                    hint="Veuillez entrer le prix" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="10" sm="4">
                  <v-text-field v-model="rate.credit" :rules="rules" clearable label="Crédit *"
                    hint="Veuillez entrer le crédit" variant="outlined"></v-text-field>
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
            <v-btn color="blue-darken-1" variant="flat" @click="updated_rate">
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
// import { VDataTable } from "vuetify/labs/VDataTable";
import moment from "moment";

export default {
  components: {
    // VDataTable,
  },
  data: () => ({
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
    // search: "",
    // headers: [

    //   { key: "libelle", title: "libelle" },
    //   { key: "price", title: "Prix" },
    //   { key: "credit", title: "Crédit" },
    //   { title: "Actions", key: "actions", sortable: false },
    // ],
    rates: [],
    rate: {
      libelle: "",
      price: "",
      credit: "",
    },

    rules: [
      (value) => !!value || "Veuillez renseigner ce champs",
    ],

  }),

  mounted() {
    this.get_rates()

  },

  computed: {
    Rate() {
      // Utilisez la propriété length pour obtenir le nombre de tickets dans le tableau
      return this.rates.length;
    },
    formattedDate() {
      return (date) => moment(date).format("DD/MM/YYYY à HH:mm");
    },
  },

  methods: {

    editRate(rate) {
      this.rate = { ...rate };
      this.updateDialog = true;
    },
    confirmDelete(rate) {
      this.rate = { ...rate };
      this.dialogDelete = true;
    },
    showSnackbar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },

    annuler() {
      // Vous pouvez attribuer une nouvelle valeur vide (null ou "") à la variable updateDialog
      this.updateDialog = null; // ou this.updateDialog = "";
      this.rate = ""
    },

    async get_rates() {
      try {
        const response = await this.$axios.get("/rate/all");
        this.rates = response.data;
        console.log('all rates =', this.rates); // Ajoutez cette ligne
      } catch (error) {
        console.error('Error fetching rates:', error);
      }
    },

    async add_rate() {
      console.log(this.rate)
      this.$axios
        .post("/rate/add", this.rate).then((response) => {
          this.rate = {};
          console.log('Add rate =', response);
          this.get_rates();

        })
        .catch((error) => {
          console.log(error.response.data.detail);

        });
    },
    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        console.log(this.rate);
        await this.add_rate();
        await this.get_rates();
        this.showSnackbar('tarif ajouté avec succès', 'success');
        this.dialog = false;
      } else {
        console.log("BAD  !!!!");
        this.showSnackbar('Une erreur s\'est produite lors de l\'ajout d\'un tarif verifiez les champs', 'error');
      }
    },

    async updated_rate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        try {
          console.log('rate =', this.rate);
          const requestData = {
            id: this.rate.id,
            libelle: this.rate.libelle,
            price: this.rate.price,
            credit: this.rate.credit,
            // created_at: this.rate.created_at,
            // updated_at: this.rate.updated_at,
          };

          const response = await this.$axios.put('/rate/update/' + this.rate.id, requestData);
          console.log('Update rate =', response.data);
          this.rate = {}; // Effacez les données du conducteur après la mise à jour réussie
          this.showSnackbar('tarif modifié avec succès', 'success');
          this.updateDialog = false;
          this.get_rates();
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
      console.log('rate =', this.rate);
      const requestData = {
        id: this.rate.id,
        libelle: this.rate.libelle,
        price: this.rate.price,
        credit: this.rate.credit,
      };
      this.$axios.delete('/rate/delete/' + this.rate.id, requestData)
        .then(() => {
          this.showSnackbar('Tarif supprimé avec succès', 'success');
          this.get_rates(); // Rafraîchit la liste des tarifs après la suppression
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression du tarif:', error);
          this.showSnackbar('Erreur lors de la suppression du tarif', 'error');
        })
        .finally(() => {
          this.dialogDelete = false; // Ferme la boîte de dialogue après la suppression
        });
    },


  },


}

</script>

