<template>
  <v-app id="bg">
    <v-container class="body">
        <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>

export default {
  name: "App",

  components: {
    
  },

  data: () => ({}),
};
</script>

<style scoped>
body {
  font-family: "montserrat", sans-serif;
}
#bg {
  background: url("./assets/user/background.jpg");
  position: relative;
  background-size: cover;
  background-color: black;
}
</style>
