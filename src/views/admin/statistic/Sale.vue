<template>
  <v-container>
    <h1>Sale Statistics</h1>
    <span>Show statistic detail of Sales</span>
    <v-spacer></v-spacer>

    <v-row>
      <!-- FIRST DATE PICKER -->
      <v-col cols="12" sm="4">
        <v-menu
          v-model="menu1"
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
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <!-- SECOND DATE PICKER -->
      <v-col cols="12" sm="4">
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
        <v-btn @click="getInfo" color="green" class="white--text">
          <v-icon>fas fa-search</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" sm="1">
        <v-btn color="transparent" x-small="true" @click="reloadWindow"
          >.
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="4">
        <v-card elevation="12" class="pa-10" height="100%">
          <v-subheader :inset="inset"> --- Total Revenue --- </v-subheader>
          <v-text>
            <h1 class="green--text">
              <strong> {{ totalRevenue }} $ </strong>
            </h1>
          </v-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card elevation="12" class="pa-10" height="100%">
          <v-subheader :inset="inset"> --- Revenue This Month --- </v-subheader>
          <v-text>
            <h1 class="blue--text">
              <strong> {{ revenueThisMonth }} $ </strong>
            </h1>
            <div v-if="revenueByTime != 0">
              <p v-if="inOrde" class="green--text">
                Difference: {{ chenhlech }} <i class="mdi mdi-arrow-up"></i>
              </p>
              <p v-if="!inOrde" class="red--text">
                Difference: {{ chenhlech }} <i class="mdi mdi-arrow-down"></i>
              </p>
            </div>
          </v-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card elevation="12" class="pa-10" height="100%">
          <v-subheader :inset="inset">--- Revenue By Time --- </v-subheader>
          <v-text>
            <div v-if="revenueByTime != 0">
              <h1 class="yellow--text">
                <strong> {{ revenueByTime }} $ </strong>
              </h1>
            </div>
          </v-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <v-card elevation="12" class="pa-10">
          <div id="printMe">
            <v-card-title
              ><span class="green--text">FROM: </span>
              {{ displayStartTime }} ---
              <span class="green--text">TO: </span>
              {{ displayEndTime }}</v-card-title
            >

            <v-subheader :inset="inset"
              >--- Number of orders by day --- :
              <h1 v-if="numberOfOrder != 0">{{ numberOfOrder }}</h1>
              <h1 v-else>0</h1>
            </v-subheader>

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
          </div>
          <v-pagination
            v-model="orderPage"
            :length="orderTotalPages"
            circle
            @input="changePageOrder"
          ></v-pagination>
        </v-card>
      </v-col>
    </v-row>
    <v-btn color="blue" @click="print('printMe')">
      <v-icon>fas fa-print</v-icon>
    </v-btn>

    <v-dialog v-model="dialog">
      <v-card color="primary" class="pa-5">
        <v-card-title>
          <h1>ORDER DETAIL</h1>
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
import moment from "moment";
import api from "../../../services/api";

