<template>
  <v-container>
    <v-window v-model="step" vertical>
      <v-window-item :value="1">
        <h1 class="gray --text">Manage Vip Users</h1>
        <span
          >Add vip status or update the existing users. You can see their detail
          info</span
        >

        <v-row class="mt-4">
          <!-- <v-col cols="12" sm="3">
            <v-text-field label="User Search" />
          </v-col>
          <v-col cols="12" sm="3">
            <v-combobox
              placeholder="Select Vip Class to Search"
              outlined
              dense
              :items="vipClasses"
            ></v-combobox>
          </v-col> -->

          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-btn color="green" class="white--text" @click="step++">
              USER VIP REQUEST
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" sm="12">
            <v-data-table
              :page="1"
              :pageCount="totalPages"
              :items="vipUserClasses"
              :options.sync="options"
              :server-items-length="totalItems"
              :loading="loading"
              class="elevation-1"
              :headers="headers"
              @click:row="clickOnRow"
            ></v-data-table>
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item :value="2">
        <v-container class="pa-5">
          <v-row>
            <v-btn @click="step--" color="red">
              Return to Vip Class Manage
            </v-btn>
            <v-col cols="12" sm="12">
              <v-card elevation="12" class="pa-10">
                <v-subheader :inset="inset">
                  --- User Spend Detail ---
                </v-subheader>
                <v-simple-table>
                  <thead>
                    <tr>
                      <th>User Id</th>
                      <th>Username</th>
                      <th>Total Spend</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in userPaginatedData" :key="user">
                      <td>{{ user.userId }}</td>
                      <td>{{ user.username }}</td>
                      <td>{{ user.total }}</td>
                      <td>
                        <v-btn color="blue" @click="addVip(user)">
                          <v-icon>fas fa-arrow-circle-up</v-icon>
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
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>

      <v-window-item :value="3">
        <h1 class="gray --text">
          User of Vip Class: {{ this.vipClass.className }}
        </h1>

        <v-row class="mt-4">
          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-btn color="blue" class="white--text" @click="step-=2">
              BACK TO VIP MANAGE
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" sm="12">
            <v-data-table
              :page="1"
              :pageCount="totalPages"
              :headers="userHeader"
              :items="users"
              :options.sync="options"
              :server-items-length="totalItems"
              :loading="loading"
              class="elevation-1"
            >
              <template v-slot:item.action="{ item }">
                <v-btn color="green" @click="clickOnTableRow(item)">
                  <v-icon>fas fa-info-circle</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>

    <v-dialog v-model="dialog" max-width="500" v-if="user">
      <v-card>
        <v-card-title class="text-h5">
          Current User Vip Class: {{ user.username }} - {{ user.vipClassName }}
        </v-card-title>
        <v-card-title class="text-h5">
          Current Discount Percentage: {{user.discountPercentage}}
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-select
            :items="vipUserClasses"
            item-text="className"
            item-value="id"
            v-model="selectedClass"
            label="Select class"
            outlined
          ></v-select>

          <v-btn color="green darken-1" text @click="updateVipClassToUser">
            UPDATE
          </v-btn>

          <v-btn color="red" text @click="dialog = false"> CLOSE </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import api from "../../../services/api";
export default {
  name: "VipUser",
  data() {
    return {
      dialog: false,
      step: 1,
      user: null,
      selectedClass: "",

      vipClass: {
        id: "",
        className: "",
      },

      //user stat table
      userPageNumber: 1,
      userPageSize: 5,
      userStats: [],

      //table
      page: 0,
      totalItems: 0,
      totalPages: 0,
      vipUserClasses: [],
      users: [],
      loading: true,
      options: {},
      headers: [
        { text: "ID", value: "id" },
        { text: "Class name", value: "className" },
        { text: "Discount Percentage", value: "discountPercentage" },
        { text: "Status", value: "status" },
      ],
      userHeader: [
        { text: "ID", value: "userId" },
        { text: "Username", value: "username" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "Action", value: "action" },
      ],
    };
  },

  watch: {
    options: {
      handler() {
        this.getAllUserFromAPI();
      },
    },
    deep: true,
  },

  methods: {
    clickOnRow(item) {
      this.vipClass = item;
      this.getUserByVipClass(item.id);
      this.step = 3;
    },

    getAllUserVipClass() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;
      api
        .get("/user_vip?pageNo=" + pageNumber + "&pageSize=" + itemsPerPage)
        .then((response) => {
          this.loading = false;
          this.vipUserClasses = response.data.userVipClasses;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },

    addVip(item) {
      this.dialog = true;
      this.getUserById(item.userId);
    },

    updateVipClassToUser(){
      let vipId = this.selectedClass;
      let userId = this.user.userId;

      api.put('/user_vip?userId=' + userId + '&vipClassId=' + vipId)
      .then((response) => {
        alert(response.data.message)
        window.location.reload();
      })
      .catch((error) => {
        Promise.reject(error);
        alert(error.response.data.message);
      })
    },

    getUserById(userId) {
      api
        .get("/user/" + userId)
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          Promise.reject(error);
        });
    },

    getAllUserStat() {
      api.get("/statistics/user").then((response) => {
        this.userStats = response.data;
      });
    },

    getUserByVipClass(vipClassId) {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;
      api
        .get(
          "/user_vip/" +
            vipClassId +
            "?pageNo=" +
            pageNumber +
            "&pageSize=" +
            itemsPerPage
        )
        .then((response) => {
          this.loading = false;
          this.users = response.data.users;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },

    getUserByUsername() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;
      let searchKeyword = this.searchKeyword;

      api
        .get(
          "/user/search-username?username=" +
            searchKeyword +
            "&pageNo=" +
            pageNumber +
            "&pageSize=" +
            itemsPerPage
        )
        .then((response) => {
          this.loading = false;
          this.users = response.data.users;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
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
  },
  mounted() {
    this.getAllUserVipClass();
    this.getAllUserStat();
  },
};
</script>

<style lang="scss" scoped>
</style>