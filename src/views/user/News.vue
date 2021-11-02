<template>
  <v-container justify="center">
    <v-row justify="center" no-gutters>
      <v-col cols="12" md="10">
        <div class="ma-5 pa-5">
          <v-container class="text-center" black justify="center" fill-height>
            <v-row>
              <v-col cols="auto">
                <Carousel />
                <News />
                <Footer />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Carousel from "../../components/user/Carousel.vue";
import News from "../../components/user/News.vue";
import Footer from "../../components/user/Footer.vue";
export default {
  name: "News",
  components: {
    Carousel,
    News,
    Footer,
  },
};
</script>

<style>
</style>