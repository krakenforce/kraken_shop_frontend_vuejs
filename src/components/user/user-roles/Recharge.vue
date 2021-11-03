<template>
  <v-container fluid black justify="center">
    <v-row>
      <v-col cols="12" md="12">
        <v-card>
          <v-tabs color="blue accent-4" centered background-color="black">
            <v-tab class="white--text">Paypal</v-tab>
            <v-tab class="white--text">Bank transfer</v-tab>


          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Recharge",
  components: {},
  data() {
    return {
    };
  },
};
</script>

<style>
</style>