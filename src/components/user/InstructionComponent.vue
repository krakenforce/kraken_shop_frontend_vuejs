<template>
  <v-container justify="center" class="black lighten-5 mb-6">
    <v-row>
      <v-col cols="12" sm="12">
        <v-card>
          <v-img
            src="@/assets/user/pokemon.jpg"
            max-height="400"
            class="grey darken-4"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="9">
        <v-row>
          <h1>SUPPORT</h1>
        </v-row>
        <v-row>
          <v-expansion-panels>
            <v-expansion-panel v-for="(item, i) in items" :key="i">
              <v-expansion-panel-header>
                {{ item.title }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                {{ item.content }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-col>
      <v-col cols="12" md="3">
        <v-card color="black lighten-4" flat height="1535px" tile>
          <v-toolbar dense outlined color="#333333">
            <v-toolbar-title class="yellow--text text-h7"
              >Member VIP benefits</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text class="text-h7 font-weight-bold grey white--text">
            - VIP BRONZE: 1% discount of total bill value.
            <hr />
            - VIP SILVER: 2% discount of total bill value.
            <hr />
            - VIP GOLD: 3% discount of total bill value.
            <hr />
            +Priority order processing and top-up.
            <hr />
            - VIP PLATINUM : 5% discount of total bill value.
            <hr />
            +Priority is given to support in handling and fixing game errors
            with their own technical department..
            <hr />
            +Priority order processing and top-up.
            <hr />
            And many other attractive offers. See details here
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Instruction",

  data: () => ({
    items: [
      {
        title: "Buy",
        content:
          "You can buy by click on product card, then add it to cart and checkout",
        image: 'buy.png',
      },
      { title: "Login", content: "" },
      { title: "Register", content: "" },
      { title: "Top up", content: "" },
      { title: "Checkout", content: "" },
    ],
  }),
};
</script>
<style scoped>
</style>
