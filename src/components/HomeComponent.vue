<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container>
    <v-row>
      <v-breadcrumbs>
        <template v-slot:prepend>
          <v-icon size="small" icon="mdi-home"></v-icon>
          <v-card-title color="primary">
            TABLEAU DE BORD
          </v-card-title><br>
          <v-card-subtitle>
            Un aperçu rapide des données
          </v-card-subtitle>
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
            <!-- <v-card class="mx-4 my-6" style="background: #CEE5FF;" width="300" title="Factures" prepend-icon="mdi-wallet">
              <div class="mx-4 my-6">
                <h1> {{ numberOfFactures }}</h1>
              </div>
            </v-card> -->
            <v-card class="mx-4 my-6" style="background: #CEE5FF;" width="300" title="Utilisateurs"
              prepend-icon="mdi-account-multiple">
              <div class="mx-4 my-6">
                <h1> {{ numberUsers }}</h1>
              </div>
            </v-card>

            <v-card class="mx-4 my-6" style="background: #CEE5FF;" width="300" prepend-icon="mdi-barcode"
              title="Tarification">
              <div class="mx-4 my-6">
                <h1>{{ numberOfRates }}</h1>
              </div>
            </v-card>
            <v-card class="mx-4 my-6" style="background: #CEE5FF;" width="300" prepend-icon="mdi-barcode"
              title="Grille tarifaire">
              <div class="mx-4 my-6">
                <h1>{{ numbergrille }}</h1>
              </div>
            </v-card>
          </div>
        </div>
      </v-row>

    </v-container>

    <div>

    </div>
  </v-container>
</template>

<script>
// import { VDataTable } from "vuetify/labs/VDataTable";
import moment from "moment";


export default {
  // components: {
  //   VDataTable,
  // },
  data: () => ({
    updateDialog: false,
    dialog: false,
    search: "",

    rates: [],
    grilles: [],
    users: [],
    resultats: {},
  }),
  mounted() {
    this.get_rates();
    this.get_tarif();
    this.get_users();

  },
  computed: {
    numberOfRates() {
      // Utilisez la propriété length pour obtenir le nombre de rates dans le tableau
      return this.rates.length;

    },
    numberUsers() {
      // Utilisez la propriété length pour obtenir le nombre de rates dans le tableau
      return this.users.length;
    },
    numbergrille() {
      // Utilisez la propriété length pour obtenir le nombre de tickets dans le tableau
      return this.grilles.length;
    },
    formattedDate() {
      return (date) => moment(date).format("DD/MM/YYYY à HH:mm");
    },
  },
  methods: {
    async get_rates() {
      this.$axios.get("/rate/all").then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          response.data[i].updated_at = this.formattedDate(
            response.data[i].updated_at
          );
          response.data[i].created_at = this.formattedDate(
            response.data[i].created_at
          );
        }
        this.rates = response.data;


        console.log('all rates =', response.data);
      });
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
        this.grilles = response.data;
        console.log('all tarifs =', this.grilles);

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async get_users() {
      try {
        const response = await this.$axios.get("/account/all");
        this.users = response.data;
        console.log('all users =', this.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
  },

};
</script>
