<template>
  <v-card class="overflow-hidden" justify="center" dark>
    <v-container justify="left">
      <v-row class="mb-1">
        <v-col cols="12" sm="6">
          <div>
            <v-img
              :src="product.thumbnailImageUrl"
              max-height="500"
              class="grey darken-4"
              absolute
            >
            </v-img>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <v-row class="mt-2">
            <v-col cols="12" sm="4">
              <h3>Product Code:</h3>
              <span>{{ product.productCode }}</span>
            </v-col>
            <v-col cols="12" sm="4">
              <h3>Status:</h3>
              <span>còn hàng ✔️ </span>
            </v-col>
            <v-col cols="12" sm="4">
              <a :href="product.originalProductLink" class="h3"
                >Original link</a
              >
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="12">
              <v-card color="#343434" class="mx-auto" outlined>
                <v-card-title>
                  <h3>{{ product.name }}</h3>
                </v-card-title>
                <v-card-text>
                  <!-- RATING -->
                    <star-rating star-size="20" read-only="true" :rating="product.avgStar"></star-rating>
                  
                  
                </v-card-text>
                <v-card-actions>
                  <v-container grid-list-xs>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <div class="text-overline mb-4">
                          <h4>
                            <strike class="red--text"
                              ><strong>{{ product.price }} &#36; </strong>
                            </strike>
                          </h4>
                          <span class="yellow-text">
                            <strong>{{ product.salePrice }} &#36; </strong>
                          </span>
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-btn
                          @click="addToCart(product)"
                          outlined
                          color="red"
                          class="white--text"
                          rounded
                        >
                          ADD TO CART
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row>
                      <div v-for="item in product.tagChilds" :key="item.tagId">
                        <v-chip>
                          {{ item.name }}
                        </v-chip>
                      </div>
                    </v-row>
                  </v-container>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-spacer></v-spacer>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12" sm="10">
          <v-card>
            <v-tabs
              color="red accent-4"
              left
              background-color="black"
              fixed-tabs
              v-model="tab"
            >
              <v-tabs-slider color="amber darken-3"></v-tabs-slider>
              <v-tab
                v-for="(item, index) in items"
                :class="{ active: currentTab === index }"
                @click="currentTab = index"
                :key="item"
              >
                {{ item }}
              </v-tab>

              <v-tabs-items v-model="tab">
                <v-card flat>
                  <div v-show="currentTab === 0">
                    <v-card-text>{{ product.productDetail }}</v-card-text>
                  </div>
                  <div v-show="currentTab === 1">
                    <v-card-text>{{ product.productWarranty }}</v-card-text>
                  </div>
                  <div v-show="currentTab === 2">
                    <v-card> </v-card>
                  </div>
                  <div v-show="currentTab === 3">
                    <v-card elevation="12" color="black">
                      <div v-if="!user">
                        <h2>Please login to review</h2>
                        <a href="/login" class="btn btn-block btn-primary"
                          >Login</a
                        >
                      </div>
                      <div v-if="user">
                        <v-card-title> Enter info to review </v-card-title>
                        <v-form>
                          <v-container grid-list-xs>
                            <star-rating
                              star-size="20"
                              animate="true"
                              @rating-selected="getRating"
                            ></star-rating>
                            <v-text-field
                              name="name"
                              label="Content"
                              id="content"
                              v-model="commentContent"
                            ></v-text-field>
                            <v-btn color="primary" @click="sendReview">
                              Send Review
                            </v-btn>
                          </v-container>
                        </v-form>
                      </div>
                    </v-card>
                  </div>
                </v-card>
              </v-tabs-items>
            </v-tabs>
          </v-card>
        </v-col>

        <v-col cols="12" sm="2">
          <v-card class="mx-auto mb-8" max-width="300" tile>
            <v-list shaped color="rgb(90, 90, 90)">
              <v-subheader class="yellow--text">DANH MỤC</v-subheader>
              <v-list-item-group v-model="selectedItem1" color="red">
                <v-list-item v-for="(item, i) in item1" :key="i">
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
              <v-subheader class="yellow--text">THỂ LOẠI</v-subheader>
              <v-list-item-group v-model="selectedItem2" color="blue">
                <v-list-item v-for="(item, i) in item2" :key="i">
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
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import StarRating from "vue-star-rating";
import api from "../../services/api";

export default {
  name: "ProductDetail",
  props: ["product"],
  components: {
    StarRating,
  },
  data: () => ({
    user: null,
    rating: 0,
    productRating: 0,
    commentContent: "",
    selectedItem1: 0,
    selectedItem2: 0,
    currentTab: 0,
    tab: null,
    items: ["INTRODUCTION", "WARRANTY", "COMMENT", "REVIEW"],
    item1: [
      { text: "Battle.Net" },
      { text: "Game Mobile" },
      { text: "Game Origin" },
      { text: "Game Steam" },
      { text: "Game Uplay" },
      { text: "Genshin Impact" },
      { text: "Khác" },
      { text: "Microsoft - Xbox" },
      { text: "Package Steam" },
      { text: "PlayStation" },
      { text: "Wallet Code" },
    ],
    item2: [
      { text: "Action" },
      { text: "Adventure" },
      { text: "Casual" },
      { text: "Early Access" },
      { text: "Indie" },
      { text: "Massively Multiplayer" },
      { text: "Racing" },
      { text: "RPG" },
      { text: "Sexual Content" },
      { text: "Simulation" },
      { text: "Sports" },
      { text: "Strategy" },
      { text: "Utilities" },
      { text: "Violent" },
    ],
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
  methods: {
    getRating(rating) {
      this.rating = rating;
    },

    addToCart(item) {
      this.$store.commit("addToCart", item);
    },

    sendReview() {
      let productId = this.product.productId;
      let userId = this.user.id;
      let review = { starRating: this.rating, content: this.commentContent };
      api
        .post(
          "/product/review?userId=" + userId + "&productId=" + productId,
          review
        )
        .then((response) => {
          console.log(response);
          alert("Send Review success");
          window.location.reload();
        })
        .catch((error) => {
          Promise.reject(error);
          alert("Send Review fail");
        });
    },

    getProductRating(){
      api.get('/product/review/star?productId=' + this.product.productId)
        .then((response) => {
          this.productRating = response.data;
        })
        .catch((error) => {
          Promise.reject(error);
        })

    },

    getUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>
<style scoped>
</style>
