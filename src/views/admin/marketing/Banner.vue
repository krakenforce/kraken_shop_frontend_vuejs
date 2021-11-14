<template>
  <v-container>
    <v-window v-model="step" vertical>
      <v-window-item :value="1">
        <h1 class="gray --text">Manage Banner</h1>
        <span>Add or update banner for homepage</span>

        <v-row class="mt-4">
          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-btn color="green" class="white--text" @click="step++">
              Add banner
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" sm="12">
            <v-data-table
              :page="1"
              :pageCount="totalPages"
              :headers="headers"
              :items="homepageBanners"
              :options.sync="options"
              :server-items-length="totalItems"
              :loading="loading"
              class="elevation-1"
              ref="dataTable"
            >
              <template v-slot:item.image="{ item }">
                <v-img width="320px" height="180px" :src="item.imageUrl">
                </v-img>
              </template>
              <template v-slot:item.action="{ item }">
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
        <h1 class="gray --text">Add Banner</h1>

        <v-row class="mt-4">
          <v-col cols="12" sm="3">
            <v-btn color="blue" class="white--text" @click="step--">
              BACK TO banner MANAGE
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" sm="12">
            <v-alert :type="alertMessage.type" v-if="alertMessage">{{
              alertMessage.content
            }}</v-alert>
            <v-form @submit.prevent="createHomepageBanners()">
              <v-file-input
                @change="Preview_image"
                v-model="image"
                label="Image"
              >
              </v-file-input>
              <v-img :src="url"></v-img>

              <v-text-field
                name="id"
                label="label"
                v-show="false"
                v-model="banner.id"
              ></v-text-field>

              <v-text-field
                label="Url Query"
                v-model="banner.apiQueryUrl"
              ></v-text-field>

              <v-checkbox label="Status" v-model="banner.status"></v-checkbox>

              <v-btn color="green" class="white--text" type="submit"
                >Add Banner</v-btn
              >
            </v-form>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
import api from "../../../services/api";
export default {
  name: "Banner",
  data() {
    return {
      step: 1,
      image: null,
      searchKeyword: "",
      dialog: {
        status: false,
        message: "",
      },

      alertMessage: {
        type: "",
        content: "",
      },

      //banner model
      banner: {
        id: "",
        apiQueryUrl: "",
        imageUrl: '',
        status: "",
      },

      //table
      page: 0,
      totalItems: 0,
      totalPages: 0,
      homepageBanners: [],
      loading: true,
      options: {},
      headers: [
        { text: "Id", value: "id" },
        { text: "Image", value: "image" },
        { text: "Content Url", value: "apiQueryUrl" },
        { text: "Status", value: "status" },
        { text: "Action", value: "action" },
      ],
    };
  },
  watch: {
    options: {
      handler() {
        this.getAllBanner();
      },
      deep: true,
    },
  },
  methods: {
    Preview_image() {
      this.url = URL.createObjectURL(this.image);
    },

    reloadWindow() {
      window.location.reload();
    },

    getAllBanner() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get("/banner?pageNo=" + pageNumber + "&pageSize=" + itemsPerPage)
        .then((response) => {
          this.loading = false;
          this.homepageBanners = response.data.homepageBanners;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },

    updateBanner(item){
      this.banner = item;
      this.url = item.imageUrl;
      this.step = 2;
    },

    createHomepageBanners() {
      const formData = new FormData();
      formData.append(
        "banner",
        new Blob([JSON.stringify(this.banner)], { type: "application/json" })
      );
      formData.append("file", this.image);

      api
        .post("/banner", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response.data);
          this.alertMessage.type = "success";
          this.alertMessage.content = "Save Sale Promote Success";
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
  },
  mounted() {
    this.getAllBanner();
  },
};
</script>

<style lang="scss" scoped>
</style>