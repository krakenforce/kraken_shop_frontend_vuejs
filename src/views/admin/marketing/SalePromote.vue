<template>
  <v-container>
    <v-window v-model="step" vertical>
      <v-window-item :value="1">
        <h1 class="gray --text">Manage Sale Promote</h1>
        <span>Add or update Sale promote  for homepage</span>

        <v-row class="mt-4">
          <v-col cols="12" sm="3">
            <v-text-field label="Banner Search" />
          </v-col>
          <v-col cols="12" sm="3">
            <v-combobox
              placeholder="Select Type to Search"
              outlined
              dense
              :items="vipClasses"
            ></v-combobox>
          </v-col>

          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-btn color="green" class="white--text" @click="step++">
              Add sale promote
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
        <h1 class="gray --text">Add New Sale Promote</h1>

        <v-row class="mt-4">
          <v-col cols="12" sm="3">
            <v-btn color="blue" class="white--text" @click="step--">
              BACK TO sale promote MANAGE
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" sm="12">
            <v-text-field label="Title"></v-text-field>

            <v-text-field label="Content Url"></v-text-field>

            <v-checkbox label="Status"></v-checkbox>

            <v-btn color="green" class="white--text">Add Banner</v-btn>

          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
export default {
  name: "SalePromote",
  data() {
    return {
      step: 1,
      vipClasses: ["Bronze", "Silver", "Gold", "Platinum"],
      image: null,
    };
  },
  methods: {
    Preview_image() {
      this.url = URL.createObjectURL(this.image);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>