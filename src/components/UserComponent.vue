<template>
  <v-container>
    <v-row>
      <v-breadcrumbs>
        <template v-slot:prepend>
          <v-col>
            <v-card-title color="primary">
              Utilisateurs
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
          <v-card color="orange lighten-2" height="200" @click="openUserModal">
            <v-card-text>
              Ajouter un utilisateur
            </v-card-text>
            <v-container fill-height fluid>
              <v-row justify="center" align="center">
                <v-icon class="display-2" @click.stop="openUserModal">mdi-account-plus</v-icon>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>


      <v-data-table
        :headers="headers"
        :items="users"
        item-key="id"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Utilisateurs</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="userModal" max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark @click="openUserModal" v-on="on">
                  Ajouter un utilisateur
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  Formulaire d'ajout d'utilisateur
                </v-card-title>
                <v-card-text>
                  <v-form @submit.prevent="addUser">
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="newUser.name" label="Nom"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="newUser.surname" label="Prénoms"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="newUser.email" label="Mail"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="newUser.phone" label="Téléphone"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="addUser">Ajouter</v-btn>
                  <v-btn @click="closeUserModal">Annuler</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template >
          <v-icon @click="editUser(item)" class="mr-2">mdi-pencil</v-icon>
          <v-icon @click="deleteUser(item)" color="red">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      userModal: false,
      headers: [
        { text: 'Nom', value: 'name' },
        { text: 'Prénoms', value: 'surname' },
        { text: 'Mail', value: 'email' },
        { text: 'Téléphone', value: 'phone' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      users: [
        { id: 1, name: 'John', surname: 'Doe', email: 'john@example.com', phone: '123-456-7890' },
        { id: 2, name: 'Jane', surname: 'Doe', email: 'jane@example.com', phone: '987-654-3210' },
        { id: 3, name: 'Alice', surname: 'Johnson', email: 'alice@example.com', phone: '555-555-5555' },
        { id: 4, name: 'Bob', surname: 'Smith', email: 'bob@example.com', phone: '111-222-3333' },
        { id: 5, name: 'Eva', surname: 'Green', email: 'eva@example.com', phone: '999-888-7777' },
      ],
      newUser: {
        name: '',
        surname: '',
        email: '',
        phone: '',
      },
    };
  },
  methods: {
    openUserModal() {
      this.userModal = true;
    },
    closeUserModal() {
      this.userModal = false;
    },
    addUser() {
      this.users.push({
        id: this.users.length + 1,
        name: this.newUser.name,
        surname: this.newUser.surname,
        email: this.newUser.email,
        phone: this.newUser.phone,
      });
      this.newUser = {
        name: '',
        surname: '',
        email: '',
        phone: '',
      };
      this.closeUserModal();
    },

    deleteUser(user) {
      const index = this.users.indexOf(user);
      if (index !== -1) {
        this.users.splice(index, 1);
      }
    },
  },
};
</script>
