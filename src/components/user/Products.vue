<template>
  <v-main>
    <v-card>
      <v-tabs color="blue accent-4" background-color="black" v-model="tab">
        <v-tab
          v-for="(item, index) in tabHeaders"
          :class="{ active: currentTab === index }"
          @click="changeTab(index)"
          :key="item"
        >
          {{ item }}
        </v-tab>

        <v-tab-item v-model="tab">
          <!-- ALL PRODUCT -->
          <div v-show="currentTab === 0">
            <v-container fluid black>
              <v-row>
                <v-col
                  v-for="item in products"
                  :key="item.productId"
                  cols="12"
                  sm="3"
                >
                  <v-hover v-slot="{ hover }" close-delay="200">
                    <v-card
                      height="100%"
                      :elevation="hover ? 16 : 5"
                      :class="{ 'on-hover': hover }"
                      class="mx-auto"
                      max-width="344"
                      color=" #343434"
                      link
                      @click="seeProductDetail(item)"
                    >
                      <v-img
                        :src="item.thumbnailImageUrl"
                        height="180px"
                        width="320px"
                      ></v-img>

                      <v-card-title class="white--text">
                        {{ item.name }}</v-card-title
                      >

                      <v-divider class="mx-4"></v-divider>
                      <v-card-text>
                        <star-rating
                          :star-size="10"
                          :read-only="true"
                          :rating="item.avgStar"
                        ></star-rating>
                      </v-card-text>

                      <v-card-actions>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="5">
                              <strike>
                                {{ item.price }} <strong>&#36;</strong>
                              </strike>
                            </v-col>
                          </v-row>
                          <v-row dense>
                            <v-col cols="12" sm="6">
                              <div v-if="user">
                                <v-btn
                                  icon
                                  class="white--text"
                                  color="blue"
                                  @click.stop="addToCart(item)"
                                >
                                  <v-icon>add_shopping_cart</v-icon>
                                </v-btn>
                                <v-btn
                                  icon
                                  class="white--text"
                                  color="pink"
                                  @click.stop="addToFavorite"
                                >
                                  <v-icon> mdi-heart </v-icon>
                                </v-btn>
                              </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-card-text class="yellow--text"
                                >{{ item.salePrice }} <strong>&#36;</strong>
                              </v-card-text>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-actions>
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
            </v-container>
            <v-btn class="ma-2" @click="moreProduct(0)" outlined color="blue">
              More
            </v-btn>
          </div>
          <!-- HIGHLIGHT -->
          <div v-show="currentTab === 1">
            <v-container fluid black>
              <v-row>
                <v-col
                  v-for="item in products"
                  :key="item.productId"
                  cols="12"
                  sm="3"
                >
                  <v-hover v-slot="{ hover }" close-delay="200">
                    <v-card
                      height="100%"
                      :elevation="hover ? 16 : 5"
                      :class="{ 'on-hover': hover }"
                      class="mx-auto"
                      max-width="344"
                      color=" #343434"
                      link
                      @click="seeProductDetail(item)"
                    >
                      <v-img
                        :src="item.thumbnailImageUrl"
                        height="180px"
                        width="320px"
                      ></v-img>

                      <v-card-title class="white--text">
                        {{ item.name }}</v-card-title
                      >

                      <v-divider class="mx-4"></v-divider>
                      <v-card-text>
                        <star-rating
                          :star-size="10"
                          :read-only="true"
                          :rating="item.avgStar"
                        ></star-rating>
                      </v-card-text>

                      <v-card-actions>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="5">
                              <strike>
                                {{ item.price }} <strong>&#36;</strong>
                              </strike>
                            </v-col>
                          </v-row>
                          <v-row dense>
                            <v-col cols="12" sm="6">
                              <div v-if="user">
                                <v-btn
                                  icon
                                  class="white--text"
                                  color="blue"
                                  @click.stop="addToCart(item)"
                                >
                                  <v-icon>add_shopping_cart</v-icon>
                                </v-btn>
                                <v-btn
                                  icon
                                  class="white--text"
                                  color="pink"
                                  @click.stop="addToFavorite"
                                >
                                  <v-icon> mdi-heart </v-icon>
                                </v-btn>
                              </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-card-text class="yellow--text">
                                <h1>{{ item.salePrice }} <strong>&#36;</strong></h1>
                              </v-card-text>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-actions>
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
            </v-container>
            <v-btn class="ma-2" @click="moreProduct(1)" outlined color="blue">
              More
            </v-btn>
          </div>
          <!-- NEW -->
          <div v-show="currentTab === 2">
            <v-container fluid black>
              <v-row>
                <v-col
                  v-for="item in products"
                  :key="item.productId"
                  cols="12"
                  sm="3"
                >
                  <v-hover v-slot="{ hover }" close-delay="200">
                    <v-card
                      height="100%"
                      :elevation="hover ? 16 : 5"
                      :class="{ 'on-hover': hover }"
                      class="mx-auto"
                      max-width="344"
                      color=" #343434"
                      link
                      @click="seeProductDetail(item)"
                    >
                      <v-img
                        :src="item.thumbnailImageUrl"
                        height="180px"
                        width="320px"
                      ></v-img>

                      <v-card-title class="white--text">
                        {{ item.name }}</v-card-title
                      >

                      <v-divider class="mx-4"></v-divider>
                      <v-card-text>
                        <star-rating
                          :star-size="10"
                          :read-only="true"
                          :rating="item.avgStar"
                        ></star-rating>
                      </v-card-text>

                      <v-card-actions>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="5">
                              <strike>
                                {{ item.price }} <strong>&#36;</strong>
                              </strike>
                            </v-col>
                          </v-row>
                          <v-row dense>
                            <v-col cols="12" sm="6">
                              <v-card-text class="yellow--text">
                                <h1>
                                  {{ item.salePrice }}<strong>&#36;</strong>
                                </h1>
                              </v-card-text>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <div v-if="user">
                                <v-btn
                                  icon
                                  class="white--text"
                                  color="blue"
                                  @click.stop="addToCart(item)"
                                >
                                  <v-icon>add_shopping_cart</v-icon>
                                </v-btn>
                                <v-btn
                                  icon
                                  class="white--text"
                                  color="pink"
                                  @click.stop="addToFavorite"
                                >
                                  <v-icon> mdi-heart </v-icon>
                                </v-btn>
                              </div>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-actions>
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
            </v-container>
            <v-btn class="ma-2" @click="moreProduct(2)" outlined color="blue">
              More
            </v-btn>
          </div>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-main>
