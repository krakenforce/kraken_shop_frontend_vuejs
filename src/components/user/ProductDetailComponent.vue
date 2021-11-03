<template>
  <v-card class="overflow-hidden" justify="center" dark>
      <v-container justify="center" >
        <v-row class="mb-1">
          <v-col cols="12" md="12">
          <v-card>
            <v-img
              src="../../assets/user/img-product.png"
              max-height="500"
              class="grey darken-4"
            ></v-img>
          </v-card>
        </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" md="10">
            <v-card >
              <v-tabs color="red accent-4" left background-color="black">
                <v-tab class="white--text">Giới thiệu game</v-tab>
                <v-tab class="white--text">Cấu hình</v-tab>
                <v-tab class="white--text">Hướng dẫn mua hàng</v-tab>

                <v-tab-item v-for="n in 3" :key="n">
                  <v-container fluid black justify="center">
                    <v-row>
                      <v-col cols="auto">
                        <h1 class="white--text">
                          Game dự kiến ra mắt vào ngày 5/11/2021
                        </h1>
                        <v-btn
                          v-for="icon in icons"
                          :key="icon"
                          class="mx-4"
                          icon
                        >
                          <v-icon color="red" size="30px">
                            {{ icon }}
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-tab-item>
              </v-tabs>
            </v-card>
          </v-col>

          <v-col cols="12" md="2">
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

  data: () => ({
    selectedItem1: 0,
    selectedItem2: 0,
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
};
</script>
<style scoped>
</style>
