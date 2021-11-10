<template>
  <v-container fluid black justify="center">
    <v-row>
      <v-col cols="12" md="12">
        <v-card>
          <v-tabs
            color="blue accent-4"
            centered
            background-color="black"
            v-model="tab"
          >
            <v-tab
              v-for="(item, index) in items"
              :class="{ active: currentTab === index }"
              @click="changeTab(index)"
              :key="item"
            >
              {{ item }}
            </v-tab>
            <v-tab-item v-model="tab">
              <v-container fluid black justify="center">
                <div v-show="currentTab === 0">
                  <v-data-table
                    :headers="orderHeader"
                    :items="orders"
                    :page.sync="orderPage"
                    hide-default-footer=""
                  >
                    <template v-slot:item.action="{ item }">
                      <v-btn color="primary" @click="showOrderDetail(item)">
                        <v-icon>fas fa-info</v-icon>
                      </v-btn>
                    </template>
                  </v-data-table>
                  <v-pagination
                    v-model="orderPage"
                    :length="orderTotalPages"
                    circle
                    @input="getOrderByUser"
                  ></v-pagination>
                </div>
                <div v-show="currentTab === 1">
                  <v-data-table
                    :headers="paymentHeader"
                    :items="payments"
                    :page.sync="paymentPage"
                    hide-default-footer=""
                  >
                  </v-data-table>
                  <v-pagination
                    v-model="paymentPage"
                    :length="paymentTotalPages"
                    circle
                    @input="getPaymentByUser"
                  ></v-pagination>
                </div>
                <div v-show="currentTab === 2">
                  <v-data-table
                    :headers="transactionHeader"
                    :items="transactions"
                    :page.sync="transactionPage"
                    hide-default-footer=""
                  >
                  </v-data-table>
                  <v-pagination
                    v-model="transactionPage"
                    :length="transactionTotalPages"
                    circle
                    @input="getTransactionsByUser"
                  ></v-pagination>
                </div>
              </v-container>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" >
      <v-card color="primary" class="pa-5">
        <v-card-title>
          <h1>ORDER DETAIL </h1>
        </v-card-title>
        <v-data-table
          :headers="orderDetailHeader"
          :items="orderDetails"
          :page.sync="orderDetailPage"
          hide-default-footer=""
        >
        </v-data-table>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import api from "../../../services/api";

export default {
  name: "TransactionHistory",
  components: {},
  data() {
    return {
      items: ["ORDER HISTORY", "PAYMENT HISTORY", "TRANSACTION HISTORY"],
      currentTab: 0,
      tab: null,
      dialog: false,

      //order table
      orderPage: 1,
      orderItemPerPage: 0,
      orderTotalPages: 0,
      orders: [],
      orderHeader: [
        { text: "Id", value: "id" },
        { text: "Datetime", value: "orderDateTime" },
        { text: "Quantity", value: "quantity" },
        { text: "Total", value: "total" },
        { text: "Action", value: "action" },
      ],

      //order detail table
      orderDetailPage: 1,
      orderDetailItemPerPage: 0,
      orderDetailTotalPages: 0,
      orderDetails: [],
      orderDetailHeader: [
        { text: "Id", value: "id" },
        { text: "ProductName", value: "productName" },
        { text: "Game Code", value: "gameCode" },
      ],

      //payment table
      paymentPage: 1,
      paymentItemPerPage: 0,
      paymentTotalPages: 0,
      payments: [],
      paymentHeader: [
        { text: "Id", value: "id" },
        { text: "Total Price", value: "totalPrice" },
        { text: "Datetime", value: "createdAt" },
        { text: "Type", value: "provider" },
      ],

      //transaction table
      transactionPage: 1,
      transactionItemPerPage: 0,
      transactionTotalPages: 0,
      transactions: [],
      transactionHeader: [
        { text: "Id", value: "id" },
        { text: "Description", value: "description" },
        { text: "Total", value: "total" },
        { text: "Datetime", value: "createdAt" },
      ],
    };
  },
  methods: {
    changeTab(index) {
      if (index == 0) {
        this.currentTab = 0;
      } else if (index == 1) {
        this.currentTab = 1;
        this.getPaymentByUser(1);
      } else if (index == 2) {
        this.currentTab = 2;
        this.getTransactionsByUser(1);
      }
    },

    getOrderByUser(page) {
      let walletId = this.$store.state.auth.user.walletId;
      let pageNo = page - 1;
      api
        .get(
          "/order/search_user?walletId=" +
            walletId +
            "&pageNo=" +
            pageNo +
            "&pageSize=" +
            10
        )
        .then((response) => {
          this.orders = response.data.orders;
          this.orderTotalPages = response.data.totalPages;
        })
        .catch((error) => {
          Promise.reject(error);
        });
    },

    getOrderDetail(item) {
      api
        .get(
          "/order/order_detail/" + item.id + "?pageNo=" + 0 + "&pageSize=" + 10
        )
        .then((response) => {
          this.loading = false;
          this.orderDetails = response.data.orderDetails;
          this.orderDetailTotalPages = response.data.totalPages;
        });
    },

    showOrderDetail(item) {
      this.dialog = true;
      this.getOrderDetail(item);
    },

    getPaymentByUser(page) {
      let walletId = this.$store.state.auth.user.walletId;
      let pageNo = page - 1;

      api
        .get(
          "/payment/search_wallet?walletId=" +
            walletId +
            "&pageNo=" +
            pageNo +
            "&pageSize=" +
            10
        )
        .then((response) => {
          this.payments = response.data.payments;
          this.paymentTotalPages = response.data.totalPages;
        })
        .catch((error) => {
          Promise.reject(error);
        });
    },

    getTransactionsByUser(page) {
      let walletId = this.$store.state.auth.user.walletId;
      let pageNo = page - 1;

      api
        .get(
          "/payment/transactions/search_wallet?walletId=" +
            walletId +
            "&pageNo=" +
            pageNo +
            "&pageSize=" +
            10
        )
        .then((response) => {
          this.transactions = response.data.transactions;
          this.transactionTotalPages = response.data.totalPages;
        })
        .catch((error) => {
          Promise.reject(error);
        });
    },
  },
  mounted() {
    this.getOrderByUser(1);
  },
};
</script>

<style>
</style>