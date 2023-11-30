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
                <h1> </h1>
              </div>
            </v-card> -->

            <v-card class="mx-4 my-6" style="background: #CEE5FF;" width="200" title="Utilisateurs"
              prepend-icon="mdi-account-multiple">
              <div class="mx-4 my-6">
                <h1> {{ numberUsers }}</h1>
              </div>
            </v-card>

            <v-card class="mx-4 my-6" style="background: #CEE5FF;" width="245" prepend-icon="mdi-list-box"
              title="Tarification">
              <div class="mx-4 my-6">
                <h1>{{ numberOfRates }}</h1>
              </div>
            </v-card>
            <v-card class="mx-4 my-6" style="background: #CEE5FF;" width="245" prepend-icon="mdi-barcode"
              title="Grille tarifaire">
              <div class="mx-4 my-6">
                <h1>{{ numbergrille }}</h1>
              </div>
            </v-card>
            <v-card class="mx-4 my-6" style="background: #CEE5FF;" width="245" title="Total inscrit"
              prepend-icon="mdi-account-multiple-check">
              <div class="mx-4 my-6">
                <h1>{{ numberOfInscription }}</h1>
              </div>
            </v-card>
            <v-card class="mx-4 my-6" style="background: #CEE5FF;" width="245" title="Total Connexion"
              prepend-icon="mdi-account-clock-outline">
              <div class="mx-4 my-6">
                <h1> {{ numberOfconnexion }} </h1>
              </div>
            </v-card>
            <v-card class="mx-4 my-6" style="background: #CEE5FF;" width="245" title="Total vérification"
              prepend-icon="mdi-check-circle">
              <div class="mx-4 my-6">
                <h1> {{ numberOfverification }} </h1>
              </div>
            </v-card>
            <v-card class="mx-4 my-6" style="background: #CEE5FF;" width="285" title="Montant souscription"
              prepend-icon="mdi-credit-card-plus">
              <div class="mx-4 my-6">
                <h1> {{ numberOfsouscription }} FCFA</h1>
              </div>
            </v-card>
            <v-card class="mx-4 my-6" style="background: #CEE5FF;" width="285" title="Montant reservation"
              prepend-icon="mdi mdi-cart-outline">
              <div class="mx-4 my-6">
                <h1> 0 FCFA</h1>
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
    events: [],
    events_entity: [],
    resultats: {},
  }),
  mounted() {
    this.get_rates();
    this.get_tarif();
    this.get_users();
    this.get_events();




  },
  computed: {

    numberOfInscription() {
      // Utilisez la méthode filter pour obtenir un tableau contenant uniquement les événements 'accounts'
      // const accountsEvents = this.events_entity.filter(event => event.action === 'Création d\'un compte');
      // Utilisez la propriété length pour obtenir le nombre d'événements 'accounts'
      // return accountsEvents.length;
      return this.users.length;
    },
    numberOfconnexion() {
      // Utilisez la méthode filter pour obtenir un tableau contenant uniquement les événements 'accounts'
      const loginEvents = this.events_entity.filter(event => event.action === 'Authentification');
      // Utilisez la propriété length pour obtenir le nombre d'événements 'accounts'
      return loginEvents.length;
    },
    numberOfsouscription() {
      // Utilisez la méthode filter pour obtenir un tableau contenant uniquement les événements 'accounts' avec un montant défini
      const souscriptionEvents = this.events_entity.filter(event => event.amount !== undefined && event.amount !== null);

      // Utilisez la méthode reduce pour additionner tous les montants
      const totalAmount = souscriptionEvents.reduce((acc, event) => acc + event.amount, 0);

      return totalAmount;
    },


    numberOfverification() {
      // Utilisez la méthode filter pour obtenir un tableau contenant uniquement les événements 'accounts'
      const verificationEvents = this.events_entity.filter(event => event.action === 'Disponibilité d\'un produit');
      // Utilisez la propriété length pour obtenir le nombre d'événements 'accounts'
      return verificationEvents.length;
    },
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
    async get_events() {
      this.$axios.get("/event/stat").then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          response.data[i].date_time = this.formattedDate(
            response.data[i].date_time
          );
          response.data[i].created_at = this.formattedDate(
            response.data[i].created_at
          );
        }
        this.events_entity = response.data;
        console.log('all events stat =', response.data);
      });
    },
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
        const response = await this.$axios.get("/account/get_by_role_user");
        this.users = response.data;
        console.log('all users =', this.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
  },

};
</script>
