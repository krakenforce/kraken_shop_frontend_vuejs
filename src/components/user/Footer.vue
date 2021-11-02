<template>
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
  </v-footer>
</template>

<script>
export default {
  name: "Footer",

  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>
<style scoped>
</style>
