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
            <v-card class="mx-4 my-6" style="background: #CEE5FF;" width="300" title="Factures" prepend-icon="mdi-wallet"
              >
              <div class="mx-4 my-6">
                <h1> {{ numbervehicules }}</h1>
              </div>
            </v-card>
            <v-card class="mx-4 my-6" style="background: #CEE5FF;" width="300" title="Utilisateurs" prepend-icon="mdi-account-multiple"
              >
              <div class="mx-4 my-6">
                <h1> {{ numberchauffeur }}</h1>
              </div>
            </v-card>

            <v-card class="mx-4 my-6"  style="background: #CEE5FF;" width="300" prepend-icon="mdi-barcode" title="Grilles tarifaires"
              >
              <div class="mx-4 my-6">
                <h1>{{ numberOfTickets }}</h1>
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

    tickets: [],
    vehicles: [],
    drivers: [],
    resultats: {},
  }),
  mounted() {
    this.get_tickets();
    this.get_vehicles();
    this.get_users();

  },
  computed: {
    numberOfTickets() {
      // Utilisez la propriété length pour obtenir le nombre de tickets dans le tableau
      return this.tickets.length;

    },
    numberchauffeur() {
      // Utilisez la propriété length pour obtenir le nombre de tickets dans le tableau
      return this.drivers.length;
    },
    numbervehicules() {
      // Utilisez la propriété length pour obtenir le nombre de tickets dans le tableau
      return this.vehicles.length;
    },
    formattedDate() {
      return (date) => moment(date).format("DD/MM/YYYY à HH:mm");
    },
  },
  methods: {
    async get_tickets() {
      this.$axios.get("/ticket/all").then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          response.data[i].updated_at = this.formattedDate(
            response.data[i].updated_at
          );
          response.data[i].created_at = this.formattedDate(
            response.data[i].created_at
          );
        }
        this.tickets = response.data;


        console.log('all tickets =', response.data);
      });
    },
    async get_vehicles() {
      this.$axios.get("/vehicle/all").then((response) => {
        this.vehicles = response.data;

        console.log('all vehicle =', response.data);
      });
    },
    async get_users() {
      try {
        const response = await this.$axios.get("http://31.207.35.25:8000/user/all");
        this.drivers = response.data;
        console.log('all drivers =', this.drivers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
  },

};
</script>
