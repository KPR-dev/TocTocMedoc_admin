<template>
  <v-container>
    <v-row>
      <v-breadcrumbs>
        <template v-slot:prepend>
          <v-col>
            <v-card-title color="primary">
              Facturations
            </v-card-title>

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
        <v-col cols="12" md="6">
          <v-card color="blue lighten-2" height="200" width="200">
            <v-card-text>
              Total
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card color="blue lighten-2" height="200" width="200" >
            <v-card-text>
              Ajouter une facturation
            </v-card-text>
            <v-container fill-height fluid>
              <v-row justify="center" align="center">
                <v-icon class="display-2" >mdi-plus</v-icon>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>



        <template >
          <v-toolbar flat>
            <v-toolbar-title>Facturations</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog  max-width="600px">
              <template >
                <v-btn color="primary" dark  >
                  Ajouter une Facturation
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  Formulaire d'ajout
                </v-card-title>
                <v-card-text>
                  <v-form >
                    <v-row>

                    </v-row>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" >Ajouter</v-btn>
                  <v-btn >Annuler</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template >
          <v-icon  class="mr-2">mdi-pencil</v-icon>
          <v-icon color="red">mdi-delete</v-icon>
        </template>

    </v-container>
  </v-container>
</template>

