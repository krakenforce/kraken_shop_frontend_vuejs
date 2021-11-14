<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="10">
      <v-card class="elevation-6 mt-10">
        <v-card-title primary-title>
          <h1 class="green--text">
            Top up successfully, check your wallet 🤑💰👍
          </h1>
          <h3>🎇🎇 You have successfully deposited {{sum}} $ ✨✨ </h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import api from "../services/api";

export default {
  name: "PaymentRedirect",
  data() {
    return {
      user: "",
      sum: "",
    };
  },
  methods: {
    getUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },

    getAmount() {
      this.sum = localStorage.getItem("sum");
    },

    redirectToHomePage() {
      this.$router.push("/");
    },

    completePayment() {
      let paymentId = this.$route.query.paymentId;
      let payerId = this.$route.query.PayerID;
      let walletId = this.user.walletId;
      api
        .post(
          "/paypal/complete/payment?paymentId=" +
            paymentId +
            "&payerId=" +
            payerId +
            "&walletId=" +
            walletId +
            "&sum=" +
            this.sum
        )
        .then((response) => {
          var a = JSON.parse(localStorage.getItem("user"));
          a['walletBalance'] = parseFloat(a.walletBalance) + parseFloat(this.sum);
          var user = JSON.stringify(a);
          localStorage.setItem("user", user);

          localStorage.removeItem("sum");
          return response.data;
        })
        .catch((error) => {
          return error.response.data;
        });
    },
  },
  mounted() {
    this.getUser();
    this.getAmount();
    this.completePayment();
    setTimeout(() => {
      this.redirectToHomePage();
    }, 3000);
  },
  created() {
    this.getUser();
  },
};
</script>

<style lang="scss" scoped>
</style>