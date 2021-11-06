<template>
  <v-container>
    <h1>DASHBOARD</h1>
    <span>Show statistic detail of Sales</span>
    <v-spacer></v-spacer>

    <!-- USER SPEND  -->
    <v-row>
      <v-col cols="12" sm="4">
        <v-card elevation="12" class="pa-10">
          <v-subheader > --- Total Renue --- </v-subheader>
          <v-img
            height="100px"
            width="100px"
            src="https://i.ibb.co/J5MnNBg/icon.png"
          ></v-img>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card elevation="12" class="pa-10">
          <v-subheader > --- This Month Revenue --- </v-subheader>
          <v-img
            height="100px"
            width="100px"
            src="https://i.ibb.co/J5MnNBg/icon.png"
          ></v-img>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card elevation="12" class="pa-10">
          <v-subheader > --- Total Order --- </v-subheader>
          <v-img
            height="100px"
            width="100px"
            src="https://i.ibb.co/J5MnNBg/icon.png"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <v-card elevation="12" class="pa-10">
          <v-subheader > --- User Spend Detail --- </v-subheader>
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table>
          <v-btn class="white--text ma-4" color="blue">
            <v-icon> fas fa-print </v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    
  </v-container>
</template>

<script>
export default {
  name: "Dash",
  data: () => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Iron (%)", value: "iron" },
    ],
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: "1%",
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: "1%",
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: "7%",
      },
      {
        name: "Cupcake",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: "8%",
      },
      {
        name: "Gingerbread",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: "16%",
      },
      {
        name: "Jelly bean",
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: "0%",
      },
      {
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: "2%",
      },
      {
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: "45%",
      },
      {
        name: "Donut",
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: "22%",
      },
      {
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: "6%",
      },
    ],
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>