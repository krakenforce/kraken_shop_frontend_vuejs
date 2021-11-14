<template>
  <v-container fluid black justify="center">
    <v-row>
      <v-col cols="12" md="12">
        <v-container fluid black justify="center">
          <v-row dense>
            <v-col cols="12" md="12">
              <v-data-table
              :page="1"
              :pageCount="totalPages"
              :headers="headers"
              :items="gameCodes"
              :options.sync="options"
              :server-items-length="totalItems"
              :loading="loading"
              class="elevation-1"
              v-model="selectedUser"
              ref="dataTable"
            >
              ></v-data-table
            >
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../../../services/api";

export default {
  name: "KeyBunker",
  components: {},
  data() {
    return {
      //table
      page: 0,
      totalItems: 0,
      totalPages: 0,
      loading: true,
      gameCodes: [],
      options: {},
      headers: [
        { text: "Id", value: "id" },
        { text: "Product Name", value: "productName" },
        { text: "Code", value: "code" },
      ],
    };
  },
  watch: {
    options: {
      handler() {
        this.getKey();
      },
      deep: true,
    },
  },
  methods: {
    getKey(){
      let walletId = this.$store.state.auth.user.walletId;
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get("/game_code/search_wallet?walletId=" + walletId + "&pageNo=" + pageNumber + "&pageSize=" + itemsPerPage)
        .then((response) => {
          this.loading = false;
          this.gameCodes = response.data.productGameCodes;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    }
  },
  mounted() {
    this.getKey();
  }
};
</script>

<style>
</style>