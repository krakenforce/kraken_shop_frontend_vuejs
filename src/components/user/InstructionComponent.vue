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
            <v-expansion-panel >
              <v-expansion-panel-header>
                Login
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-img src="@/assets/user/login1.png"></v-img>
                <p>Go to Login page, enter username or password to login</p>
                <p>If you don't have account, sign up one</p>
                <v-img src="@/assets/user/login2.png"></v-img>
                <p>If you forget password, click "forgot password on login page"</p>
                <p>Enter email go get password</p>
                <v-img src="@/assets/user/login3.png"></v-img>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-expansion-panels>
            <v-expansion-panel >
              <v-expansion-panel-header>
                Top up
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>After login, you can top up your wallet </p>
                <v-img src="@/assets/user/topup1.png"></v-img>
                <p>Click on "recharge" tab</p>
                <v-img src="@/assets/user/topup2.png"></v-img>
                <p>Click on Paypal or Bank</p>
                <v-img src="@/assets/user/topup3.png"></v-img>
                <v-img src="@/assets/user/topup4.png"></v-img>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-expansion-panels>
            <v-expansion-panel >
              <v-expansion-panel-header>
                Checkout
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>Add product to cart</p>
                <v-img src="@/assets/user/buy1.png"></v-img>
                <p>hover on shopping cart to see item</p>
                <v-img src="@/assets/user/buy2.png"></v-img>
                <p>Click on go to cart to see detail and order game</p>
                <v-img src="@/assets/user/buy3.png"></v-img>
                <v-img width="700px" height="200px" src="@/assets/user/buy4.png"></v-img>
                <p>and checkout !!</p>
                <v-img width="700px" height="200px" src="@/assets/user/buy5.png"></v-img>

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
      { title: "Login", content: "You can go to login page and enter username and password to login" },
      { title: "Register", content: "Enter username, email and password to register" },
      { title: "Top up", content: "Go to user info page and select recharge tab to top up by paypal or bank transfer" },
      { title: "Checkout", content: "Add product to cart and check out" },
    ],
  }),
};
</script>
<style scoped>
</style>
