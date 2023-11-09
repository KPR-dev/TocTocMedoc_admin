<template>
  <v-container>
    <v-row>
      <v-breadcrumbs>
        <template v-slot:prepend>
          <v-icon size="small" icon="mdi-home"></v-icon>
          <v-card-title color="primary">
            Bienvenue chez TocTocMedoc
          </v-card-title>
        </template>
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-left"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-row>
    <v-divider></v-divider>
    <v-container class="mt-8">
      <!-- Utilisation du composant v-row pour aligner les cartes sur la même ligne -->
      <v-row>
        <!-- Première carte -->
        <v-col cols="12" md="3">
          <v-card>
            <!-- Contenu de la première carte -->
            <!-- ... -->
          </v-card>
        </v-col>

        <!-- Deuxième carte -->
        <v-col cols="12" md="3">
          <v-card>
            <!-- Contenu de la deuxième carte -->
            <!-- ... -->
          </v-card>
        </v-col>

        <!-- Troisième carte -->
        <v-col cols="12" md="3">
          <v-card>
            <!-- Contenu de la troisième carte -->
            <!-- ... -->
          </v-card>
        </v-col>

        <!-- Quatrième carte -->
        <v-col cols="12" md="3">
          <v-card>
            <!-- Contenu de la quatrième carte -->
            <!-- ... -->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
