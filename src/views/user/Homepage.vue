<template>
    <v-row justify="center" no-gutters>
      <v-col cols="12" sm="12">
        <div class="ma-5 pa-5">
          <v-container class="text-center" black justify="center" fill-height>
            <v-row>
              <v-col cols="auto">
                <Carousel :homepageBanners="homepageBanners" :itemNumber="itemNumber" />
                <Products :products="products" :itemNumber="itemNumber" :totalItems="totalItems"/>    
              </v-col>      
            </v-row>
            <v-row>
              <v-col cols="12" sm="12">
                <BonusInfoComponent/>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12">
                <Footer />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>
</template>

<script>
import api from "../../services/api"

import Carousel from "../../components/user/Carousel.vue";
import Products from "../../components/user/Products.vue";
import Footer from "../../components/user/Footer.vue";
import BonusInfoComponent from "../../components/user/BonusInfoComponent.vue"
export default {
  name: "Homepage",
  components: {
    Carousel,
    Products,
    Footer,
    BonusInfoComponent,
  },
  data() {
    return {
      homepageBanners: [],
      products: [],
      itemNumber: 8,
      totalItems: '',
    }
  },
  methods: {
    getAllProduct() {
      api
        .get("/product?pageNo=" + 0 + "&pageSize=" + this.itemNumber)
        .then((response) => {
          this.loading = false;
          this.products = response.data.products;
          this.totalItems = response.data.totalItems;
        });
    },

    getAllBanner(){
      api
        .get("/banner?pageNo=" + 0 + "&pageSize=" + 10)
        .then((response) => {
          this.loading = false;
          this.homepageBanners = response.data.homepageBanners;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    }

  },
  mounted() {
    this.getAllProduct();
    this.getAllBanner();
  },
  created() {
    
  }
};
</script>

<style>
</style>