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
              <span>Stocking ✔️ </span>
            </v-col>
            <v-col cols="12" sm="4">
              <h3>Original Link:</h3>
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
                  <div class="ma-1 text-left">
                    <v-chip label color="red" small>
                      <strong>
                        -{{
                          calculatePercent(product.price, product.salePrice)
                        }}
                        %
                      </strong>
                    </v-chip>
                  </div>
                </v-card-title>
                <v-card-text>
                  <!-- RATING -->
                  <star-rating
                    :star-size="20"
                    :read-only="true"
                    :rating="product.avgStar"
                  ></star-rating>
                </v-card-text>
                <v-card-actions>
                  <v-container grid-list-xs>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <div class="text-overline mb-4">
                          <h3>
                            <strike class="red--text"
                              ><strong>{{ product.price }} &#36; </strong>
                            </strike>
                          </h3>
                          <h1 class="yellow--text">
                            <strong>{{ product.salePrice }} &#36; </strong>
                          </h1>
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-btn
                          @click="addToCart(product)"
                          color="blue"
                          class="white--text"
                          rounded
                        >
                          ADD TO CART
                          <v-icon>fas fa-shopping-cart</v-icon>
                        </v-btn>

                        <v-btn
                          @click="buy(product)"
                          color="red"
                          class="white--text mt-2"
                          rounded
                        >
                          <v-icon>fas fa-money-check-alt</v-icon>
                          &nbsp;BUY
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row>
                      <span>Categories:</span>
                      <div
                        v-for="item in product.categoryChilds"
                        :key="item.categoryId"
                      >
                        <v-chip>
                          {{ item.name }}
                        </v-chip>
                      </div>
                    </v-row>
                    <v-row>
                      <span>Tags:</span>
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
              <v-tab
                v-for="(item, index) in items"
                :class="{ active: currentTab === index }"
                @click="changeTab(index)"
                :key="item"
              >
                {{ item }}
              </v-tab>

              <v-tabs-items v-model="tab">
                <v-card flat>
                  <div v-show="currentTab === 0">
                    <div
                      class="text-left pa-5"
                      v-html="product.productDetail"
                    ></div>
                  </div>
                  <div v-show="currentTab === 1">
                    <div
                      class="text-left pa-5"
                      v-html="product.productWarranty"
                    ></div>
                  </div>
                  <!-- COMMENT -->
                  <div v-show="currentTab === 2">
                    <v-card elevation="12" color="black">
                      <div v-if="!user">
                        <h2>Please login to comment</h2>
                        <a href="/login" class="btn btn-block btn-primary"
                          >Login</a
                        >
                      </div>
                      <div v-else>
                        <v-card-title> Enter Comment </v-card-title>
                        <v-form>
                          <v-container grid-list-xs>
                            <v-text-field
                              name="name"
                              label="Content"
                              id="content"
                              v-model="commentContent"
                            ></v-text-field>
                            <v-btn color="primary" @click="sendComment">
                              Send Comment
                            </v-btn>
                          </v-container>
                        </v-form>
                      </div>
                      <div>
                        <v-container class="pa-5">
                          <v-card
                            class="pa-5"
                            v-for="item in comments"
                            :key="item.id"
                          >
                            <v-row>
                              <v-col cols="12" sm="1">
                                <v-img
                                  v-if="item.avatarImageUrl"
                                  width="50px"
                                  height="50px"
                                  :src="item.avatarImageUrl"
                                ></v-img>
                                <v-icon v-else size="50">fas fa-user</v-icon>
                              </v-col>
                              <v-col cols="12" sm="10">
                                <v-row>
                                  <span>{{ item.username }} -- </span>
                                </v-row>
                                <v-row>
                                  <h3>{{ item.content }}</h3>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-card>
                        </v-container>
                        <v-pagination
                          :length="commentTotalPages"
                          v-model="commentPage"
                          prev-icon="mdi-menu-left"
                          next-icon="mdi-menu-right"
                          color="red"
                          @input="getProductComment"
                        ></v-pagination>
                      </div>
                    </v-card>
                  </div>
                  <!-- REVIEW -->
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
                              :star-size="20"
                              :animate="true"
                              @rating-selected="getRating"
                            ></star-rating>
                            <v-text-field
                              name="name"
                              label="Content"
                              id="content"
                              v-model="reviewContent"
                            ></v-text-field>
                            <v-btn color="primary" @click="sendReview">
                              Send Review
                            </v-btn>
                          </v-container>
                        </v-form>
                      </div>
                      <div>
                        <v-container class="pa-5">
                          <v-card
                            class="pa-5"
                            v-for="item in reviews"
                            :key="item.id"
                          >
                            <v-row>
                              <v-col cols="12" sm="1">
                                <v-img
                                  v-if="item.avatarImageUrl"
                                  width="50px"
                                  height="50px"
                                  :src="item.avatarImageUrl"
                                ></v-img>
                                <v-icon v-else size="50">fas fa-user</v-icon>
                              </v-col>
                              <v-col cols="12" sm="10">
                                <v-row>
                                  <span>{{ item.username }} -- </span>
                                </v-row>
                                <v-row>
                                  <star-rating
                                    :star-size="15"
                                    :rating="item.starRating"
                                    :read-only="true"
                                    :show-rating="false"
                                  ></star-rating>
                                </v-row>

                                <v-row>
                                  <h3>{{ item.content }}</h3>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-card>
                        </v-container>
                        <v-pagination
                          :length="reviewTotalPages"
                          v-model="reviewPage"
                          prev-icon="mdi-menu-left"
                          next-icon="mdi-menu-right"
                          color="red"
                          @input="getProductReview"
                        ></v-pagination>
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
              <v-subheader class="yellow--text">CATEGORY</v-subheader>
              <v-list-item-group v-model="selectedItem1" color="red">
                <v-list-item
                  v-for="(item, i) in item1"
                  :key="i"
                  :to="item.link"
                >
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
                <v-list-item
                  v-for="(item, i) in item2"
                  :key="i"
                  :to="item.link"
                >
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

      <!-- SẢN PHẨM TƯƠNG TỰ -->
      <v-row>
        <v-col cols="12" sm="12">
          <v-sheet class="mx-auto" elevation="8">
            <h3>Related Products:</h3>
            <v-slide-group  class="pa-4" show-arrows>
              <v-slide-item
                v-for="item in productSamePack"
                :key="item.productId"
                class="ma-2"
              >
                <v-hover v-slot="{ hover }" close-delay="200">
                  <v-card
                    height="100%"
                    :elevation="hover ? 16 : 5"
                    :class="{ 'on-hover': hover }"
                    class="ma-2"
                    max-width="344"
                    color="#343434"
                    link
                    @click="seeProductDetail(item)"
                  >
                    <v-img
                      :src="item.thumbnailImageUrl"
                      height="135px"
                      width="240px"
                    >
                      <div class="ma-1 text-left">
                        <v-chip label color="red" small>
                          <strong>
                            -{{ calculatePercent(item.price, item.salePrice) }}
                            %
                          </strong>
                        </v-chip>
                      </div>
                    </v-img>

                    <v-card-subtitle class="white--text">
                      {{ item.name }}</v-card-subtitle
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
                          <v-col cols="12" sm="6">
                            <strike class="red--text">
                              {{ item.price }} <strong>&#36;</strong>
                            </strike>
                          </v-col>
                        </v-row>
                        <v-row dense>
                          <v-col cols="12" sm="6">
                            <h3 class="yellow--text">
                              {{ item.salePrice }} <strong>&#36;</strong>
                            </h3>
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
                              <!-- <v-btn
                                  icon
                                  class="white--text"
                                  color="pink"
                                  @click.stop="addToFavorite"
                                >
                                  <v-icon> mdi-heart </v-icon>
                                </v-btn> -->
                            </div>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-actions>
                  </v-card>
                </v-hover>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
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
  props: ["product", "productSamePack"],
  components: {
    StarRating,
  },
  data: () => ({
    user: null,
    rating: 0,
    productRating: 0,

    //comment
    commentPage: 1,
    commentTotalPages: 0,
    commentContent: "",
    comments: [],

    //review
    reviewPage: 1,
    reviewTotalPages: 0,
    reviewContent: "",
    reviews: [],

    selectedItem1: 0,
    selectedItem2: 0,
    currentTab: 0,
    tab: null,
    items: ["INTRODUCTION", "WARRANTY", "COMMENT", "REVIEW"],
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
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
  methods: {
    changeTab(index) {
      if (index == 0) {
        this.currentTab = 0;
      } else if (index == 1) {
        this.currentTab = 1;
      } else if (index == 2) {
        this.currentTab = 2;
        this.getProductComment(1);
      } else if (index == 3) {
        this.currentTab = 3;
        this.getProductReview(1);
      }
    },

    calculatePercent(price, salePrice) {
      let test = (100 * salePrice) / price;
      let result = 100 - test;
      return Math.round(result);
    },

    seeProductDetail(item) {
      this.$router.push({
        name: "ProductDetail",
        params: {
          productId: item.productId,
        },
      });
    },

    chipClick(type, value) {
      let link = "/search/" + type + "/" + value;
      window.location.href = link;
    },

    getRating(rating) {
      this.rating = rating;
    },

    addToCart(item) {
      this.$store.commit("addToCart", item);
    },

    buy(item) {
      this.$store.commit("addToCart", item);
      this.$router.push("/cart");
    },

    sendReview() {
      let productId = this.product.productId;
      let userId = this.user.id;
      let review = { starRating: this.rating, content: this.reviewContent };
      if (review.content == "") {
        alert("Please enter content");
      } else {
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
      }
    },

    getProductRating() {
      api
        .get("/product/review/star?productId=" + this.product.productId)
        .then((response) => {
          this.productRating = response.data;
        })
        .catch((error) => {
          Promise.reject(error);
        });
    },

    sendComment() {
      let productId = this.product.productId;
      let userId = this.user.id;
      let comment = { content: this.commentContent };
      if (comment.content == "") {
        alert("Please enter content");
      } else {
        api
          .post(
            "/product/comment?userId=" + userId + "&productId=" + productId,
            comment
          )
          .then((response) => {
            console.log(response);
            alert("Send Comment success");
            window.location.reload();
          })
          .catch((error) => {
            Promise.reject(error);
            alert("Send Comment fail");
          });
      }
    },

    getProductReview(page) {
      let pageNo = page - 1;
      api
        .get(
          "/product/review/product/" +
            this.product.productId +
            "?pageNo=" +
            pageNo +
            "&pageSize=" +
            10
        )
        .then((response) => {
          this.reviews = response.data.reviews;
          this.reviewTotalPages = response.data.totalPages;
        })
        .catch((error) => {
          Promise.reject(error);
        });
    },

    getProductComment(page) {
      let pageNo = page - 1;
      api
        .get(
          "/product/comment/product/" +
            this.product.productId +
            "?pageNo=" +
            pageNo +
            "&pageSize=" +
            10
        )
        .then((response) => {
          this.comments = response.data.comments;
          this.commentTotalPages = response.data.totalPages;
        })
        .catch((error) => {
          Promise.reject(error);
        });
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
