<template>
  <v-container fluid>
    <v-window v-model="step">
      <v-window-item :value="1">
        <h1 class="gray --text">Manage Review</h1>
        <span>You can see detail of Review</span>

        <v-row class="mt-4">
          <v-col cols="12" sm="3">
            <v-text-field label="Review Search"> </v-text-field>
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

          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
              <v-btn @click="getReviewByTime" color="green" class="white--text">
                  <v-icon>fas fa-search</v-icon>
              </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" sm="12">
            <v-data-table
              :page="1"
              :pageCount="totalPages"
              :headers="headers"
              :items="reviews"
              :options.sync="options"
              :server-items-length="totalItems"
              :loading="loading"
              class="elevation-1"
              ref="dataTable"
            >
              <template v-slot:item.starRating="{ item }">
                <star-rating v-model="item.starRating" read-only="true" show-rating="false" />
              </template>
              <template v-slot:item.action="{ item }">
                <v-btn color="red" @click="deleteReview(item)">
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
              >Go back to Review manage</v-btn
            >
          </v-col>
        </v-row>
        <h1>Review Detail</h1>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
import api from "../../../services/api"
import StarRating from "vue-star-rating"
import moment from "moment";

export default {
  name: "Review",
  components: {
    StarRating
  },
  data() {
    return {
      testValue: "",
      step: 1,
      items: ["ADMIN", "USER"],
      startTime: null,
      endTime: null,
      
      //table
      page: 0,
      totalItems: 0,
      totalPages: 0,
      reviews: [],
      loading: true,
      options: {},
      headers: [
        { text: "Id", value: "id" },
        { text: "Username", value: "username" },
        { text: "Product", value: "productName" },
        { text: "Star", value: "starRating" },
        { text: "Content", value: "content" },
        { text: "Action", value: "action" },
      ],
      
    };
  },
  watch: {
    options: {
      handler() {
        this.getAllReviews();
      },
      deep: true,
    },
  },
  props: {
    source: String,
  },
  methods: {
    handleClick(value) {
      this.step = 2;
      this.testValue = value;
    },

    getReviewByTime() {
      var startTime = new Date(this.startTime);
      var endTime = new Date(this.endTime);
      let start = moment(startTime).format("YYYY-MM-DD HH:MM:SS");
      let end = moment(endTime).format("YYYY-MM-DD HH:MM:SS");

      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get(
          "/product/review/time?startTime=" +
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
          this.reviews = response.data.reviews;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },

    getAllReviews() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get("/product/review?pageNo=" + pageNumber + "&pageSize=" + itemsPerPage)
        .then((response) => {
          this.loading = false;
          this.reviews = response.data.reviews;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },

    deleteReview(item){
      api.delete("/product/review/" + item.id)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error.response.data;
        })
    }
  },
  mounted() {
    this.getAllReviews();
  }
};
</script>

<style lang="scss" scoped></style>
