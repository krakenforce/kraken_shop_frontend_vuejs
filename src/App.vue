<template>
  <v-app id="bg">
    <header>
      <Menu />
    </header>
    <v-content>
      <Homepage/> 
    </v-content>
  </v-app>
</template>

<script>
import Menu from "./components/user/Menu.vue";
//import ProductList from './views/user/ProductList.vue';
import Homepage from './views/user/ProductList.vue'

export default {
  name: "App",

  components: {
    Menu,
    Homepage,
    //ProductList,
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
