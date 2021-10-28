<template>
  <v-container>
    <v-window v-model="step" vertical>
      <v-window-item :value="1">
        <h1 class="gray --text">Manage Banner</h1>
        <span>Add or update banner for homepage</span>

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
              Add banner
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
        <h1 class="gray --text">Add Banner</h1>

        <v-row class="mt-4">
          <v-col cols="12" sm="3">
            <v-btn color="blue" class="white--text" @click="step--">
              BACK TO banner MANAGE
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" sm="12">
            <v-file-input @change="Preview_image" v-model="image" label="Image">
            </v-file-input>
            <v-img :src="url"></v-img>

            <v-text-field label="Url Query"></v-text-field>

            <v-combobox
              placeholder="Select Banner Type"
              outlined
              dense
              :items="vipClasses"
            ></v-combobox>

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
  name: "Banner",
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