<template>
  <v-app id="abc">  
    <header>
      <Menu />
    </header>
    <v-main>
      <router-view></router-view> 
    </v-main>
  </v-app>
</template>

<script>
import Menu from "../../components/user/Menu.vue";
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