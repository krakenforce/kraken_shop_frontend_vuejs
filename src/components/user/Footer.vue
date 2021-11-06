<template>
<<<<<<< HEAD
  <v-footer v-bind="localAttrs" padless="padless">
    <v-card flat tile width="100%" class="black lighten-1 text-center">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
          <v-icon color="red" size="30px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-divider color="white"></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Draken Shop</strong>
      </v-card-text>
    </v-card>
=======
  <v-footer
    color="primary lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-row>
>>>>>>> dev
  </v-footer>
</template>

<script>
<<<<<<< HEAD
export default {
  name: "Footer",

  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>
<style scoped>
</style>
=======
  export default {
      name: 'Footer',
    data: () => ({
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],
    }),
  }
</script>
>>>>>>> dev
