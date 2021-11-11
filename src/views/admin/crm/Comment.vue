<template>
  <v-container fluid>
    <v-window v-model="step">
      <v-window-item :value="1">
        <h1 class="gray --text">Manage Comment</h1>
        <span>You can see detail of Comment</span>

        <v-row class="mt-4">
          <!-- <v-col cols="12" sm="3">
            <v-text-field label="Comment Product Search"> </v-text-field>
          </v-col> -->

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
            <v-btn color="green" class="white--text" @click="getCommentByTime">
              <v-icon>fas fa-search</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="1">
              <v-btn @click="reloadWindow" color="transparent" x-small>
                .
              </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" sm="12">
            <v-data-table
              :page="1"
              :pageCount="totalPages"
              :headers="headers"
              :items="comments"
              :options.sync="options"
              :server-items-length="totalItems"
              :loading="loading"
              class="elevation-1"
              ref="dataTable"
            >
              <template v-slot:item.action="{ item }">
                <v-btn color="blue" @click="replyComment(item)">
                  <v-icon>fas fa-reply</v-icon>
                </v-btn>
                <v-btn color="red" @click="deleteFeedback(item)">
                  <v-icon>fas fa-trash</v-icon>
                </v-btn>
              </template>
              ></v-data-table>
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item :value="2">
        <h1>{{ testValue.name }}</h1>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="4">
            <v-btn color="purple" class="white--text" @click="step -= 2"
              >Go back to comment manage</v-btn
            >
          </v-col>
        </v-row>
        <h1>Comment Detail</h1>
        <v-row>
          <v-col cols="12" sm="12">
            <v-card elevation="12" color="grey" class="pa-4">
              <v-card-title>Reply Comment</v-card-title>
              <v-text-field
                label="Content"
                type="text"
                prepend-icon="fas fa-users"
              />
              <v-checkbox label="Replied"/>
              <v-row>
                  <v-col cols="12" sm="3">
                      <v-btn color="green" class="white--text">Reply</v-btn>
                  </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
import api from "../../../services/api"
import moment from "moment";

export default {
  name: "Comment",
  components: {},
  data() {
    return {
      testValue: "",
      step: 1,
      startTime: null,
      endTime: null,

       //table
      page: 0,
      totalItems: 0,
      totalPages: 0,
      comments: [],
      loading: true,
      options: {},
      headers: [
        { text: "Id", value: "id" },
        { text: "User", value: "username" },
        { text: "Product", value: "productName" },
        { text: "Content", value: "content" },
        { text: "Time", value: "commentTime" },
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
        this.getAllComment();
      },
      deep: true,
    },
  },
  methods: {

    reloadWindow(){
      window.location.reload();
    },

    replyComment(value) {
      this.step = 2;
      this.testValue = value;
    },

    getAllComment(){
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get("/product/comment?pageNo=" + pageNumber + "&pageSize=" + itemsPerPage)
        .then((response) => {
          this.loading = false;
          this.comments = response.data.comments;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },

     getCommentByTime() {
      var startTime = new Date(this.startTime);
      var endTime = new Date(this.endTime);
      let start = moment(startTime).format("YYYY-MM-DD HH:MM:SS");
      let end = moment(endTime).format("YYYY-MM-DD HH:MM:SS");

      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get(
          "/product/comment/time?startTime=" +
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
          this.comments = response.data.comments;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },
  },
   mounted() {
    this.getAllComment();
  },
};
</script>

<style lang="scss" scoped></style>
