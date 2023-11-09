<template>
  <v-container>
    <v-row>
      <v-breadcrumbs>
        <template v-slot:prepend>
          
          <v-col>
            <v-card-title color="primary">
              Tableau de bord
            </v-card-title>
            <v-card-subtitle>
              Un aperçu rapide des données
            </v-card-subtitle>
          </v-col>
        </template>
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-left"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-row>
    <v-divider></v-divider>
    <v-container class="mt-8">
      <v-row>
        <v-col cols="12" md="3">
          <v-card color="red lighten-2" height="200">
            <v-card-text>
              Nombre de transactions
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card color="blue lighten-2" height="200">
            <v-card-text>
              Nombre de transactions
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card color="green lighten-2" height="200">
            <v-card-text>
              Nombre de transactions
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card color="orange lighten-2" height="200">
            <v-card-text>
              Nombre de transactions
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
