<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3" v-for="item in bonusInfos" :key="item">
        <v-hover v-slot="{ hover }">
          <v-card class="pa-5" height="100%" link :to="item.link" :color="hover ? '#4a4343' : 'dark'">
            <v-card-title class="justify-center">
              <v-icon size="50">{{ item.icon }}</v-icon>
            </v-card-title>
            <v-card-subtitle class="justify-center">
              <h2>
                <strong>{{ item.title }}</strong>
              </h2>
            </v-card-subtitle>
            <v-card-text class="text-center">
              <span>{{ item.content }}</span>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BonusInfoComponent",
  data() {
    return {
      bonusInfos: [
        {
          icon: "fas fa-credit-card",
          title: "PAYMENT",
          content: "Multiple payment methods for customers",
        },
        {
          icon: "fas fa-gamepad",
          title: "GAME",
          content: "Many games for you to choose",
          link: "/search/genre/HighLight",
        },
        {
          icon: "far fa-money-bill-alt",
          title: "PRICE",
          content: "Cheap price and always the best support",
        },
        {
          icon: "fas fa-users",
          title: "COMMUNITY",
          content: "With KrakenShop community, support you anytime",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>