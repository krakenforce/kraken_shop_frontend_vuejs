<template>
  <v-container fluid>
    <v-window v-model="step">
      <v-window-item :value="1">
        <h1 class="gray --text">Manage Order</h1>
        <span>You can see detail of orders</span>

        <v-row class="mt-4">
          <v-col cols="12" sm="3">
            <v-text-field label="Order Search" v-model="searchKeyword" @input="getOrderByUsername">
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="3">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="startTime"
                  label="Start Date"
                  hint="MM/DD/YYYY format"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="startTime"
                no-title
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="3">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="endTime"
                  label="End Date"
                  hint="MM/DD/YYYY format"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="endTime"
                no-title
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="2">
            <v-btn @click="getOrderByTime" color="green" class="white--text">
              <v-icon>fas fa-search</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="1">
            <v-btn color="transparent" x-small="true" @click="reloadWindow()"
              >.
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" sm="12">
            <v-data-table
              :page="1"
              :pageCount="totalPages"
              :headers="headers"
              :items="orders"
              :options.sync="options"
              :server-items-length="totalItems"
              :loading="loading"
              class="elevation-1"
              ref="dataTable"
            >
              <template v-slot:item.action="{ item }">
                <v-btn color="primary" @click="showOrderDetail(item)">
                  <v-icon>fas fa-info-circle</v-icon>
                </v-btn>
              </template>
              ></v-data-table
            >
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item :value="2">
        <h1>Detail of order : {{ orderModel.id }}</h1>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-btn color="purple" class="white--text" @click="step -= 2"
              >Go back to Order manage</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <v-data-table
              :page="1"
              :pageCount="totalPages"
              :headers="orderDetailHeaders"
              :items="orderDetails"
              :options.sync="options"
              :server-items-length="totalItems"
              :loading="loading"
              class="elevation-1"
              ref="dataTable"
            >
              ></v-data-table
            >
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
import moment from "moment";
import api from "../../../services/api";

export default {
  name: "Order",
  components: {},
  data() {
    return {
      searchKeyword: "",
      testValue: "",
      step: 1,
      items: ["ADMIN", "USER"],
      startTime: null,
      endTime: null,
      orderModel: "",

      //table
      page: 0,
      totalItems: 0,
      totalPages: 0,
      orders: [],
      orderDetails: [],
      loading: true,
      options: {},
      headers: [
        { text: "Id", value: "id" },
        { text: "Datetime", value: "orderDateTime" },
        { text: "Username", value: "username" },
        { text: "Quantity", value: "quantity" },
        { text: "Total", value: "total" },
        { text: "Action", value: "action" },
      ],

      orderDetailHeaders: [
        { text: "Id", value: "id" },
        { text: "Order Id", value: "orderId" },
        { text: "Product Name", value: "productName" },
        { text: "Product Game Code", value: "gameCode" },
        { text: "Quantity", value: "quantity" },
        { text: "Total", value: "total" },
      ],
    };
  },
  watch: {
    options: {
      handler() {
        this.getAllOrders();
      },
      deep: true,
    },
  },
  props: {
    source: String,
  },
  methods: {
    reloadWindow() {
      window.location.reload();
    },

    showOrderDetail(item) {
      this.orderModel = item;
      this.step = 2;
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get(
          "/order/order_detail/" +
            item.id +
            "?pageNo=" +
            pageNumber +
            "&pageSize=" +
            itemsPerPage
        )
        .then((response) => {
          this.loading = false;
          this.orderDetails = response.data.orderDetails;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },

    getOrderByUsername() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;
      if(this.searchKeyword == ""){
        this.getAllOrders()
      }else{
        api
        .get(
          "/order/search_username?keyword=" +
            this.searchKeyword +
            "&pageNo=" +
            pageNumber +
            "&pageSize=" +
            itemsPerPage
        )
        .then((response) => {
          this.loading = false;
          this.orders = response.data.orders;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
      }
      
    },

    getOrderByTime() {
      var startTime = new Date(this.startTime);
      var endTime = new Date(this.endTime);
      let start = moment(startTime).format("YYYY-MM-DD HH:MM:SS");
      let end = moment(endTime).format("YYYY-MM-DD HH:MM:SS");

      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get(
          "/order/search?startTime=" +
            start +
            "&endTime=" +
            end +
            "&pageNo=" +
            pageNumber +
            "&pageSize=" +
            itemsPerPage
        )
        .then((response) => {
          this.loading = false;
          this.orders = response.data.orders;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },

    getAllOrders() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get("/order?pageNo=" + pageNumber + "&pageSize=" + itemsPerPage)
        .then((response) => {
          this.loading = false;
          this.orders = response.data.orders;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },
  },
  mounted() {
    this.getAllOrders();
  },
};
</script>

<style lang="scss" scoped></style>
