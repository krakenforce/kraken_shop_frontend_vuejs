<template>
  <v-container fluid>
    <h1>User Detail</h1>
    <v-row>
      <v-col cols="12" sm="8">
        <v-row>
          <v-col cols="12" sm="12" justify="center" align="center">
            <v-avatar color="blue" outline size="128">
              <v-img v-bind:src="user.avatarImageUrl"></v-img>
            </v-avatar>
            <v-badge color="green" bordered overlap icon="fas fa-plus">
            </v-badge>
            <h1>{{ user.username }}</h1>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="Email" readonly v-model="user.email" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="Phone" readonly v-model="user.phone" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              label="First Name"
              readonly
              v-model="user.firstName"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field label="Last Name" readonly v-model="user.lastName" />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              label="Identity No."
              readonly
              v-model="user.identityNumber"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-radio-group readonly row v-model="user.gender">
              <v-radio
                v-for="gender in genderGroup"
                :key="gender.text"
                :label="gender.text"
                :value="gender.value"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="Address" readonly v-model="user.address" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="Job" readonly v-model="user.job" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-radio-group readonly row v-model="user.marriageStatus">
              <v-radio
                v-for="status in marriageStatusGroup"
                :key="status.text"
                :label="status.text"
                :value="status.value"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col cols="12" sm="4">
        <v-row class="ml-4">
          <v-col cols="12" sm="12">
            <v-card elevation="12">
              <v-card-title>Wallet</v-card-title>
              <v-card-subtitle>Balance:</v-card-subtitle>
              <v-card-text class="blue--text">
                <b>{{ user.walletBalance }} &#36;</b>
              </v-card-text>
              <v-card-actions>
                <v-btn color="blue" @click.stop="walletDialog = true">
                  <v-icon>fas fa-plus</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="ma-4">
          <v-card elevation="12">
            <v-card-title>Favorite Product</v-card-title>

            <v-data-table
              class="elevation-1"
              :headers="headers"
              :items-per-page="5"
            >
              <template>
                <thead>
                  <tr>
                    <th class="text-left">Product Id</th>
                    <th class="text-left">Product Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in products" :key="item.productId">
                    <td>{{ item.productId }}</td>
                    <td>{{ item.name }}</td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12">
        <v-expansion-panels>
          <v-expansion-panel @click="getOrderByUser(1)">
            <v-expansion-panel-header>
              User Order List
            </v-expansion-panel-header>
            <v-expansion-panel-content>
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
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel @click="getCommentByUser(1)">
            <v-expansion-panel-header>
              User Comment List
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
                :headers="commentHeader"
                :items="comments"
                :page.sync="commentPage"
                hide-default-footer=""
              >
              </v-data-table>
              <v-pagination
                v-model="commentPage"
                :length="commentTotalPages"
                circle
                @input="getCommentByUser"
              ></v-pagination>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel @click="getReviewByUser(1)">
            <v-expansion-panel-header>
              User Review List
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
                :headers="reviewHeader"
                :items="reviews"
                :page.sync="reviewPage"
                hide-default-footer=""
              >
                <template v-slot:item.starRating="{ item }">
                  <star-rating
                    v-model="item.starRating"
                    :read-only="true"
                    :show-rating="false"
                    :star-size="15"
                  />
                </template>
              </v-data-table>
              <v-pagination
                v-model="reviewPage"
                :length="reviewTotalPages"
                circle
                @input="getReviewByUser"
              ></v-pagination>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <v-dialog v-model="walletDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">
          Recharge for users: {{ user.username }}
        </v-card-title>

        <v-card-text>
          <v-text-field type="number" dense label="Amount" v-model="amount">
          </v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="topUpUser"> TOP UP </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="orderDetailDialog">
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
import api from "../../services/api";
import StarRating from "vue-star-rating";

export default {
  name: "UserDetail",
  props: {
    user: {},
  },
  components: {
    StarRating,
  },
  data() {
    return {
      walletDialog: false,
      orderDetailDialog: false,
      amount: "",
      genderGroup: [
        { text: "Male", value: "MALE" },
        { text: "Female", value: "FEMALE" },
        { text: "Other", value: "OTHER" },
      ],
      marriageStatusGroup: [
        { text: "Married", value: true },
        { text: "Single", value: false },
      ],

      //favorite product
      products: [],
      headers: [
        { text: "Product Id", value: "productId" },
        { text: "Product Name", value: "name" },
      ],

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

      //comment table
      commentPage: 1,
      commentItemPerPage: 0,
      commentTotalPages: 0,
      comments: [],
      commentHeader: [
        { text: "Id", value: "id" },
        { text: "Product", value: "productName" },
        { text: "Content", value: "content" },
        { text: "Time", value: "commentTime" },
      ],

      //review TABLE
      reviewPage: 1,
      reviewItemPerPage: 0,
      reviewTotalPages: 0,
      reviews: [],
      reviewHeader: [
        { text: "Id", value: "id" },
        { text: "Product", value: "productName" },
        { text: "Star", value: "starRating" },
        { text: "Content", value: "content" },
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
    };
  },
  methods: {
    test() {
      alert("hello");
    },

    topUpUser() {
      this.walletDialog = false;
      let walletId = this.user.walletId;
      let amount = this.amount;

      api
        .put("/wallet/top_up_user?walletId=" + walletId + "&amount=" + amount)
        .then((response) => {
          alert(response.data.message);
          window.location.reload();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },

    getFavoriteProduct() {
      let userId = this.user.userId;
      api
        .get("/favorite/" + userId)
        .then((response) => {
          this.product = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          Promise.reject(error);
        });
    },

    getOrderByUser(page) {
      let walletId = this.user.walletId;
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

    getCommentByUser(page) {
      let userId = this.user.userId;
      let pageNo = page - 1;
      api
        .get("/user/comment/" + userId + "?pageNo=" + pageNo)
        .then((response) => {
          this.comments = response.data.comments;
          this.commentTotalPages = response.data.totalPages;
        })
        .catch((error) => {
          Promise.reject(error);
        });
    },

    getReviewByUser(page) {
      let userId = this.user.userId;
      let pageNo = page - 1;
      api
        .get("/product/review/user/" + userId + "?pageNo=" + pageNo)
        .then((response) => {
          this.reviews = response.data.reviews;
          this.reviewTotalPages = response.data.totalPages;
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
      this.orderDetailDialog = true;
      this.getOrderDetail(item);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>