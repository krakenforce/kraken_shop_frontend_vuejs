<template>
  <v-container fluid>
    <v-window v-model="step">
      <v-window-item :value="1">
        <h1 class="gray --text">Manage Service Pack</h1>
        <span
          >Create new product Service Pack or update the existing ones. You can
          see their detail info</span
        >

        <v-row class="mt-4">
          <v-col cols="12" sm="3">
            <v-text-field
              label="Service Pack Search"
              v-model="searchKeyword"
              @input="getServicePackByName()"
            >
            </v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-btn color="green" class="white--text" @click="step++">
              <v-icon>fas fa-plus</v-icon>
              ADD A NEW SERVICE PACK
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" sm="12">
            <v-data-table
              :page="1"
              :pageCount="totalPages"
              :headers="headers"
              :items="productServicePacks"
              :options.sync="options"
              :server-items-length="totalItems"
              :loading="loading"
              class="elevation-1"
              ref="dataTable"
            >
              <template v-slot:item.action="{ item }">
                <v-btn color="primary" @click="updateServicePack(item)">
                  <v-icon>fas fa-edit</v-icon>
                </v-btn>
                <v-btn color="red" @click="deleteServicePack(item)">
                  <v-icon>fas fa-trash</v-icon>
                </v-btn>
              </template>
              ></v-data-table
            >
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item :value="2">
        <h1>ADD NEW SERVICE PACK</h1>
        <v-btn color="blue" class="white--text" @click="step--"
          >Go back to service pack manage</v-btn
        >
        <div>
          <v-container>
            <v-card elevation="15" class="pa-10">
              <v-alert :type="alertMessage.type" v-if="alertMessage">{{
                alertMessage.content
              }}</v-alert>
              <v-form @submit.prevent="createServicePack()">
                 <v-text-field
                  name="name"
                  label="label"
                  v-show="false"
                  v-model="productServicePack.id"
                ></v-text-field>

                <v-text-field
                  label="Service Pack Name:"
                  type="text"
                  prepend-icon="fas fa-user"
                  required
                  v-model="productServicePack.name"
                  clearable
                />
                <v-checkbox label="Confirm" v-model="productServicePack.status">Confirm</v-checkbox>
                <v-row>
                  <v-spacer></v-spacer>
                  <v-col cols="12" sm="3">
                    <v-btn color="green" class="white--text" type="submit"
                      >SAVE</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-container>
        </div>
      </v-window-item>

      <v-window-item :value="3">
        <h1>{{ testValue.name }}</h1>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-btn color="purple" class="white--text" @click="step -= 2"
              >Go back to Service Pack manage</v-btn
            >
          </v-col>
        </v-row>
        <h1>Product List belong to Service Pack</h1>
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
  name: "ServicePack",
  components: {},
  data() {
    return {
      testValue: "",
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

      //product service pack model
      productServicePack: {
        id: "",
        name: "",
        status: "",
      },

      //table
      page: 0,
      totalItems: 0,
      totalPages: 0,
      productServicePacks: [],
      loading: true,
      options: {},
      headers: [
        { text: "Id", value: "id" },
        { text: "Pack Name", value: "name" },
        { text: "Status", value: "status" },
        { text: "Action", value: "action" },
      ],
    };
  },
  watch: {
    options: {
      handler() {
        this.getAllServicePack();
      },
      deep: true,
    },
  },
  props: {
    source: String,
  },
  methods: {
    handleClick(value) {
      this.step = 3;
      this.testValue = value;
    },

    reloadWindow() {
      window.location.reload();
    },

    createServicePack() {
      if (this.productServicePack.name === "") {
        this.alertMessage.type = "error";
        this.alertMessage.content = "Please enter info";
      } else {
        api
          .post("/product_service_pack", this.productServicePack)
          .then((response) => {
            console.log(response.data);
            this.alertMessage.type = "success";
            this.alertMessage.content = "Save Product Service Pack Success";
            window.location.reload();
          })
          .catch((error) => {
            Promise.reject(error);
            this.alertMessage.type = "error";
            this.alertMessage.content = "Save Product Service Pack Fail";
          });
      }
    },
    deleteServicePack(item) {
      api
        .delete("/product_service_pack/" + item.id)
        .then((response) => {
          this.dialog.status = true;
          this.dialog.message = response.data.message;
        })
        .catch((error) => {
          this.dialog.status = true;
          this.dialog.message = error.response.data.message;
        });
    },

    updateServicePack(item) {
      this.productServicePack = item;
      this.step = 2;
    },

    getAllServicePack() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get(
          "/product_service_pack/?pageNo=" +
            pageNumber +
            "&pageSize=" +
            itemsPerPage
        )
        .then((response) => {
          this.loading = false;
          this.productServicePacks = response.data.productServicePacks;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },
    getServicePackByName() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get(
          "/product_service_pack/search?keyword=" +
            this.searchKeyword +
            "&pageNo=" +
            pageNumber +
            "&pageSize=" +
            itemsPerPage
        )
        .then((response) => {
          this.loading = false;
          this.productServicePacks = response.data.productServicePacks;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },
  },
  mounted() {
    this.getAllServicePack();
  },
};
</script>

<style lang="scss" scoped></style>
