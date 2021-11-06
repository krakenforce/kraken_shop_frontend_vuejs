<template>
  <v-container justify="center">
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
      <v-col cols="12" md="10">
        <v-card>
          <v-tabs color="red accent-4" left background-color="black">
            <v-tab class="white--text">Mới nhất</v-tab>
            <v-tab class="white--text">Thấp đến cao</v-tab>
            <v-tab class="white--text">Cao đến thấp</v-tab>

            <v-tab-item v-for="n in 3" :key="n">
              <v-container fluid black justify="center">
                <v-row>
                  <v-col v-for="i in 8" :key="i" cols="auto">
                    <v-hover v-slot="{ hover }" close-delay="200">
                      <v-card
                        :elevation="hover ? 16 : 2"
                        :class="{ 'on-hover': hover }"
                        class="mx-auto"
                        max-width="1250"
                        color="black"
                      >
                        <v-row no-gutters>
                          <v-col cols="12" md="3">
                            <v-img
                              src="../../assets/user/small-card.jpg"
                              height="200px"
                            ></v-img>
                          </v-col>

                          <v-col cols="12" md="9">
                            <v-card-actions>
                              <v-container>
                                <v-row dense>
                                  <v-col cols="12" md="8">
                                    <v-card-title class="yellow--text">
                                      Call of Duty: Mobile VN</v-card-title
                                    >
                                  </v-col>

                                  <v-spacer></v-spacer>
                                  <v-col cols="12" md="4">
                                    <v-card-text class="white--text"
                                      >300 000 đ</v-card-text
                                    >
                                    <v-btn icon color="blue">
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
                      :length="4"
                      circle
                      color="blue"
                      dark
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
export default {
  name: "ProductList",

  data: () => ({
    selectedItem1: 0,
    selectedItem2: 0,
    page: 1,
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
  }),
};
</script>
<style lang="sass" scoped>
.v-card.on-hover.theme--light
    background-color: white
>.v-card__text
    color: white
</style>
