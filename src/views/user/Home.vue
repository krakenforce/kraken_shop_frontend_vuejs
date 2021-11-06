<template>
  <v-container id="abc">  
    <header>
      <Menu />
    </header>
    <v-content>
      <router-view></router-view> 
    </v-content>
  </v-container>
</template>

<script>
import Menu from "./components/user/Menu.vue";
export default {
  name: "Home",
  components: {
    Menu
  },
  data() {
    return {
      currentUser: null,
    }
  },
  methods: {

  },
  computed: {

  }

};
</script>

<style lang="scss" scoped>
</style>