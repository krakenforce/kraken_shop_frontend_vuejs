<template>
  <v-container justify="center">
    <v-row justify="center" no-gutters>
      <v-col cols="12" md="11" sm="11" xs="12">
        <div class="ma-5 pa-5">
          <v-container class="text-center" black justify="center" fill-height>
            <v-row>
              <v-col cols="auto">
                <Carousel />
                <Products />
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
import Products from "../../components/user/Products.vue";
import Footer from "../../components/user/Footer.vue";
export default {
  name: "Homepage",
  components: {
    Carousel,
    Products,
    Footer,
  },
};
</script>

<style>
</style>