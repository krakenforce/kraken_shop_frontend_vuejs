<template>
  <v-container fluid>
    <v-window v-model="step" vertical>
      <v-window-item :value="1">
        <h1 class="gray --text">Tag Category</h1>
        <span
          >Create new product Tag or update the existing ones. You can see their
          detail info</span
        >

        <v-row class="mt-4">
          <v-col cols="12" sm="3">
            <v-text-field
              label="Tag Search"
              v-model="searchKeyword"
              @input="getTagsByName()"
            >
            </v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-btn color="green" class="white--text" @click="step++">
              <v-icon>fas fa-plus</v-icon>
              ADD A NEW TAG
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" sm="12">
            <v-data-table
              :page="1"
              :pageCount="totalPages"
              :headers="headers"
              :items="tags"
              :options.sync="options"
              :server-items-length="totalItems"
              :loading="loading"
              class="elevation-1"
              ref="dataTable"
            >
              <template v-slot:item.action="{ item }">
                <v-btn color="primary" @click="updateTag(item)">
                  <v-icon>fas fa-edit</v-icon>
                </v-btn>
                <v-btn color="red" @click="deleteTag(item)">
                  <v-icon>fas fa-trash</v-icon>
                </v-btn>
              </template>
              ></v-data-table>
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item :value="2">
        <h1>ADD NEW TAG</h1>
        <v-btn color="blue" class="white--text" @click="step--"
          >Go back to tag manage</v-btn
        >
        <div>
          <v-container>
            <v-card elevation="15" class="pa-10">
              <v-alert :type="alertMessage.type" v-if="alertMessage">{{
                alertMessage.content
              }}</v-alert>
              <v-form @submit.prevent="createTag()">
                 <v-text-field
                  name="id"
                  label="label"
                  v-show="false"
                  v-model="tag.tagId"
                ></v-text-field>

                <v-text-field
                  label="Tag Name:"
                  type="text"
                  prepend-icon="fas fa-user"
                  required
                  clearable
                  v-model="tag.name"
                />

                <v-checkbox label="Confirm" v-model="tag.status">Confirm</v-checkbox>

                <v-row>
                  <v-spacer></v-spacer>
                  <v-col cols="12" sm="3">
                    <v-btn color="green" class="white--text" type="submit">SAVE</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-container>
        </div>
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
import api from "../../../services/api"

export default {
  name: "Tags",
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

      //tag model
      tag: {
        tagId: "",
        name: "",
        status: "",
      },

      //table
      page: 0,
      totalItems: 0,
      totalPages: 0,
      tags: [],
      loading: true,
      options: {},
      headers: [
        { text: "Tag Id", value: "tagId" },
        { text: "Tag Name", value: "name" },
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
        this.getAllTags();
      },
      deep: true,
    },
  },
  methods: {
    reloadWindow(){
      window.location.reload();
    },

    createTag() {
      if (this.tag.name === "") {
        this.alertMessage.type = "error";
        this.alertMessage.content = "Please enter info";
      } else {
        api
          .post("/tag", this.tag)
          .then((response) => {
            console.log(response.data);
            this.alertMessage.type = "success";
            this.alertMessage.content = "Save Tag Success";
            window.location.reload();
          })
          .catch((error) => {
            Promise.reject(error);
            this.alertMessage.type = "error";
            this.alertMessage.content = "Save Tag Fail";
          });
      }
    },
    deleteTag(item) {
      api
        .delete("/tag/" + item.tagId)
        .then((response) => {
          this.dialog.status = true;
          this.dialog.message= response.data.message;
          
        })       
        .catch((error) => {
          this.dialog.status = true;
          this.dialog.message= error.response.data.message;
        });
    },

    updateTag(item){
      this.tag = item;
      this.step = 2;
    },

    getAllTags() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get("/tag/?pageNo=" + pageNumber + "&pageSize=" + itemsPerPage)
        .then((response) => {
          this.loading = false;
          this.tags = response.data.tags;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },
    getTagsByName() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get(
          "/tag/search?keyword=" +
            this.searchKeyword +
            "&pageNo=" +
            pageNumber +
            "&pageSize=" +
            itemsPerPage
        )
        .then((response) => {
          this.loading = false;
          this.tags = response.data.tags;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },
  },
  mounted() {
    this.getAllTags();
  },
};
</script>

<style lang="scss" scoped></style>
