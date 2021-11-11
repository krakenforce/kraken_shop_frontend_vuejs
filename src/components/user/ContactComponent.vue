<template>
  <v-card class="overflow-hidden" justify="center" dark>
    <v-container justify="center" class="black lighten-5 mb-6">
      <v-row no-gutters style="height: 100px"> </v-row>
      <v-row no-gutters style="max-height: 200px">
        <v-col cols="12" sm="12">
          <h1 class="yellow--text">CONTACT KRAKEN SHOP</h1>
        </v-col>
      </v-row>
      <v-row no-gutters style="max-height: 200px">
        <v-col>
          <h2 class="yellow--text">
            Direct deposit locations you can go and recharge. (Note: you
            must call 30 minutes in advance)
          </h2>
        </v-col>
      </v-row>
      <v-row no-gutters style="max-height: 200px" justify="center">
        <v-col cols="12" sm="12" md="12">
          <h2>
            Nguyen Dinh Chieu: 214 Nguyen Dinh Chieu, Ward 6, District 3, Ho Chi
            Minh City, Vietnam
          </h2>
        </v-col>
      </v-row>
      <v-row no-gutters style="height: 500px" justify="center">
        <v-col cols="12" sm="10" md="10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4249240576687!2d106.6878353153208!3d10.778731062097268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3a9d97282b%3A0x45e74ca0fc0300dc!2zQXB0ZWNoIENvbXB1dGVyIEVkdWNhdGlvbiAtIEjhu4cgdGjhu5FuZyDEkcOgbyB04bqhbyBM4bqtcCB0csOsbmggdmnDqm4gcXXhu5FjIHThur8gQXB0ZWNo!5e0!3m2!1svi!2s!4v1636089185239!5m2!1svi!2s"
            width="600"
            height="450"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </v-col>
      </v-row>
      <v-row no-gutters style="max-height: 200px" justify="center">
        <v-col cols="12" sm="10">
          <h2>Doi Can: 285 Doi Can, Ba Dinh District, Hanoi</h2>
        </v-col>
      </v-row>
      <v-row no-gutters style="height: 500px" justify="center">
        <v-col cols="12" sm="10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d782.8594314553391!2d105.81903639624291!3d21.035565762948426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab0d127a01e7%3A0xab069cd4eaa76ff2!2zMjg1IMSQ4buZaSBD4bqlbiwgVsSpbmggUGjDuiwgQmEgxJDDrG5oLCBIw6AgTuG7mWkgMTAwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1636089860594!5m2!1svi!2s"
            width="600"
            height="450"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </v-col>
      </v-row>
      <v-row no-gutters style="max-height: 200px">
        <v-col cols="12" sm="12">
          <h1 class="yellow--text">SEND FEEBACK</h1>
        </v-col>
      </v-row>
      <div v-if="this.$store.state.auth.user">
        <v-row>
          <v-col cols="12" sm="3">
            <v-combobox
              placeholder="Select Type to Search"
              outlined
              dense
              :items="items"
              @change="searchByProvider"
            ></v-combobox>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Detail"
              placeholder="Enter Detail"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-btn color="primary"> SEND </v-btn>
          </v-col>
        </v-row>
      </div>
      <div v-else >
        <v-row class="text-center">
          <v-col cols="12" sm="12">
            <h2>Please login to send feedback</h2>
          </v-col>
        </v-row>
        <v-row class="text-center">
          <v-col cols="12" sm="12">
            <router-link to="/login">Login</router-link>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "News",

  data: () => ({
    items: ["Issue", "Request", "Complaint"],
  }),
};
</script>
<style scoped>
</style>
