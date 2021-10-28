<template>
  <v-container id="abc">
    <v-main >
      <Header />
      <div>
          <router-view></router-view>
      </div>  
      <Footer />
    </v-main>
  </v-container>
</template>

<script>
import Header from "../../components/admin/Header.vue";
import Footer from "../../components/user/Footer.vue";
export default {
  name: "Home",
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
</style>