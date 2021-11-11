<template>
  <v-container>
    <h1>User Statistics</h1>
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
        <v-btn @click="getUserStatByTime" color="green" class="white--text">
          <v-icon>fas fa-search</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" sm="1">
        <v-btn color="transparent" x-small="true" @click="reloadWindow()"
          >.
        </v-btn>
      </v-col>
    </v-row>

    <!-- USER SPEND  -->
    <v-row>
      <v-col cols="12" sm="12">
        <v-card elevation="12" class="pa-10">
          <v-subheader :inset="inset"> --- User Spend chart --- </v-subheader>
          <BarChart
            v-if="userLoaded"
            :chartData="userAmount"
            :chartLabels="userChartLabel"
            :coloR="userChartColor"
          />
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12">
        <v-card elevation="12" class="pa-10">
          <v-subheader :inset="inset"> --- User Spend Detail --- </v-subheader>
          <v-simple-table>
            <thead>
              <tr>
                <th>User Id</th>
                <th>Username</th>
                <th>Total Spend</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in userPaginatedData" :key="user">
                <td>{{ user.userId }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.total }}</td>
                <td>
                  <v-btn color="blue" @click="getDetail(user)">
                    <v-icon>fas fa-info</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
          <v-pagination
            :length="userPageCount"
            v-model="userPageNumber"
            circle
            @input="userNextPage"
          ></v-pagination>
          <v-btn class="white--text ma-4" color="blue">
            <v-icon> fas fa-print </v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- DIALOG -->
    <v-dialog v-model="dialog">
      <v-card class="pa-5">
        <v-row>
          <v-col cols="12" sm="7">
            <v-card elevation="12" class="pa-10">
              <v-subheader :inset="inset">
                --- User Spend chart ---
              </v-subheader>
              <BarChart
                v-if="productLoaded"
                :chartData="productAmount"
                :chartLabels="productChartLabel"
                :coloR="productChartColor"
              />
            </v-card>
          </v-col>
          <v-col cols="12" sm="5">
            <v-card elevation="12" class="pa-10">
              <v-subheader :inset="inset">
                --- User Spend Detail ---
              </v-subheader>
              <v-simple-table>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in productPaginatedData" :key="product">
                    <td>{{ product.productName }}</td>
                    <td>{{ product.amount }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
              <v-pagination
                :length="productPageCount"
                v-model="productPageNumber"
                circle
                @input="productNextPage"
              ></v-pagination>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import BarChart from "../../../components/admin/BarChart.vue";
import api from "../../../services/api";
import moment from "moment";

export default {
  name: "Sale",
  components: { BarChart },
  data: () => ({
    startTime: "",
    endTime: "",

    menu: false,
    modal: false,
    menu2: false,
    dialog: false,

    //user stat table
    userPageNumber: 1,
    userPageSize: 5,
    userStats: [],

    //user stat chart
    userLoaded: false,
    userAmount: [],
    userChartLabel: [],
    userChartColor: [],

    /**/ //////////////////////////////////////// */

    //product stat table
    productPageNumber: 1,
    productPageSize: 5,
    productStats: [],

    //product stat chart
    productLoaded: false,
    productAmount: [],
    productChartLabel: [],
    productChartColor: [],
  }),
  methods: {
    reloadWindow() {
      window.location.reload();
    },

    getDetail(item) {
      this.dialog = true;
      this.productLoaded = false;
      (this.productAmount = []),
        (this.productChartLabel = []),
        (this.productChartColor = []),
        this.getProductStat(item.userId);
    },

    mappingUserChart() {
      this.userAmount = this.userStats.map((user) => user.total);
      this.userChartLabel = this.userStats.map((user) => user.username);

      var dynamicColors = function () {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
      };

      for (var i in this.userChartLabel) {
        console.log(i);
        this.userChartColor.push(dynamicColors());
      }
      this.userLoaded = true;
    },

    userNextPage(page) {
      this.userPageNumber = page;
    },

    getAllUserStat() {
      api.get("/statistics/user").then((response) => {
        this.userStats = response.data;
        this.mappingUserChart();
      });
    },

    mappingProductChart() {
      this.productAmount = this.productStats.map((product) => product.amount);
      this.productChartLabel = this.productStats.map(
        (product) => product.productName
      );

      var dynamicColors = function () {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
      };

      for (var i in this.productChartLabel) {
        console.log(i);
        this.productChartColor.push(dynamicColors());
      }
      this.productLoaded = true;
    },

    productNextPage(page) {
      this.productPageNumber = page;
    },

    getProductStat(userId) {
      api
        .get("/statistics/product/user_id?userId=" + userId)
        .then((response) => {
          this.productStats = response.data;
          this.mappingProductChart();
        });
    },

    resetChart() {
      this.userLoaded = false;
      this.userAmount = [];
      this.userChartLabel = [];
      this.userChartColor = [];
    },

    getUserStatByTime() {
      this.resetChart();

      setTimeout(() => {
        var startTime = new Date(this.startTime);
        var endTime = new Date(this.endTime);
        let start = moment(startTime).format("YYYY-MM-DD HH:MM:SS");
        let end = moment(endTime).format("YYYY-MM-DD HH:MM:SS");

        api
          .get("/statistics/user_time?startTime=" + start + "&endTime=" + end)
          .then((response) => {
            this.userStats = response.data;
            this.mappingUserChart();
          });
      },1000)
    },
  },
  computed: {
    userPageCount() {
      let userStatsLength = this.userStats.length;
      let s = this.userPageSize;
      return Math.ceil(userStatsLength / s);
    },

    userPaginatedData() {
      const start = this.userPageNumber * this.userPageSize - this.userPageSize;
      const end = start + this.userPageSize;
      return this.userStats.slice(start, end);
    },

    productPageCount() {
      let productStatsLength = this.productStats.length;
      let s = this.productPageSize;
      return Math.ceil(productStatsLength / s);
    },

    productPaginatedData() {
      const start =
        this.productPageNumber * this.productPageSize - this.productPageSize;
      const end = start + this.productPageSize;
      return this.productStats.slice(start, end);
    },
  },
  mounted() {
    this.getAllUserStat();
  },
};
</script>

<style lang="scss" scoped>
</style>