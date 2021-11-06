<template>
  <v-card>
    <v-tabs color="blue accent-4" background-color="black">
      <v-tab class="white--text">Tất Cả</v-tab>
      <v-tab class="white--text">Nổi Bật</v-tab>
      <v-tab class="white--text">Mới Ra Mắt</v-tab>

      <v-btn class="ma-2" outlined color="blue"> More </v-btn>

      <v-tab-item v-for="n in 4" :key="n">
        <v-container fluid black>
          <v-row>
            <v-col v-for="i in 8" :key="i" cols="12" md="3">
              <v-hover v-slot="{ hover }" close-delay="200">
                <v-card
                  :elevation="hover ? 16 : 2"
                  :class="{ 'on-hover': hover }"
                  class="mx-auto"
                  max-width="344"
                  color="black"
                >
                  <v-img
                    src="../../assets/user/small-card.jpg"
                    height="200px"
                  ></v-img>

                  <v-card-title class="white--text">
                    Call of Duty: Mobile VN</v-card-title
                  >

                  <v-card-actions>
                    <v-container>
                      <v-row dense>
                        <v-col cols="12" md="6">
                          <v-btn icon class="white--text" color="blue">
                            <v-icon>add_shopping_cart</v-icon>
                          </v-btn>
                          <v-btn icon class="white--text" color="pink">
                            <v-icon> mdi-heart </v-icon>
                          </v-btn>
                          <span class="subheading mr-2 white--text">256</span>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-card-text class="yellow--text"
                            >300 000 đ</v-card-text
                          >
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
</template>

<script>
export default {
  name: "Product",

  data: () => ({}),
};
</script>
<style lang="sass" scoped>
.v-card.on-hover.theme--light
  background-color: white
  >.v-card__text
    color: white
</style>
