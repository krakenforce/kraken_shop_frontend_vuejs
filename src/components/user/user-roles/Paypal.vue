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
              v-model="totalAmount"
              type="number"
              outlined
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="makePayment" color="red">Top up</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../../../services/api";
export default {
  name: "Paypal",
  data() {
    return {
      totalAmount: "",
    };
  },
  methods: {
    makePayment() {
      if (this.totalAmount == "") {
        alert("Please enter amount to top up");
      } else {
        api
          .post("/paypal/make/payment?sum=" + this.totalAmount)
          .then((response) => {
            const res = response.data;
            console.log(res.status);
            localStorage.setItem("sum", this.totalAmount);
            window.location.href = res.redirect_url
          })
          .catch((error) => {
            Promise.reject(error);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>