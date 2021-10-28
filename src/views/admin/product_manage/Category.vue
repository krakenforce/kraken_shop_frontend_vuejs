<template>
  <v-container fluid>
    <v-window v-model="step" vertical>
      <v-window-item :value="1">
        <h1 class="gray --text">Manage Category</h1>
        <span
          >Create new product category or update the existing ones. You can see their
          detail info</span
        >

        <v-row class="mt-4">
          <v-col cols="12" sm="3">
            <v-text-field label="Category Search">
            </v-text-field>

          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-btn color="green" class="white--text" @click="step++">
              <v-icon>fas fa-plus</v-icon>
              ADD A NEW CATEGORY
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" sm="12">
            <v-data-table
              :headers="headers"
              :items="desserts"
              :items-per-page="5"
              @click:row="handleClick"
            ></v-data-table>
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item :value="2">
        <h1>ADD NEW CATEGORY</h1>
        <v-btn color="blue" class="white--text" @click="step--"
          >Go back to category manage</v-btn
        >
        <div>
          <v-container>
            <v-card elevation="15" class="pa-10">
              <v-text-field
                label="Category Name:"
                type="text"
                prepend-icon="fas fa-user"
                required
                clearable
              />

              <v-checkbox label="Confirm">Confirm</v-checkbox>

              <v-row>
                <v-spacer></v-spacer>
                <v-col cols="12" sm="3">
                  <v-btn color="green" class="white--text">Create Category</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </div>
      </v-window-item>

      <v-window-item :value="3">
        <h1>{{ testValue.name }}</h1>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-btn color="purple" class="white--text" @click="step -= 2"
              >Go back to category manage</v-btn
            >
          </v-col>
        </v-row>

        <h1>Product List belong to category</h1>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>

export default {
  name: "Category",
  components: {
    
  },
  data() {
    return {
      testValue: "",
      step: 1,
      items: ["ADMIN", "USER"],
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
        { text: "Action", value: "action" },
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
    };
  },
  props: {
    source: String,
  },
  methods: {
    handleClick(value) {
      this.step = 3;
      this.testValue = value;
    },
  },
};
</script>

<style lang="scss" scoped></style>
