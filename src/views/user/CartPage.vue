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
                <th class="text-center">Total</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in $store.state.shoppingCart.cart" :key="item.productId">
                <td class="text-center">{{ item.productId }}</td>
                <td class="text-center">{{ item.name }}</td>
                <td class="text-center">{{ item.quantity }}</td>
                <td class="text-center">{{ item.totalPrice }} $</td>
                <td class="text-center">
                    <v-btn color="red" @click.prevent="removeFromCart(item)">
                        <v-icon>fas fa-trash</v-icon>
                    </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-divider></v-divider>
        <h2>TOTAL: {{totalPrice}} $</h2>
        <v-card-actions>
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="3">
              <v-btn color="blue" outlined @click.prevent="checkWalletBalance">CHECKOUT</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </div>
      <div v-else>
          <v-card-title primary-title>
              SHOPPING CART IS EMPTY
          </v-card-title>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "CartPage",
  data() {
    return {
      search: "",
    };
  },
  methods: {
      removeFromCart(item){
      this.$store.commit('removeFromCart', item);
    },

    checkWalletBalance(){
      let total = this.totalPrice;
      let walletBalance = this.$store.state.auth.user.walletBalance;
      if(walletBalance < total){
        alert("số dư không đủ, nạp thêm tiền");
        this.$router.push('/userInfo');
      }else{
        alert("Proceed to Check Out")
        this.$router.push('/checkout');
      }
    },
  },
  computed: {
      totalPrice(){
      let total = 0;
      for(let item of this.$store.state.shoppingCart.cart){
        total += item.totalPrice;
      } 

      return total;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>