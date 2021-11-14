<template>
  <v-container justify="center">
    <v-row no-gutters justify="left">
      <h2 class="yellow--text">Search Result: {{ this.$route.params.type }}</h2>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="2">
        <v-text-field
          append-icon="search"
          color="red"
          placeholder="Search"
          background-color="rgb(90, 90, 90)"
        ></v-text-field>
        <v-card class="mx-auto mb-8" max-width="300" tile>
          <v-list shaped color="rgb(90, 90, 90)">
            <v-subheader class="yellow--text">CATEGORY</v-subheader>
            <v-list-item-group v-model="selectedItem1" color="red">
              <v-list-item v-for="(item, i) in item1" :key="i" :to="item.link">
                <v-list-item-content>
                  <v-list-item-title
                    v-text="item.text"
                    class="white--text"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>

        <v-card class="mx-auto mb-8" max-width="300" tile>
          <v-list shaped color="rgb(90, 90, 90)">
            <v-subheader class="yellow--text">GENRE</v-subheader>
            <v-list-item-group v-model="selectedItem2" color="blue">
              <v-list-item v-for="(item, i) in item2" :key="i" :to="item.link">
                <v-list-item-content>
                  <v-list-item-title
                    v-text="item.text"
                    class="white--text"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="10">
        <v-card>
          <v-tabs color="red accent-4" left background-color="black">
            <v-tab class="white--text">Lastest</v-tab>
            <v-tab class="white--text">Low To High</v-tab>
            <v-tab class="white--text">High To Low</v-tab>

            <v-tab-item v-for="n in 3" :key="n">
              <v-container fluid black justify="center">
                <v-row>
                  <v-col
                    v-for="item in products"
                    :key="item.productId"
                    cols="auto"
                  >
                    <v-hover v-slot="{ hover }" close-delay="200">
                      <v-card
                        :elevation="hover ? 16 : 5"
                        :class="{ 'on-hover': hover }"
                        class="mx-auto"
                        max-width="1250"
                        color="#343434"
                        link
                        @click="seeProductDetail(item)"
                      >
                        <v-row no-gutters>
                          <v-col cols="12" md="3">
                            <v-img :src="item.thumbnailImageUrl" height="180px">
                              <div class="ma-1 text-left">
                                <v-chip label color="red" small>
                                  <strong>
                                    -{{
                                      calculatePercent(
                                        item.price,
                                        item.salePrice
                                      )
                                    }}
                                    %
                                  </strong>
                                </v-chip>
                              </div>
                            </v-img>
                          </v-col>

                          <v-col cols="12" md="9">
                            <v-card-actions>
                              <v-container>
                                <v-row dense>
                                  <v-col cols="12" md="8">
                                    <v-card-title class="yellow--text">
                                      {{ item.name }}</v-card-title
                                    >
                                    <v-card-subtitle>
                                      <star-rating
                                        :star-size="15"
                                        :read-only="true"
                                        :rating="item.avgStar"
                                      ></star-rating>
                                    </v-card-subtitle>
                                    <v-card-title class="red--text">
                                      <strike
                                        ><strong
                                          >{{ item.price }} &#36;</strong
                                        ></strike
                                      ></v-card-title
                                    >
                                  </v-col>

                                  <v-spacer></v-spacer>
                                  <v-col cols="12" md="4">
                                    <v-card-text class="white--text">
                                      <h2>
                                        <strong
                                          >{{ item.salePrice }} &#36;</strong
                                        >
                                      </h2>
                                    </v-card-text>
                                    <v-btn
                                      icon
                                      color="blue"
                                      @click.stop="addToCart(item)"
                                    >
                                      <v-icon>add_shopping_cart</v-icon>
                                    </v-btn>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card-actions>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-hover>
                  </v-col>
                  <v-pagination
                    v-model="page"
                    :length="totalPages"
                    circle
                    color="red"
                    dark
                    @input="onPageChange"
                  ></v-pagination>
                </v-row>
              </v-container>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StarRating from "vue-star-rating";
export default {
  name: "ProductList",
  props: ["products", "totalItems", "totalPages"],
  components: {
    StarRating,
  },

  data: () => ({
    selectedItem1: 0,
    selectedItem2: 0,
    page: 1,
    item1: [
      { text: "Battle.Net", link: "/search/category/Battle.net" },
      { text: "Game Mobile", link: "/search/category/Mobile" },
      { text: "Game Origin", link: "/search/category/Origin" },
      { text: "Game Steam", link: "/search/category/Steam" },
      { text: "Game Uplay", link: "/search/category/Uplay" },
      { text: "Genshin Impact", link: "/search/category/GenshinImpact" },
      { text: "Others", link: "/search/all/product" },
      { text: "Microsoft - Xbox", link: "/search/category/Microsoft" },
      { text: "Package Steam", link: "/search/category/PackSteam" },
      { text: "PlayStation", link: "/search/category/Playstation" },
      { text: "Wallet Code", link: "/search/category/WalletCode" },
    ],
    item2: [
      { text: "Action", link: "/search/genre/Action" },
      { text: "Adventure", link: "/search/genre/Adventure" },
      { text: "Casual", link: "/search/genre/Casual" },
      { text: "Early Access", link: "/search/genre/EarlyAccess" },
      { text: "Indie", link: "/search/genre/Indie" },
      { text: "Massively Multiplayer", link: "/search/genre/Mmo" },
      { text: "Racing", link: "/search/genre/Racing" },
      { text: "RPG", link: "/search/genre/RPG" },
      { text: "Sexual Content", link: "/search/genre/Sexual" },
      { text: "Simulation", link: "/search/genre/Simulation" },
      { text: "Sports", link: "/search/genre/Sports" },
      { text: "Strategy", link: "/search/genre/Strategy" },
      { text: "Utilities", link: "/search/genre/Utilities" },
      { text: "Violent", link: "/search/genre/Violent" },
    ],
  }),
  methods: {
    calculatePercent(price, salePrice) {
      let test = (100 * salePrice) / price;
      let result = 100 - test;
      return Math.round(result);
    },

    onPageChange() {
      this.$emit("changePage", this.page);
    },

    seeProductDetail(item) {
      this.$router.push({
        name: "ProductDetail",
        params: {
          productId: item.productId,
        },
      });
    },

    addToCart(item) {
      this.$store.commit("addToCart", item);
    },
  },
};
</script>
<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: white
>.v-card__text
  color: white
</style>
