<template>
  <v-container>
    <h1>DASHBOARD</h1>
    <span>Show statistic detail of Sales</span>
    <v-spacer></v-spacer>

    <!-- USER SPEND  -->
    <v-row>
      <v-col cols="12" sm="4">
        <v-card elevation="12" class="pa-10" height="100%">
          <v-subheader> --- Total Renue --- </v-subheader>
          <v-text>
            <h1 class="green--text">
              <strong> {{ totalRevenue }} $ </strong>
            </h1>
          </v-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card elevation="12" class="pa-10" height="100%">
          <v-subheader> --- This Month Revenue --- </v-subheader>
          <v-text>
            <h1 class="yellow--text">
              <strong> {{ revenueByTime }} $ </strong>
            </h1>
          </v-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card elevation="12" class="pa-10">
          <v-subheader> -- Total Order This Month -- </v-subheader>
          <v-text>
            <h1 class="blue--text">
              <strong> {{ totalItems }} </strong>
            </h1>
          </v-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- CATEGORY CHART -->
    <v-row>
      <v-col cols="12" sm="12">
        <v-card elevation="12" class="pa-10" height="100%">
          <v-subheader :inset="inset">
            --- Category Sales This Month ---
          </v-subheader>
          <BarChart
            v-if="categoryLoaded"
            :chartData="categoryAmount"
            :chartLabels="categoryChartLabel"
            :coloR="categoryChartColor"
          />
        </v-card>
      </v-col>
    </v-row>

    <!-- TAG CHART -->
    <v-row>
      <v-col cols="12" sm="12">
        <v-card elevation="12" class="pa-10" height="100%">
          <v-subheader :inset="inset">
            --- Tag Sales This Month ---
          </v-subheader>
          <BarChart
            v-if="tagLoaded"
            :chartData="tagAmount"
            :chartLabels="tagChartLabel"
            :coloR="tagChartColor"
          />
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <v-card elevation="12" class="pa-10">
          <v-subheader> --- User Spend Detail --- </v-subheader>
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
            ></v-data-table
          >
          <v-btn class="white--text ma-4" color="blue">
            <v-icon> fas fa-print </v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../../../services/api";
import moment from "moment";
import BarChart from "../../../components/admin/BarChart.vue";

export default {
  name: "Dash",
  components: {
    BarChart,
  },
  data: () => ({
    totalRevenue: 0,
    revenueByTime: 0,

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
    ],

    //category stat chart
    categoryLoaded: false,
    categoryAmount: [],
    categoryChartLabel: [],
    categoryChartColor: [],

    //tag stat chart
    tagLoaded: false,
    tagAmount: [],
    tagChartLabel: [],
    tagChartColor: [],
  }),
  computed: {},
  methods: {
  
    getOrderByTime() {
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      let start = moment(firstDay).format("YYYY-MM-DD HH:MM:SS");
      let end = moment(lastDay).format("YYYY-MM-DD HH:MM:SS");

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
          this.revenueByTime = response.data;
        })
        .catch((error) => {
          Promise.reject(error);
        });
    },

    mappingCategoryChart() {
      this.categoryAmount = this.categoryStats.map(
        (category) => category.amount
      );
      this.categoryChartLabel = this.categoryStats.map(
        (category) => category.categoryName
      );

      var dynamicColors = function () {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
      };

      for (var i in this.categoryChartLabel) {
        console.log(i);
        this.categoryChartColor.push(dynamicColors());
      }
      this.categoryLoaded = true;
    },

    mappingTagChart() {
      this.tagAmount = this.tagStats.map((tag) => tag.amount);
      this.tagChartLabel = this.tagStats.map((tag) => tag.tagName);

      var dynamicColors = function () {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
      };

      for (var i in this.tagChartLabel) {
        console.log(i);
        this.tagChartColor.push(dynamicColors());
      }
      this.tagLoaded = true;
    },

    getThisMonthCategoryStat() {
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      let start = moment(firstDay).format("YYYY-MM-DD HH:MM:SS");
      let end = moment(lastDay).format("YYYY-MM-DD HH:MM:SS");

      api
        .get("/statistics/category_time?startTime=" + start + "&endTime=" + end)
        .then((response) => {
          this.categoryStats = response.data;
          this.mappingCategoryChart();
        });
    },

    getThisMonthTagStat() {
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      let start = moment(firstDay).format("YYYY-MM-DD HH:MM:SS");
      let end = moment(lastDay).format("YYYY-MM-DD HH:MM:SS");

      api
        .get("/statistics/tag_time?startTime=" + start + "&endTime=" + end)
        .then((response) => {
          this.tagStats = response.data;
          this.mappingTagChart();
        });
    },
  },
  mounted() {
    this.getTotalRevenue();
    this.getOrderByTime();
    this.getRevenueThisMonth();
    this.getThisMonthCategoryStat();
    this.getThisMonthTagStat();
  },
};
</script>

<style lang="scss" scoped>
</style>