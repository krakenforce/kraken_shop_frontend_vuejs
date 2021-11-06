<template>
  <v-container>
    <v-window v-model="step" vertical>
      <v-window-item :value="1">
        <h1 class="gray --text">Manage Sale Promote</h1>
        <span>Add or update Sale promote for homepage</span>

        <v-row class="mt-4">
          <v-col cols="12" sm="3">
            <v-text-field
              label="Sale Promote Search"
              v-model="searchKeyword"
              @input="getSalePromoteByName()"
            />
          </v-col>

          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-btn color="green" class="white--text" @click="step++">
              Add sale promote
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" sm="12">
            <v-data-table
              :page="1"
              :pageCount="totalPages"
              :headers="headers"
              :items="salePromotes"
              :options.sync="options"
              :server-items-length="totalItems"
              :loading="loading"
              class="elevation-1"
              ref="dataTable"
            >
              <template v-slot:item.action="{ item }">
                <v-btn color="primary" @click="updateSalePromote(item)">
                  <v-icon>fas fa-edit</v-icon>
                </v-btn>
                <v-btn color="red" @click="deleteSalePromote(item)">
                  <v-icon>fas fa-trash</v-icon>
                </v-btn>
              </template>
              ></v-data-table
            >
          </v-col>
        </v-row>
      </v-window-item>
      <v-window-item :value="2">
        <h1 class="gray --text">Add New Sale Promote</h1>

        <v-row class="mt-4">
          <v-col cols="12" sm="3">
            <v-btn color="blue" class="white--text" @click="step--">
              BACK TO sale promote MANAGE
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" sm="12">
            <v-alert :type="alertMessage.type" v-if="alertMessage">{{
              alertMessage.content
            }}</v-alert>
            <v-form @submit.prevent="createSalePromote()">
              <v-text-field
                name="id"
                label="label"
                v-show="false"
                v-model="salePromote.id"
              ></v-text-field>

              <v-text-field
                label="Title"
                required="true"
                v-model="salePromote.title"
              ></v-text-field>

              <v-text-field
                label="Content Url"
                required="true"
                v-model="salePromote.contentUrl"
              ></v-text-field>

              <v-checkbox
                label="Status"
                v-model="salePromote.status"
              ></v-checkbox>

              <v-btn color="green" type="submit" class="white--text"
                >Add Banner</v-btn
              >
            </v-form>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
    <v-dialog v-model="dialog.status" width="400">
      <v-card>
        <v-card-title class="text-h5 grey"> Notification </v-card-title>

        <v-card-text>
          {{ dialog.message }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="reloadWindow()"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import api from "../../../services/api";
export default {
  name: "SalePromote",
  data() {
    return {
      step: 1,
      searchKeyword: "",
      dialog: {
        status: false,
        message: "",
      },

      alertMessage: {
        type: "",
        content: "",
      },

      //tag model
      salePromote: {
        id: "",
        title: "",
        contentUrl: "",
        status: "",
      },

      //table
      page: 0,
      totalItems: 0,
      totalPages: 0,
      salePromotes: [],
      loading: true,
      options: {},
      headers: [
        { text: "Id", value: "id" },
        { text: "Title", value: "title" },
        { text: "Content Url", value: "contentUrl" },
        { text: "Action", value: "action" },
      ],
    };
  },
  watch: {
    options: {
      handler() {
        this.getAllSalePromote();
      },
      deep: true,
    },
  },
  methods: {
    reloadWindow() {
      window.location.reload();
    },

    createSalePromote() {
      if (this.salePromote.title === "") {
        this.alertMessage.type = "error";
        this.alertMessage.content = "Please enter info";
      } else {
        api
          .post("/banner/sale_promote", this.salePromote)
          .then((response) => {
            console.log(response.data);
            this.alertMessage.type = "success";
            this.alertMessage.content = "Save Sale Promote Success";
            window.location.reload();
          })
          .catch((error) => {
            Promise.reject(error);
            this.alertMessage.type = "error";
            this.alertMessage.content = "Save Sale Promote Fail";
          });
      }
    },
    deleteSalePromote(item) {
      api
        .delete("/banner/sale_promote/" + item.id)
        .then((response) => {
          this.dialog.status = true;
          this.dialog.message = response.data.message;
        })
        .catch((error) => {
          this.dialog.status = true;
          this.dialog.message = error.response.data.message;
        });
    },

    updateSalePromote(item) {
      this.salePromote = item;
      this.step = 2;
    },

    getAllSalePromote() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get("/banner/sale_promote?pageNo=" + pageNumber + "&pageSize=" + itemsPerPage)
        .then((response) => {
          this.loading = false;
          this.salePromotes = response.data.salePromotes;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },
    getSalePromoteByName() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get(
          "/banner/sale_promote/search?keyword=" +
            this.searchKeyword +
            "&pageNo=" +
            pageNumber +
            "&pageSize=" +
            itemsPerPage
        )
        .then((response) => {
          this.loading = false;
          this.salePromotes = response.data.salePromotes;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },
  },
  mounted() {
    this.getAllSalePromote();
  },
};
</script>

<style lang="scss" scoped>
</style>