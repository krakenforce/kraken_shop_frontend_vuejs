<template>
  <v-container fluid>
    <v-window v-model="step" vertical>
      <v-window-item :value="1">
        <h1 class="gray --text">Manage Category</h1>
        <span
          >Create new product category or update the existing ones. You can see
          their detail info</span
        >

        <v-row class="mt-4">
          <v-col cols="12" sm="3">
            <v-text-field
              label="Category Search"
              v-model="searchKeyword"
              @input="getCategoriesByName()"
            >
            </v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-btn color="green" class="white--text" @click="step++">
              <v-icon>fas fa-plus</v-icon>
              ADD A NEW CATEGORY
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" sm="12">
            <v-data-table
              :page="1"
              :pageCount="totalPages"
              :headers="headers"
              :items="categories"
              :options.sync="options"
              :server-items-length="totalItems"
              :loading="loading"
              class="elevation-1"
              ref="dataTable"
            >
              <template v-slot:item.action="{ item }">
                <v-btn color="primary" @click="updateCategory(item)">
                  <v-icon>fas fa-edit</v-icon>
                </v-btn>
                <v-btn color="red" @click="deleteCategory(item)">
                  <v-icon>fas fa-trash</v-icon>
                </v-btn>
              </template>
              ></v-data-table
            >
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item :value="2">
        <h1>ADD NEW CATEGORY</h1>
        <v-btn color="blue" class="white--text" @click="step--"
          >Go back to category manage</v-btn
        >
        <div>
          <v-container>
            <v-card elevation="15" class="pa-10">
              <v-alert :type="alertMessage.type" v-if="alertMessage">{{
                alertMessage.content
              }}</v-alert>
              <v-form @submit.prevent="createCategory()">
                <v-text-field
                  name="name"
                  label="label"
                  v-show="false"
                  v-model="category.categoryId"
                ></v-text-field>

                <v-text-field
                  label="Category Name:"
                  type="text"
                  prepend-icon="fas fa-user"
                  v-model="category.name"
                  required
                  clearable
                />

                <v-checkbox label="Confirm" v-model="category.status"
                  >Confirm</v-checkbox
                >
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
              >Go back to category manage</v-btn
            >
          </v-col>
        </v-row>

        <h1>Product List belong to category</h1>
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
  name: "Category",
  components: {},
  data() {
    return {
      testValue: "",
      step: 1,
      searchKeyword: "",
      dialog:{
        status: false,
        message: "",
      },

      alertMessage: {
        type: "",
        content: "",
      },

      //category model
      category: {
        categoryId: "",
        name: "",
        status: "",
      },

      //table
      page: 0,
      totalItems: 0,
      totalPages: 0,
      categories: [],
      loading: true,
      options: {},
      headers: [
        { text: "Category Id", value: "categoryId" },
        { text: "Category Name", value: "name" },
        { text: "Status", value: "status" },
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
        this.getAllCategories();
      },
      deep: true,
    },
  },
  methods: {
    reloadWindow(){
      window.location.reload();
    },

    handleClick(value) {
      this.step = 3;
      this.testValue = value;
    },

    createCategory() {
      if (this.category.name === "") {
        this.alertMessage.type = "error";
        this.alertMessage.content = "Please enter info";
      } else {
        api
          .post("/category", this.category)
          .then((response) => {
            console.log(response.data);
            this.alertMessage.type = "success";
            this.alertMessage.content = "Save Category Success";
            window.location.reload();
          })
          .catch((error) => {
            Promise.reject(error);
            this.alertMessage.type = "error";
            this.alertMessage.content = "Save Category Fail";
          });
      }
    },

    deleteCategory(item) {
      api
        .delete("/category/" + item.categoryId)
        .then((response) => {
          this.dialog.status = true;
          this.dialog.message= response.data.message;
          
        })       
        .catch((error) => {
          this.dialog.status = true;
          this.dialog.message= error.response.data.message;
        });
    },

    updateCategory(item){
      this.category = item;
      this.step = 2;
    },

    getAllCategories() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get("/category/?pageNo=" + pageNumber + "&pageSize=" + itemsPerPage)
        .then((response) => {
          this.loading = false;
          this.categories = response.data.categories;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },
    getCategoriesByName() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get(
          "/category/search?keyword=" +
            this.searchKeyword +
            "&pageNo=" +
            pageNumber +
            "&pageSize=" +
            itemsPerPage
        )
        .then((response) => {
          this.loading = false;
          this.categories = response.data.categories;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },
  },
  mounted() {
    this.getAllCategories();
  },
};
</script>

<style lang="scss" scoped></style>
