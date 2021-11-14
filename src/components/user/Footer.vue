<template>
  <v-parallax src="@/assets/user/wp4983330.jpg">
    <v-footer padless="padless" color="transparent">
      <v-row justify="center">
        <v-col cols="12" sm="3" v-for="item in bonusInfos" :key="item.id">
          <v-hover v-slot="{ hover }">
            <v-card
              :color="hover ? '#4a4343' : 'dark'"
              class="pa-5"
              max-height="150px"
              max-width="150px"
              link
              @click="goToWebsite(item.link)"
            >
              <v-card-title class="justify-center">
                <v-icon size="30">{{ item.icon }}</v-icon>
              </v-card-title>
              <v-card-text class="text-center">
                <strong>{{ item.content }}</strong>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
      <v-card width="100%" color="dark" class="ma-10 text-center">
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} —
          <strong>Kraken Shop - KrakenForce Team &copy;</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-parallax>
</template>

<script>
export default {
  name: "Footer",

  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],

    bonusInfos: [
      {
        id: 1,
        icon: "fab fa-discord",
        title: "",
        content: "DISCORD",
        link: "https://discord.com/"
      },
      {
        id: 2,
        icon: "fab fa-youtube",
        title: "",
        content: "YOUTUBE",
        link: "https://www.youtube.com/",
      },
      {
        id: 3,
        icon: "fab fa-facebook-square",
        title: "",
        content: "FACEBOOK",
        link: "https://www.facebook.com/KrakenShop-112017934612589"
      },
    ],
  }),

  methods: {
    goToWebsite(link){
      window.location.href = link;
    }
  }
};
</script>
<style scoped>
</style>
