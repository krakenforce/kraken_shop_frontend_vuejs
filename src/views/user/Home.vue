<template>
  <v-app id="abc">
    <header>
      <Menu />
    </header>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Menu from "../../components/user/Menu.vue";
export default {
  name: "Home",
  components: {
    Menu,
  },
  data() {
    return {
      currentUser: null,
    };
  },
  methods: {},
  computed: {},
  created() {
    this.currentUser = localStorage.getItem("user");
  },
};
</script>

<style lang="scss" scoped>
</style>