<template>
  <v-container fluid>
    <v-window v-model="step">
      <v-window-item :value="1">
        <h1 class="gray --text">Manage Payment</h1>
        <span>You can see detail of payment</span>

        <v-row class="mt-4">
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

          <v-col cols="12" sm="3">
            <v-combobox
              placeholder="Select Type to Search"
              outlined
              dense
              :items="items"
              @change="searchByProvider"
            ></v-combobox>
          </v-col>

          <v-col cols="12" sm="1">
            <v-btn @click="getPaymentByTime" color="green" class="white--text">
              <v-icon>fas fa-search</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="1">
            <v-btn color="transparent" x-small="true" @click="reloadWindow()">
            </v-btn>
          </v-col>
        </v-row>


        <v-row class="mt-4">
          <v-col cols="12" sm="12">
            <v-data-table
              :page="1"
              :pageCount="totalPages"
              :headers="headers"
              :items="payments"
              :options.sync="options"
              :server-items-length="totalItems"
              :loading="loading"
              class="elevation-1"
              ref="dataTable"
            >
              <template v-slot:item.action="{ item }">
                <v-btn color="green" @click="getDetail(item)">
                  <v-icon>fas fa-info-circle</v-icon>
                </v-btn>
                <v-btn color="primary" @click="updateBanner(item)">
                  <v-icon>fas fa-edit</v-icon>
                </v-btn>
                <v-btn color="red" @click="deleteBanner(item)">
                  <v-icon>fas fa-trash</v-icon>
                </v-btn>
              </template>
              ></v-data-table
            >
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item :value="2">
        <h1>{{ testValue.name }}</h1>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="4">
            <v-btn color="purple" class="white--text" @click="step -= 2"
              >Go back to Payment manage</v-btn
            >
          </v-col>
        </v-row>
        <h1>Payment Detail</h1>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
import moment from "moment";
import api from "../../../services/api";

export default {
  name: "Payment",
  components: {},
  data() {
    return {
      testValue: "",
      step: 1,
      items: ["PAYPAL", "BANK", "PURCHASE", "ADMINTOPUP"],
      startTime: null,
      endTime: null,

      //table
      page: 0,
      totalItems: 0,
      totalPages: 0,
      payments: [],
      loading: true,
      options: {},
      headers: [
        { text: "Id", value: "id" },
        { text: "Datetime", value: "createdAt" },
        { text: "Total", value: "totalPrice" },
        { text: "Provider", value: "provider" },
        { text: "Action", value: "action" },
      ],
    };
  },
  props: {
    source: String,
  },
  watch: {
    options: {
      handler() {
        this.getAllPayments();
      },
      deep: true,
    },
  },
  methods: {
    reloadWindow(){
      window.location.reload();
    },

    handleClick(value) {
      this.step = 2;
      this.testValue = value;
    },

    searchByProvider(item) {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get(
          "/payment/search_provider?provider=" +
            item +
            "&pageNo=" +
            pageNumber +
            "&pageSize=" +
            itemsPerPage
        )
        .then((response) => {
          this.loading = false;
          this.payments = response.data.payments;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },

    getAllPayments() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get("/payment?pageNo=" + pageNumber + "&pageSize=" + itemsPerPage)
        .then((response) => {
          this.loading = false;
          this.payments = response.data.payments;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },

    getPaymentByTime() {
      var startTime = new Date(this.startTime);
      var endTime = new Date(this.endTime);
      let start = moment(startTime).format("YYYY-MM-DD HH:MM:SS");
      let end = moment(endTime).format("YYYY-MM-DD HH:MM:SS");

      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get(
          "/payment/search_time?startTime=" +
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
          this.payments = response.data.payments;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },
  },
  mounted() {
    this.getAllPayments();
  },
};
</script>

<style lang="scss" scoped></style>
