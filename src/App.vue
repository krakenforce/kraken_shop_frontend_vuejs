<template>
  <v-app id="bg">
    <v-container class="body">
        <router-view></router-view>   
    </v-container>
  </v-app>
</template>

<script>
import EventBus from "./common/EventBus"

export default {
  name: "App",

  components: {
    
  },
  data() {
    return {
      status: true,
    }
  },
  computed:{

  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut;
    });
  },
};
</script>

<style>
#bg{
  background-image: url("./assets/admin/homebackground.jpg");
  background-size: cover;
  position: relative;
}
</style>

