<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="5">
        <v-card elevation="12" color="#3333ff" class="mt-5 black--text">
          <v-card-title primary-title> Top up </v-card-title>
          <v-card-text class="black--text">
            <v-text-field
              name="number"
              label="Amount to top up"
              placeholder="Enter number to top up"
              outlined
              id="id"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="red">Top up</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Paypal",
};
</script>

<style lang="scss" scoped>
</style>