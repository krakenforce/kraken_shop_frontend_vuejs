<template>
  <v-main>
    <v-card>
      <v-tabs color="blue accent-4" background-color="black">
        <v-tab class="white--text">Tất Cả</v-tab>
        <v-tab class="white--text">Nổi Bật</v-tab>
        <v-tab class="white--text">Mới Ra Mắt</v-tab>

        <v-btn class="ma-2" outlined color="blue"> More </v-btn>

        <v-tab-item v-for="n in 4" :key="n">
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
                        star-size="10"
                        read-only="true"
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
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-main>
</template>

<script>
import StarRating from "vue-star-rating";
export default {
  name: "Product",
  props: ["products", "itemNumber", "totalItem", "product"],
  components: {
    StarRating,
  },

  data() {
    return {
      user: null,
    };
  },
  methods: {
    getUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
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
