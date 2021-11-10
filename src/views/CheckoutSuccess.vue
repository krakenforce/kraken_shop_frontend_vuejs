<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="10">
      <v-card class="elevation-6 mt-10">
        <v-card-title primary-title>
          <h1 class="green--text">
            Check out successfully, check your key bunker 🤑💰👍
          </h1>
          <h3>🎇🎇 THANK YOU FOR USING OUR SERVICE ✨✨</h3>
          <v-img src="../assets/user/thank-you-gif-5.gif"></v-img>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "CheckoutSuccess",
  methods: {
    redirectToHomePage() {
      window.location.href = "/"
    },
  },
  mounted() {
    setTimeout(() => { 
      this.redirectToHomePage();
    }, 3000);
  },
};
</script>

<style lang="scss" scoped>
</style>