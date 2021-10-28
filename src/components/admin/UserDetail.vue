<template>
  <v-container fluid>
    <h1>User Detail</h1>
    <v-row>
      <v-col cols="12" sm="8">
        <v-row>

          <v-col cols="12" sm="12" justify="center" align="center">
            <v-avatar color="blue" outline size="128">
              <v-img src="https://i.ibb.co/J5MnNBg/icon.png"></v-img>
            </v-avatar>
            <v-badge color="green" bordered overlap icon="fas fa-plus">
            </v-badge>
            <h1>Username</h1>
          </v-col>
        </v-row>
     
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="Email" readonly />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="Phone" readonly />
          </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field label="First Name" readonly />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field label="Last Name" readonly />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field label="Identity No." readonly />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-radio-group row v-model="radioGroup">
              <v-radio
                v-for="n in 3"
                :key="n"
                :label="`Sex${n}`"
                :value="n"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="Address" readonly />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="Job" readonly />
          </v-col>
          <v-col cols="12" sm="6">
            <v-radio-group row v-model="radioGroup">
              <v-radio
                v-for="n in 2"
                :key="n"
                :label="`Marriage ${n}`"
                :value="n"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>

        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-btn color="green" class="white--text">UPDATE</v-btn>
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
              <b>12.00$</b>
            </v-card-text>
          </v-card>
        </v-row>

        <v-row class="ma-4">
          <v-card elevation="12">
            <v-card-title>Favorite Product</v-card-title>

            <v-data-table class="elevation-1" :items-per-page="5">
              <template>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Calories</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in desserts" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.calories }}</td>
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
export default {
  name: "UserDetail",
  data() {
    return {
      radioGroup: 1,
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          name: "Eclair",
          calories: 262,
        },
        {
          name: "Cupcake",
          calories: 305,
        },
        {
          name: "Gingerbread",
          calories: 356,
        },
        {
          name: "Jelly bean",
          calories: 375,
        },
        {
          name: "Lollipop",
          calories: 392,
        },
        {
          name: "Honeycomb",
          calories: 408,
        },
        {
          name: "Donut",
          calories: 452,
        },
        {
          name: "KitKat",
          calories: 518,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>

</style>