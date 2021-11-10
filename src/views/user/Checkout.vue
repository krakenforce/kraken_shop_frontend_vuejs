<template>
  <v-container class="mt-10">
    <v-card elevation="12" class="pa-10">
      <div v-if="$store.state.shoppingCart.cart.length > 0">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">Product Id</th>
                <th class="text-center">Product Name</th>
                <th class="text-center">Quantity</th>
                <th class="text-center">Sub Total</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in $store.state.shoppingCart.cart"
                :key="item.productId"
              >
                <td class="text-center">{{ item.productId }}</td>
                <td class="text-center">{{ item.name }}</td>
                <td class="text-center">{{ item.quantity }}</td>
                <td class="text-center">{{ item.totalPrice }} $</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-divider></v-divider>
        <div>
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="4">
              <h3 class="green--text">
                YOUR WALLET BALANCE:
                {{ this.currentUser.walletBalance }} $
              </h3>
            </v-col>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="4">
              <h2>TOTAL: {{ totalPrice }} $</h2>
            </v-col>
          </v-row>
        </div>

        <v-card-actions>
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="3">
              <v-btn color="blue" outlined @click="checkWalletBalance"
                >CHECKOUT</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </div>
      <div v-else>
        <v-card-title primary-title> SHOPPING CART IS EMPTY </v-card-title>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import api from "../../services/api";
export default {
  name: "Checkout",
  data() {
    return {
      search: "",
      currentUser: null,
    };
  },
  methods: {
    removeFromCart(item) {
      this.$store.commit("removeFromCart", item);
    },

    getUser() {
      this.currentUser = JSON.parse(localStorage.getItem("user"));
    },

    checkWalletBalance() {
      let total = this.totalPrice;
      let walletBalance = this.currentUser.walletBalance;
      if (walletBalance < total) {
        alert("số dư không đủ, nạp thêm tiền");
        this.$router.push("/userInfo");
      } else {
        this.createOrder(this.totalPrice);
        this.decreaseWallet(this.totalPrice);
        this.$store.commit("resetCart");
        this.$router.push("/checkout-success");
      }
    },

    createOrder(total) {
      let walletId = this.currentUser.walletId;
      let order = { quantity: "", total: "" };
      let cart = this.$store.state.shoppingCart.cart;
      order.quantity = this.$store.state.shoppingCart.cartCount;
      order.total = total;

      let productInfoSet = [];
      for (let product of cart) {
        const productInfo = new Object();
        productInfo.productId = product.productId;
        productInfo.quantity = product.quantity;
        productInfo.totalPrice = product.totalPrice;
        productInfoSet.push(productInfo);
      }

      console.log(productInfoSet);

      var FormData = require("form-data");
      const formData = new FormData();
      formData.append(
        "order",
        new Blob([JSON.stringify(order)], {
          type: "application/json",
        })
      );
      formData.append(
        "gameCodeDetail",
        new Blob([JSON.stringify(productInfoSet)], {
          type: "application/json",
        })
      );

      api
        .post("/order?walletId=" + walletId, formData)
        .then((response) => {
          response.data;
        })
        .catch((error) => {
          Promise.reject(error);
        });
    },

    decreaseWallet(total) {
      this.currentUser["walletBalance"] =
        parseFloat(this.currentUser.walletBalance) - parseFloat(total);
      var user = JSON.stringify(this.currentUser);
      let walletId = this.currentUser.walletId;
      localStorage.setItem("user", user);

      api
        .put("/wallet?walletId=" + walletId + "&total=" + total)
        .then((response) => {
          response.data;
        });
    },
  },
  computed: {
    totalPrice() {
      let total = 0;
      for (let item of this.$store.state.shoppingCart.cart) {
        total += item.totalPrice;
      }

      return total;
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style lang="scss" scoped>
</style>