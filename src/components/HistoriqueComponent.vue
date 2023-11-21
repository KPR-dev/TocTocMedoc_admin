<template>
  <v-container>
    <v-row>
      <v-breadcrumbs>
        <template v-slot:prepend>
          <v-icon size="small" icon="mdi-history"></v-icon>
          <v-card-title color="primary">
            Historiques
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

            <v-card class="mx-4 my-6" width="300" prepend-icon="mdi-history" title="Historiques"
              style="background: #CEE5FF;">
              <div class="mx-4 my-6">
                <h1>{{ numberOfevents }}</h1>
              </div>
            </v-card>
          </div>
        </div>
        <div class="d-flex align-center flex-column">
          <div class="d-flex flex-wrap justify-content-between">
            <v-card class="mx-4 my-6" width="300" prepend-icon="mdi-history" title="Adresse ip"
              style="background: #CEE5FF;">
              <div class="mx-4 my-6">
                <h1>{{ numberOfIp_address }}</h1>
              </div>
            </v-card>
          </div>
        </div>
        <div class="d-flex align-center flex-column">
          <div class="d-flex flex-wrap justify-content-between">
            <v-card class="mx-4 my-6" width="300" prepend-icon="mdi-history" title="Actions"
              style="background: #CEE5FF;">
              <div class="mx-4 my-6">
                <h1>{{ numberOfaction }}</h1>
              </div>
            </v-card>
          </div>
        </div>

      </v-row>

    </v-container>

    <div>
      <v-card class="mx-auto mt-8" max-width="1250">
        <v-btn prepend-icon="mdi-reload" color="blue" @click="get_events"><v-span>Actualiser</v-span></v-btn>
        <v-card-title>
          Toute l'historique
          <v-spacer></v-spacer>
          <v-text-field v-model="search" label="Recherche" single-line hide-details variant="solo-filled"></v-text-field>
        </v-card-title><br><br>
        <v-data-table :headers="headers" :items="events" :search="search">
          <template v-slot:item.>
            <v-container>
              <v-row justify="center">
                <!-- <v-btn prepend-icon="mdi-pencil" @click="updateDialog = true; event = item.columns;"
                  variant="elevated"></v-btn>
                <v-btn prepend-icon="mdi-delete" @click="updateDialog = true; event = item.columns;"></v-btn> -->
              </v-row>
            </v-container>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { VDataTable } from "vuetify/labs/VDataTable";
import moment from "moment";


export default {
  components: {
    VDataTable,
  },
  data: () => ({
    updateDialog: false,
    dialog: false,
    search: "",
    headers: [
      { key: "ip_address", title: "Adresse Ip" },
      { key: "action", title: "Action effectuée" },
      { key: "entity", title: "Entité" },
      { key: "date_time", title: "Date" },
      // { title: "Actions", key: "actions", sortable: false },
    ],
    events: [],
    events_address_ip: [],
    events_actions: []

  }),
  mounted() {
    this.get_events();

  },
  computed: {
    numberOfevents() {
      // Utilisez la propriété length pour obtenir le nombre de events dans le tableau
      return this.events.length;

    },
    numberOfaction() {

      // Utilisez la propriété length pour obtenir le nombre de events dans le tableau
      return this.events_actions.length;

    },

    numberOfIp_address() {
      // Utiliser un Set pour éliminer les doublons
      const uniqueIp_address = new Set(this.events_address_ip);

      // Convertir le Set en tableau
      const uniqueIp_addressArray = Array.from(uniqueIp_address);

      // Retourner la longueur du tableau sans doublons
      return uniqueIp_addressArray.length;

    },


    formattedDate() {
      return (date) => moment(date).format("DD/MM/YYYY à HH:mm");
    },
  },
  methods: {
    async get_events() {
      this.$axios.get("/event/all").then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          response.data[i].date_time = this.formattedDate(
            response.data[i].date_time
          );
          response.data[i].created_at = this.formattedDate(
            response.data[i].created_at
          );
        }
        this.events = response.data;
        this.events_address_ip = response.data.map(event => event.ip_address);
        this.events_actions = response.data.map(event => event.action);
        console.log('all events =', response.data);
        console.log('all addresses =', this.events_address_ip);
        console.log('all actions =', this.events_actions);

      });
    },

  },

};
</script>
