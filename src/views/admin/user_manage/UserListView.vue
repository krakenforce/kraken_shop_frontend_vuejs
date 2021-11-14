<template>
  <v-container fluid>
    <v-window v-model="step">
      <v-window-item :value="1">
        <h1 class="gray --text">Manage Users</h1>
        <span
          >Create new users or update the existing users. You can see their
          detail info</span
        >

        <v-row class="mt-4">
          <v-col cols="12" sm="3">
            <v-text-field
              label="User Search"
              @input="getUserByUsername()"
              v-model="searchKeyword"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-combobox
              placeholder="Select Role to Search"
              outlined
              dense
              :items="roleList"
              @change="searchUserByRole"
            ></v-combobox>
          </v-col>
          <v-col cols="12" sm="1">
            <v-btn color="transparent" x-small="true" @click="reloadWindow()">.
            </v-btn>
          </v-col>

          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-btn color="green" class="white--text" @click="step++">
              <v-icon>fas fa-plus</v-icon>
              ADD A NEW USER
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-dialog v-model="dialog" width="500">
            <v-card>
              <v-card-title class="text-h5"> Delete Confirm </v-card-title>

              <v-card-text>
                Do you really want to delete this user
                {{ selectedUser.username }}
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  I accept
                </v-btn>
                <v-btn color="red" text @click="dialog = false"> Cancel </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-col cols="12" sm="12">
            <v-data-table
              :page="1"
              :pageCount="totalPages"
              :headers="headers"
              :items="users"
              :options.sync="options"
              :server-items-length="totalItems"
              :loading="loading"
              class="elevation-1"
              v-model="selectedUser"
            >
              <template v-slot:item.action="{ item }">
                <v-btn color="green" @click="clickOnTableRow(item)">
                  <v-icon>fas fa-info-circle</v-icon>
                </v-btn>
                <v-btn color="primary" @click="onButtonClick(item)">
                  <v-icon>fas fa-edit</v-icon>
                </v-btn>
                <v-btn color="red" @click="onButtonClick()">
                  <v-icon>fas fa-trash</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item :value="2">
        <h1>ADD NEW USER</h1>
        <v-btn color="blue" class="white--text" @click="step--"
          >Go back to user manage</v-btn
        >
        <div>
          <v-container>
            <v-card elevation="15" class="pa-10">
              <v-alert :type="alertMessage.type" v-if="alertMessage">{{
                alertMessage.content
              }}</v-alert>
              <v-text-field
                placeholder="Username"
                label="Username"
                type="text"
                prepend-icon="fas fa-user"
                required
                clearable
                v-model="userAddRequest.username"
              />

              <v-text-field
                placeholder="Email"
                label="Email"
                type="email"
                prepend-icon="fas fa-user"
                clearable
                v-model="userAddRequest.email"
              />

              <v-text-field
                placeholder="Password"
                label="Password"
                type="text"
                prepend-icon="fas fa-user"
                clearable
                v-model="userAddRequest.password"
              />
              <v-select
                prepend-icon="fas fa-user"
                v-model="userAddRequest.role"
                :items="roleList"
                :menu-props="{ maxHeight: '400' }"
                label="Select Role for User"
                multiple
                hint="Pick account role"
                persistent-hint
              ></v-select>

              <v-row>
                <v-spacer></v-spacer>
                <v-col cols="12" sm="3">
                  <v-btn @click="createUser()" color="green" class="white--text"
                    >Create User</v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </div>
      </v-window-item>

      <v-window-item :value="3">
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-btn color="purple" class="white--text" @click="step -= 2"
              >Go back to user manage</v-btn
            >
          </v-col>
        </v-row>
        <UserDetail :user="selectedUser" ref="userDetail" />
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
import UserDetail from "../../../components/admin/UserDetail.vue";
import api from "../../../services/api";

export default {
  name: "UserListView",
  components: {
    UserDetail,
  },
  data() {
    return {
      dialog: false,
      searchKeyword: "",
      selectedUser: [],
      step: 1,
      roleList: [
        { text: "ADMIN", value: "ROLE_ADMIN" },
        { text: "MODERATOR", value: "ROLE_MODERATOR" },
        { text: "USER", value: "ROLE_USER" },
      ],

      alertMessage: {
        type: "",
        content: "",
      },

      userAddRequest: {
        username: "",
        email: "",
        password: "",
        role: [],
      },

      //user list to table
      page: 0,
      totalItems: 0,
      totalPages: 0,
      users: [],
      loading: true,
      options: {},
      headers: [
        { text: "ID", value: "userId" },
        { text: "Username", value: "username" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "Action", value: "action" },
      ],
    };
  },

  //this one will populate new data set when user changes current page.
  watch: {
    options: {
      handler() {
        this.getAllUserFromAPI();
      },
    },
    deep: true,
  },

  props: {
    source: String,
  },

  computed: {},

  methods: {
    reloadWindow() {
      window.location.reload();
    },

    searchUserByRole(item) {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get(
          "/user/search-role?keyword=" +
            item.value +
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

    clickOnTableRow(item) {
      this.selectedUser = item;
      this.step = 3;
      
    },

    onButtonClick() {
      this.dialog = true;
    },

    changeCombobox(value) {
      console.log(value);
    },

    createUser() {

      api
        .post("/auth/signup", {
          username: this.userAddRequest.username,
          email: this.userAddRequest.email,
          password: this.userAddRequest.password,
          role: this.userAddRequest.role,
        })
        .then((response) => {
          this.alertMessage.content = response.data.message;
          this.alertMessage.type = "success";
        })
        .catch((error) => {
          Promise.reject(error);
          this.alertMessage.content = error.response.data.message;
          this.alertMessage.type = "error";
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

    getAllUserFromAPI() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get("/user/?pageNo=" + pageNumber + "&pageSize=" + itemsPerPage)
        .then((response) => {
          this.loading = false;
          this.users = response.data.users;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },
  },
  mounted() {
    this.getAllUserFromAPI();
  },
};
</script>

<style lang="scss" scoped></style>