</template>

<script>
import StarRating from "vue-star-rating";
import api from "../../services/api";
export default {
  name: "Product",
  props: ["products", "itemNumber", "totalItem", "product"],
  components: {
    StarRating,
  },

  data() {
    return {
      user: null,
      tabHeaders: ["ALL", "HIGHLIGHT", "NEW"],
      tab: null,
      currentTab: 0,
    };
  },
  methods: {
    changeTab(index) {
      if (index == 0) {
        this.currentTab = 0;
        this.getAllProduct();
      } else if (index == 1) {
        this.currentTab = 1;
        this.getProductByTag("HighLight");
      } else if (index == 2) {
        this.currentTab = 2;
        this.getProductByTag("New");
      }
    },

    getUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },

    moreProduct(index) {
      if (index == 0) {
        window.location.href = "search/all/product";
      } else if (index == 1) {
        window.location.href = "search/genre/HighLight";
      } else if (index == 2) {
        window.location.href = "search/genre/New";
      }
    },

    getAllProduct() {
      api.get("/product?pageNo=" + 0 + "&pageSize=" + 8).then((response) => {
        this.loading = false;
        this.products = response.data.products;
        this.totalItems = response.data.totalItems;
        this.totalPages = response.data.totalPages;
      });
    },

    getProductByTag(name) {
      api
        .get(
          "/product/tag/search?tagName=" +
            name +
            "&pageNo=" +
            0 +
            "&pageSize=" +
            8
        )
        .then((response) => {
          this.loading = false;
          this.products = response.data.products;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },

    addToCart(item) {
      this.$store.commit("addToCart", item);
    },

    addToFavorite() {
      alert("add product to favorite");
    },

    seeProductDetail(item) {
      this.$router.push({
        name: "ProductDetail",
        params: {
          productId: item.productId,
        },
      });
    },
  },
  mounted() {
    this.getUser();
  },
  created() {},
};
</script>
<style lang="sass" scoped>
.v-card
  transition: transform .2s,
.v-card.on-hover.theme--dark
  background-color: #282C35,
  transition: transform .2s,
  transform: scale(1.1),
  >.v-card__text
    color: white
</style>
