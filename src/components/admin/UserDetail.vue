<template>
  <v-container fluid>
    <h1>User Detail</h1>
    <v-row>
      <v-col cols="12" sm="8">
        <v-row>
          <v-col cols="12" sm="12" justify="center" align="center">
            <v-avatar color="blue" outline size="128">
              <v-img v-bind:src="user.avatarImageUrl"></v-img>
            </v-avatar>
            <v-badge color="green" bordered overlap icon="fas fa-plus">
            </v-badge>
            <h1>{{ user.username }}</h1>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="Email" readonly v-model="user.email" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="Phone" readonly v-model="user.phone" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              label="First Name"
              readonly
              v-model="user.firstName"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field label="Last Name" readonly v-model="user.lastName" />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              label="Identity No."
              readonly
              v-model="user.identityNumber"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-radio-group readonly row v-model="user.gender">
              <v-radio
                v-for="gender in genderGroup"
                :key="gender.text"
                :label="gender.text"
                :value="gender.value"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="Address" readonly v-model="user.address" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="Job" readonly v-model="user.job" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-radio-group readonly row v-model="user.marriageStatus">
              <v-radio
                v-for="status in marriageStatusGroup"
                :key="status.text"
                :label="status.text"
                :value="status.value"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col cols="12" sm="4">
        <v-row class="ml-4">
          <v-card elevation="12">
            <v-card-title>Wallet</v-card-title>
            <v-card-subtitle>Balance:</v-card-subtitle>
            <v-card-text class="blue--text">
              <b>{{ user.walletBalance }} &#36;</b>
            </v-card-text>
          </v-card>
        </v-row>

        <v-row class="ma-4">
          <v-card elevation="12">
            <v-card-title>Favorite Product</v-card-title>

            <v-data-table class="elevation-1" 
            :headers="headers"
            :items-per-page="5">
              <template>
                <thead>
                  <tr>
                    <th class="text-left">Product Id</th>
                    <th class="text-left">Product Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in products" :key="item.productId">
                    <td>{{ item.productId }}</td>
                    <td>{{ item.name }}</td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../../services/api";

export default {
  name: "UserDetail",
  props: {
    user: {},
  },
  data() {
    return {
      genderGroup: [
        {text: "Male", value: "MALE"},
        {text: "Female", value: "FEMALE"},
        {text: "Other", value: "OTHER"}
      ],
      marriageStatusGroup:[
        {text: "Married", value: true},
        {text: "Single", value: false},
      ],

      //favorite product
      products: [],
      headers: [
        {text: "Product Id", value: "productId"},
        {text: "Product Name", value: "name"},
      ]
    };
  },
  methods: {
    getFavoriteProduct() {
      let userId = this.user.userId;
      api.get("/favorite/" + userId)
      .then((response) =>{
        this.product = response.data;
        console.log(response.data);
      })
      .catch((error) =>{
        Promise.reject(error);
      })
    },
  },
};
</script>

<style lang="scss" scoped>
</style>