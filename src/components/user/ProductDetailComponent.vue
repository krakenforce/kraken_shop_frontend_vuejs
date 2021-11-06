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
                        <v-btn outlined color="red" class="white--text" rounded>
                          BUY
                        </v-btn>
                      </v-col>
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
                    <v-card-text>{{product.productDetail}}</v-card-text>
                  </div>
                  <div v-show="currentTab === 1">
                    <v-card-text>{{product.productWarranty}}</v-card-text>
                  </div>
                  <div v-show="currentTab === 2">
                    <v-card-text>Tab2 content</v-card-text>
                  </div>
                  <div v-show="currentTab === 3">
                    <v-card-text>Tab3 content</v-card-text>
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
export default {
  name: "ProductDetail",
  props: ["product"],

  data: () => ({
    selectedItem1: 0,
    selectedItem2: 0,
    currentTab: 0,
    tab: null,
    items: ["INTRODUCTION", "WARRANTY", "BUY INSTRUCTION", "COMMENT"],
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
  mounted() {
    
  },
  created() {},
};
</script>
<style scoped>
</style>
