<template>
    <v-row justify="center" no-gutters>
      <v-col cols="12" sm="12">
        <div class="ma-5 pa-5">
          <v-container class="text-center" black justify="center" fill-height>
            <v-row>
              <v-col cols="12" md="12">
                <ProuductDetailComponent :product="product" />
                <Footer />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>
</template>

<script>
import ProuductDetailComponent from "../../components/user/ProductDetailComponent.vue";
import Footer from "../../components/user/Footer.vue";
import api from "../../services/api"

export default {
  name: "ProductDetail",
  components: {
    ProuductDetailComponent,
    Footer,
  },
  data() {
    return {
      product: null,
      productId: '',
    }
  },
  methods: {
    getProductById(){
      api.get("/product/" + this.productId)
      .then((response) => {
        this.product = response.data;
      })
      .catch((error) => {
        Promise.reject(error);
      })
    }
  },
  mounted() {
    this.getProductById();
  },
  created() {
    this.productId = this.$route.params.productId;
     console.log(this.productId);
  }

};
</script>

<style>
</style>