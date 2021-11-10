<template>
  <v-container>
    <h1>Product Statistics</h1>
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
        <v-btn @click="getStatByTime" color="green" class="white--text">
          <v-icon>fas fa-search</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" sm="1">
        <v-btn color="transparent" x-small="true" @click="reloadWindow()"
          >.
        </v-btn>
      </v-col>
    </v-row>

    <!-- PRODUCT SALE  -->
    <v-row>
      <v-col cols="12" sm="7">
        <v-card elevation="12" class="pa-10" height="100%">
          <v-subheader :inset="inset"> --- Product Sales --- </v-subheader>
          <BarChart
            v-if="productLoaded"
            :chartData="productAmount"
            :chartLabels="productChartLabel"
            :coloR="productChartColor"
          />
        </v-card>
      </v-col>
      <v-col cols="12" sm="5">
        <v-card elevation="12" height="100%">
          <v-subheader :inset="inset"
            >--- Number of Product Sale by day ---
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
          <v-btn class="white--text ma-4" color="blue">
            <v-icon> fas fa-print </v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- CATEGORY SALE -->
    <v-row>
      <v-col cols="12" sm="5">
        <v-card elevation="12" height="100%">
          <v-subheader :inset="inset"
            >--- Number of Category Sale by day ---
          </v-subheader>
          <v-simple-table>
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="category in categoryPaginatedData" :key="category">
                <td>{{ category.categoryName }}</td>
                <td>{{ category.amount }}</td>
              </tr>
            </tbody>
          </v-simple-table>
          <v-pagination
            :length="categoryPageCount"
            v-model="categoryPageNumber"
            circle
            @input="categoryNextPage"
          ></v-pagination>
          <v-btn class="white--text ma-4" color="blue">
            <v-icon> fas fa-print </v-icon>
          </v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" sm="7">
        <v-card elevation="12" class="pa-10" height="100%">
          <v-subheader :inset="inset"> --- Category Sales --- </v-subheader>
          <BarChart
            v-if="categoryLoaded"
            :chartData="categoryAmount"
            :chartLabels="categoryChartLabel"
            :coloR="categoryChartColor"
          />
        </v-card>
      </v-col>
    </v-row>

    <!-- TAG SALE  -->
    <v-row>
      <v-col cols="12" sm="7">
        <v-card elevation="12" class="pa-10" height="100%">
          <v-subheader :inset="inset"> --- Tag Sales --- </v-subheader>
          <BarChart
            v-if="tagLoaded"
            :chartData="tagAmount"
            :chartLabels="tagChartLabel"
            :coloR="tagChartColor"
          />
        </v-card>
      </v-col>
      <v-col cols="12" sm="5">
        <v-card elevation="12" height="100%">
          <v-subheader :inset="inset"
            >--- Number of Product Sale by day ---
          </v-subheader>
          <v-simple-table>
            <thead>
              <tr>
                <th>Tag Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tag in tagPaginatedData" :key="tag">
                <td>{{ tag.tagName }}</td>
                <td>{{ tag.amount }}</td>
              </tr>
            </tbody>
          </v-simple-table>
          <v-pagination
            :length="tagPageCount"
            v-model="tagPageNumber"
            circle
            @input="tagNextPage"
          ></v-pagination>
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
import BarChart from "../../../components/admin/BarChart.vue";
import moment from "moment";

export default {
  name: "Product",
  components: {
    BarChart,
  },
  data: () => ({
    startTime: "",
    endTime: "",

    menu: false,
    modal: false,
    menu2: false,

    //product stat table
    productPageNumber: 1,
    productPageSize: 5,
    productStats: [],

    //product stat chart
    productLoaded: false,
    productAmount: [],
    productChartLabel: [],
    productChartColor: [],

    /** ////////////////////////////////////////////////////////// */

    //category stat table
    categoryPageNumber: 1,
    categoryPageSize: 5,
    categoryStats: [],

    //category stat chart
    categoryLoaded: false,
    categoryAmount: [],
    categoryChartLabel: [],
    categoryChartColor: [],

    /** ////////////////////////////////////////////////////////// */

    //tag stat table
    tagPageNumber: 1,
    tagPageSize: 5,
    tagStats: [],

    //tag stat chart
    tagLoaded: false,
    tagAmount: [],
    tagChartLabel: [],
    tagChartColor: [],
  }),
  watch: {
    
  },
  methods: {
    reloadWindow() {
      window.location.reload();
    },

    getStatByTime() {
      var startTime = new Date(this.startTime);
      var endTime = new Date(this.endTime);
      let start = moment(startTime).format("YYYY-MM-DD HH:MM:SS");
      let end = moment(endTime).format("YYYY-MM-DD HH:MM:SS");
      this.getProductStatByTime(start, end);
      this.getCategoryStatByTime(start, end);
      this.getTagStatByTime(start, end);
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

    productNextPage(page) {
      this.productPageNumber = page;
    },

    categoryNextPage(page) {
      this.categoryPageNumber = page;
    },

    tagNextPage(page) {
      this.tagPageNumber = page;
    },

    getAllProductStat() {
      api.get("/statistics/product").then((response) => {
        this.productStats = response.data;
        this.mappingProductChart();
      });
    },

    getProductStatByTime(start, end) {
      api
        .get("/statistics/product_time?startTime=" + start + "&endTime=" + end)
        .then((response) => {
          this.productStats = response.data;
          this.mappingProductChart();
        });
    },

    getAllCategoryStat() {
      api.get("/statistics/category").then((response) => {
        this.categoryStats = response.data;
        this.mappingCategoryChart();
      });
    },

    getCategoryStatByTime(start, end) {
      api
        .get("/statistics/category_time?startTime=" + start + "&endTime=" + end)
        .then((response) => {
          this.categoryStats = response.data;
          this.mappingCategoryChart();
        });
    },

    getAllTagStat() {
      api.get("/statistics/tag").then((response) => {
        this.tagStats = response.data;
        this.mappingTagChart();
      });
    },

    getTagStatByTime(start, end) {
      api
        .get("/statistics/tag_time?startTime=" + start + "&endTime=" + end)
        .then((response) => {
          this.tagStats = response.data;
          this.mappingTagChart();
        });
    },
  },
  computed: {
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

    categoryPageCount() {
      let categoryStatsLength = this.categoryStats.length;
      let s = this.categoryPageSize;
      return Math.ceil(categoryStatsLength / s);
    },

    categoryPaginatedData() {
      const start =
        this.categoryPageNumber * this.categoryPageSize - this.categoryPageSize;
      const end = start + this.categoryPageSize;
      return this.categoryStats.slice(start, end);
    },

    tagPageCount() {
      let tagStatsLength = this.tagStats.length;
      let s = this.tagPageSize;
      return Math.ceil(tagStatsLength / s);
    },

    tagPaginatedData() {
      const start = this.tagPageNumber * this.tagPageSize - this.tagPageSize;
      const end = start + this.tagPageSize;
      return this.tagStats.slice(start, end);
    },
  },
  mounted() {
    this.getAllProductStat();
    this.getAllCategoryStat();
    this.getAllTagStat();
  },
};
</script>

<style lang="scss" scoped>
</style>