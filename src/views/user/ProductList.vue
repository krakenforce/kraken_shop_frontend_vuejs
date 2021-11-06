<template>
  <v-row justify="center" no-gutters>
    <v-col cols="12" sm="12">
      <div class="ma-5 pa-5">
        <v-container class="text-center" black justify="center" fill-height>
          <v-row>
            <v-col cols="auto">
              <Carousel :homepageBanners="homepageBanners" />
              <ProductListComponent
                :products="products"
                :totalItems="totalItems"
                :totalPages="totalPages"
                @changePage="getAllProduct"
              />
              <Footer />
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Carousel from "../../components/user/Carousel.vue";
import ProductListComponent from "../../components/user/ProductListComponent.vue";
import Footer from "../../components/user/Footer.vue";
import api from "../../services/api";

export default {
  name: "ProductList",
  components: {
    Carousel,
    ProductListComponent,
    Footer,
  },
  data() {
    return {
      page: 1,
      typeName: "",
      type: "",
      products: [],
      totalItems: 0,
      totalPages: 0,
      homepageBanners: [],
    };
  },
  methods: {
    getType() {
      this.typeName = this.$route.params.typeName;
      this.type = this.$route.params.type;
    },

    getAllProduct(value) {
      this.loading = true;
      let pageNumber;
      if(value != null){
        console.log(value);
        pageNumber = value -1;
      }else{
        pageNumber = this.page - 1;
      }
      

      api
        .get("/product?pageNo=" + pageNumber  + "&pageSize=" + 8)
        .then((response) => {
          this.loading = false;
          this.products = response.data.products;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },

    getAllBanner() {
      api.get("/banner?pageNo=" + 0 + "&pageSize=" + 10).then((response) => {
        this.loading = false;
        this.homepageBanners = response.data.homepageBanners;
        this.totalItems = response.data.totalItems;
        this.totalPages = response.data.totalPages;
      });
    },
  },
  mounted() {
    this.getType();
    this.getAllProduct();
    this.getAllBanner();
  },
  created() {
      
  }
};
</script>

<style>
</style>