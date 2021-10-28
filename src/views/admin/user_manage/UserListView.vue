<template>
  <v-container fluid>
    <v-window v-model="step">
      <v-window-item :value="1">
        <h1 class="gray --text">Manage Users</h1>
        <span
          >Create new users or update the existing users. You can see their
          detail info</span
        >

        <v-row class="mt-4">
          <v-col cols="12" sm="3">
            <v-text-field label="User Search" />
          </v-col>
          <v-col cols="12" sm="3">
            <v-combobox
              placeholder="Select Role to Search"
              outlined
              dense
              :items="items"
            ></v-combobox>
          </v-col>

          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-btn color="green" class="white--text" @click="step++">
              <v-icon>fas fa-plus</v-icon>
              ADD A NEW USER
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
        <h1>ADD NEW USER</h1>
        <v-btn color="blue" class="white--text" @click="step--"
          >Go back to user manage</v-btn
        >
        <div>
          <v-container>
            <v-card elevation="15" class="pa-10">
              <v-text-field
                placeholder="Username"
                label="Username"
                type="text"
                prepend-icon="fas fa-user"
                required
                clearable
              />

              <v-text-field
                placeholder="Email"
                label="Email"
                type="email"
                prepend-icon="fas fa-user"
                clearable
              />

              <v-text-field
                placeholder="Password"
                label="Password"
                type="text"
                prepend-icon="fas fa-user"
                clearable
              />
              <v-select
                prepend-icon="fas fa-user"
                v-model="e6"
                :items="items"
                :menu-props="{ maxHeight: '400' }"
                label="Select Role for User"
                multiple
                hint="Pick account role"
                persistent-hint
              ></v-select>

              <v-row>
                <v-spacer></v-spacer>
                <v-col cols="12" sm="3">
                  <v-btn color="green" class="white--text">Create User</v-btn>
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
              >Go back to user manage</v-btn
            >
          </v-col>
        </v-row>
        <UserDetail />
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
import UserDetail from "../../../components/admin/UserDetail.vue";

export default {
  name: "UserListView",
  components: {
    UserDetail,
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
