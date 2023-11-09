<template>
  <v-container max-width="1200" max-height="100%">
    <v-row>
      <v-breadcrumbs>
        <template v-slot:prepend>
          <v-col>
            <v-card-title color="primary">
              Grille tarifaires
            </v-card-title>
          </v-col>
        </template>
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-left"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" md="6">
        <v-sheet class="rounded-card" color="blue lighten-2" height="200" width="200">
          <v-card-text>
            Total
          </v-card-text>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="6">
        <v-sheet class="rounded-card" color="blue lighten-2" height="200" width="200">
          <v-card-text>
            Ajouter un tarif
          </v-card-text>
          <v-container fill-height fluid>
            <v-row justify="center" align="center">
              <v-icon class="display-2">mdi-plus</v-icon>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-sheet class="rounded-card" color="grey" height="200" width="250">
          <v-col class="d-flex flex-column align-center justify-center">
            <v-card-title>
              5000F/mois
            </v-card-title>
            <v-card-subtitle>
              Un avantage
            </v-card-subtitle>
            <v-card-subtitle>
              Un avantage
            </v-card-subtitle>
            <br>
            <br>
            <v-btn class="text-center" color="primary" >Valider</v-btn>
          </v-col>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="6">
        <v-sheet class="rounded-card" color="grey" height="200" width="250">
          <v-col class="d-flex flex-column align-center justify-center">
            <v-card-title>
              10000F/mois
            </v-card-title>
            <v-card-subtitle>
              Un avantage
            </v-card-subtitle>
            <v-card-subtitle>
              Un avantage
            </v-card-subtitle>
            <br>
            <br>
            <v-btn class="text-center" color="primary" >Valider</v-btn>
          </v-col>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.rounded-card {
  border-radius: 30px; /* Adjust the value based on your preference */
}
</style>