export default {
  components: {},
  name: "Sale",
  data: () => ({
    dialog: false,
    startTime: "",
    endTime: "",

    displayStartTime: "",
    displayEndTime: "",
    numberOfOrder: 0,

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

    totalRevenue: 0,
    revenueByTime: 0,
    revenueThisMonth: 0,
    chenhlech: 0,
    inOrde: "",
  }),
  methods: {
    getOrderThisMonth(page) {
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      let start = moment(firstDay).format("YYYY-MM-DD HH:MM:SS");
      let end = moment(lastDay).format("YYYY-MM-DD HH:MM:SS");

      let pageNumber = page - 1;
      this.displayStartTime = start;
      this.displayEndTime = end;

      api
        .get(
          "/order/search?startTime=" +
            start +
            "&endTime=" +
            end +
            "&pageNo=" +
            pageNumber +
            "&pageSize=" +
            10
        )
        .then((response) => {
          this.loading = false;
          this.orders = response.data.orders;
          this.orderTotalPages = response.data.totalPages;
          this.numberOfOrder = response.data.totalItems;
        });
    },

    getRevenueThisMonth() {
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      let start = moment(firstDay).format("YYYY-MM-DD HH:MM:SS");
      let end = moment(lastDay).format("YYYY-MM-DD HH:MM:SS");

      api
        .get(
          "statistics/total_revenue_time?startTime=" + start + "&endTime=" + end
        )
        .then((response) => {
          this.revenueThisMonth = response.data;
        })
        .catch((error) => {
          Promise.reject(error);
        });
    },

    reloadWindow() {
      this.loaded = false;
      window.location.reload();
    },
    getTotalRevenue() {
      api
        .get("statistics/total_revenue")
        .then((response) => {
          this.totalRevenue = response.data;
        })
        .catch((error) => {
          Promise.reject(error);
        });
    },

    getInfo() {
      this.getRevenueByTime();
      this.getOrderByTime(1);
    },

    changePageOrder(page) {
      if(this.startTime == "" || this.endTime == ""){
        this.getOrderThisMonth(page);
      }else{
        this.getOrderByTime(page);
      }
    },

    getRevenueByTime() {
      var startTime = new Date(this.startTime);
      var endTime = new Date(this.endTime);
      let start = moment(startTime).format("YYYY-MM-DD HH:MM:SS");
      let end = moment(endTime).format("YYYY-MM-DD HH:MM:SS");

      api
        .get("/statistics/revenue_time?startTime=" + start + "&endTime=" + end)
        .then((response) => {
          this.revenueByTime = response.data;
          this.chenhlech = this.revenueThisMonth - this.revenueByTime;
          if (this.revenueThisMonth >= this.revenueByTime) {
            this.inOrde = true;
          } else {
            this.inOrde = false;
          }
        })
        .catch((err) => {
          Promise.reject(err);
        });
    },

    getRevenueByFirstRange() {
      var startTime = new Date(this.stime1);
      var endTime = new Date(this.etime1);
      let start = moment(startTime).format("YYYY-MM-DD HH:MM:SS");
      let end = moment(endTime).format("YYYY-MM-DD HH:MM:SS");

      api
        .get("/statistics/revenue_time?startTime=" + start + "&endTime=" + end)
        .then((response) => {
          this.revenueByRange1 = response.data;
        })
        .catch((err) => {
          Promise.reject(err);
        });
    },

    getRevenueBySecondRange() {
      var startTime = new Date(this.stime2);
      var endTime = new Date(this.etime2);
      let start = moment(startTime).format("YYYY-MM-DD HH:MM:SS");
      let end = moment(endTime).format("YYYY-MM-DD HH:MM:SS");

      api
        .get("/statistics/revenue_time?startTime=" + start + "&endTime=" + end)
        .then((response) => {
          this.revenueByRange2 = response.data;
        })
        .catch((err) => {
          Promise.reject(err);
        });
    },

    getOrderByTime(page) {
      var startTime = new Date(this.startTime);
      var endTime = new Date(this.endTime);
      let start = moment(startTime).format("YYYY-MM-DD HH:MM:SS");
      let end = moment(endTime).format("YYYY-MM-DD HH:MM:SS");

      let pageNumber = page - 1;
      this.displayStartTime = start;
      this.displayEndTime = end;

      api
        .get(
          "/order/search?startTime=" +
            start +
            "&endTime=" +
            end +
            "&pageNo=" +
            pageNumber +
            "&pageSize=" +
            5
        )
        .then((response) => {
          this.orders = response.data.orders;
          this.orderTotalPages = response.data.totalPages;
          this.numberOfOrder = response.data.totalItems;
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

    createChart() {
      this.getRevenueByFirstRange();
      this.getRevenueBySecondRange();
      this.barchartData.push(this.revenueByRange1);
      this.barchartData.push(this.revenueByRange1);
      alert(this.barchartData);
      this.loaded = true;
    },

    print(id) {
      // Pass the element id here
      this.$htmlToPaper(id);
    },
  },
  computed: {},
  mounted() {
    this.getTotalRevenue();
    this.getRevenueThisMonth();
    this.getOrderThisMonth(1);
  },
};
</script>

<style lang="scss" scoped>
</style>