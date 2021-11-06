<template>
  <v-container fluid black justify="center">
    <v-row>
      <v-col cols="12" md="12">
        <v-card>
          <v-tabs color="blue accent-4" centered background-color="black">
            <v-tab class="white--text">Paypal</v-tab>
            <v-tab class="white--text">Bank transfer</v-tab>

              <v-tab-item>
                <Paypal />
              </v-tab-item>
              <v-tab-item>
                <BankTransfer />
              </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Paypal from "./Paypal.vue"
import BankTransfer from "./BankTransfer.vue"
export default {
  name: "Recharge",
  components: {
    BankTransfer,
    Paypal,
  },
  data() {
    return {
    };
  },
};
</script>

<style>
</style>