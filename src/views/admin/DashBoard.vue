<template>
  <v-app id="inspire">
    <Header @handleDrawer="drawer = !drawer" />
    <Sidebar :drawer="drawer" />
    <v-main>
      <!-- <v-container class="py-8 px-6" fluid> -->
        <router-view></router-view>
      <!-- </v-container> -->
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Header from '../../components/admin/Header.vue'
import Sidebar from '../../components/admin/Sidebar.vue'
import Footer from '../../components/admin/Footer.vue'

export default {
  components: {
      Header, Sidebar, Footer,
  },
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: true,
  }),
};
</script>