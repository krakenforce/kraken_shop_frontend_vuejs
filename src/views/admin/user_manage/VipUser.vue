<template>
  <v-container>
    <v-window v-model="step" vertical>
      <v-window-item :value="1">
        <h1 class="gray --text">Manage Vip Users</h1>
        <span
          >Add vip status or update the existing users. You can see their detail
          info</span
        >

        <v-row class="mt-4">
          <v-col cols="12" sm="3">
            <v-text-field label="User Search" />
          </v-col>
          <v-col cols="12" sm="3">
            <v-combobox
              placeholder="Select Vip Class to Search"
              outlined
              dense
              :items="vipClasses"
            ></v-combobox>
          </v-col>

          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-btn color="green" class="white--text" @click="step++">
              USER VIP REQUEST
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
        <h1 class="gray --text">Vip Users Request</h1>

        <v-row class="mt-4">
          <v-col cols="12" sm="3">
            <v-text-field label="User Search" />
          </v-col>
          <!-- <v-col cols="12" sm="3">
            <v-combobox
              placeholder="Select Vip Class to Search"
              outlined
              dense
              :items="vipClasses"
            ></v-combobox>
          </v-col> -->

          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-btn color="blue" class="white--text" @click="step--">
              BACK TO VIP MANAGE
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
    </v-window>
  </v-container>
</template>

<script>
export default {
  name: "VipUser",
  data() {
    return {
      step: 1,
      vipClasses: ["Bronze", "Silver", "Gold", "Platinum"],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>