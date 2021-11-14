<template>
  <v-container fluid>
    <v-window v-model="step">
      <v-window-item :value="1">
        <h1 class="gray --text">Manage Transaction</h1>
        <span>You can see detail of orders</span>

        <v-row class="mt-4">
          <v-col cols="12" sm="3">
            <v-text-field label="Transaction Search" v-model="searchKeyword" @input="getTransactionByKeyword"> </v-text-field>
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
            <v-btn
              @click="getTransactionsByTime"
              color="green"
              class="white--text"
            >
              <v-icon>fas fa-search</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="1">
            <v-btn color="transparent" x-small="true" @click="reloadWindow()">.
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" sm="12">
            <v-data-table
              :page="1"
              :pageCount="totalPages"
              :headers="headers"
              :items="transactions"
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

      <v-window-item :value="2">
        <h1>{{ testValue.name }}</h1>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-btn color="purple" class="white--text" @click="step -= 2"
              >Go back to Transaction manage</v-btn
            >
          </v-col>
        </v-row>
        <h1>Transaction Detail</h1>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
import moment from "moment";
import api from "../../../services/api";

export default {
  name: "Transaction",
  components: {},
  data() {
    return {
      testValue: "",
      step: 1,
      items: ["ADMIN", "USER"],
      searchKeyword: "",
      startTime: null,
      endTime: null,

      //table
      page: 0,
      totalItems: 0,
      totalPages: 0,
      transactions: [],
      loading: true,
      options: {},
      headers: [
        { text: "Id", value: "id" },
        { text: "Payment Id", value: "paymentId" },
        { text: "Description", value: "description" },
        { text: "Total", value: "total" },
        { text: "Created at", value: "createdAt" },
      ],
    };
  },
  props: {
    source: String,
  },
  watch: {
    options: {
      handler() {
        this.getAllTransactions();
      },
      deep: true,
    },
  },
  methods: {
    handleClick(value) {
      this.step = 2;
      this.testValue = value;
    },

    reloadWindow() {
      window.location.reload();
    },

    getAllTransactions() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get("/payment/transactions?pageNo=" + pageNumber + "&pageSize=" + itemsPerPage)
        .then((response) => {
          this.loading = false;
          this.transactions = response.data.transactions;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },

    getTransactionByKeyword(){
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;
      let keyword = this.searchKeyword;

      api
        .get("/payment/transactions/search_keyword?keyword=" + keyword + "&pageNo=" + pageNumber + "&pageSize=" + itemsPerPage)
        .then((response) => {
          this.loading = false;
          this.transactions = response.data.transactions;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });

    },

    getTransactionsByTime() {
      var startTime = new Date(this.startTime);
      var endTime = new Date(this.endTime);
      let start = moment(startTime).format("YYYY-MM-DD HH:MM:SS");
      let end = moment(endTime).format("YYYY-MM-DD HH:MM:SS");

      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get(
          "/payment/transactions/search_time?startTime=" +
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
          this.transactions = response.data.transactions;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },
  },
  mounted() {
    this.getAllTransactions();
  },
};
</script>

<style lang="scss" scoped></style>
