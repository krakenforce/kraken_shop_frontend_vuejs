<template>
  <v-container fluid>
    <v-window v-model="step">
      <v-window-item :value="1">
        <h1 class="gray --text">Product Manage</h1>
        <span
          >Create new product or update the existing product. You can see their
          detail info</span
        >

        <v-row class="mt-4">
          <v-col cols="12" sm="2">
            <v-text-field
              label="Product Search"
              @input="getProductByName()"
              v-model="searchKeyword"
            />
          </v-col>
          <v-col cols="12" sm="2">
            <v-combobox
              placeholder="Select Category"
              outlined
              dense
              :items="categories"
              item-text="name"
              item-value="categoryId"
              @change="handleSearchCategory"
            ></v-combobox>
          </v-col>

          <v-col cols="12" sm="2">
            <v-combobox
              placeholder="Select Tag"
              outlined
              dense
              :items="tags"
              item-text="name"
              item-value="tagId"
              @change="handleSearchTag"
            ></v-combobox>
          </v-col>
          <v-col cols="12" sm="1">
            <v-btn color="transparent" x-small="true" @click="reloadWindow()">
            </v-btn>
          </v-col>

          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-btn color="green" class="white--text" @click="step++">
              <v-icon>fas fa-plus</v-icon>
              ADD A NEW PPODUCT
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" sm="12">
            <v-data-table
              :page="1"
              :pageCount="totalPages"
              :headers="headers"
              :items="products"
              :options.sync="options"
              :server-items-length="totalItems"
              :loading="loading"
              class="elevation-1"
            >
              <template v-slot:item.image="{ item }">
                <v-img
                  v-if="item.thumbnailImageUrl != null"
                  height="90px"
                  width="160px"
                  :src="item.thumbnailImageUrl"
                ></v-img>
              </template>
              <template v-slot:item.pack="{ item }">
                <span v-text="item.productServicePackName"></span>
              </template>
              <template v-slot:item.action="{ item }">
                <v-btn color="green" @click="updateProduct(item)">
                  <v-icon>fas fa-edit</v-icon>
                </v-btn>
                <v-btn color="red" @click="deleteProduct(item)">
                  <v-icon>fas fa-trash</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item :value="2">
        <h1>ADD NEW PRODUCT</h1>
        <v-btn color="blue" class="white--text" @click="returnToManagePage()"
          >Go back to product manage</v-btn
        >
        <div>
          <v-container>
            <v-card elevation="15" class="pa-10">
              <v-form @submit.prevent="createProduct()">
                <v-alert :type="alertMessage.type" v-if="alertMessage">{{
                  alertMessage.content
                }}</v-alert>
                <v-row>
                  <v-text-field
                    name="id"
                    label="label"
                    v-show="false"
                    v-model="productRequest.product.productId"
                  ></v-text-field>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      label="Product Code"
                      type="text"
                      v-model="productRequest.product.productCode"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      label="Product Name"
                      type="text"
                      v-model="productRequest.product.name"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      label="Price"
                      append-icon="fas fa-dollar-sign"
                      type="number"
                      v-model="productRequest.product.price"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      label="Sale Price"
                      append-icon="fas fa-dollar-sign"
                      type="number"
                      v-model="productRequest.product.salePrice"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6">
                    <v-select
                      prepend-icon="fas fa-user"
                      v-model="productRequest.product.productServicePack.id"
                      :items="servicePacks"
                      item-text="name"
                      item-value="id"
                      :menu-props="{ maxHeight: '400' }"
                      label="Select Service Pack for Product"
                      persistent-hint
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      label="Product Original Link"
                      type="text"
                      v-model="productRequest.product.originalProductLink"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="productRequest.categoryIdSet"
                      :items="categories"
                      item-text="name"
                      item-value="categoryId"
                      chips
                      label="Category"
                      multiple
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="productRequest.tagIdSet"
                      :items="tags"
                      item-text="name"
                      item-value="tagId"
                      chips
                      label="Tags"
                      multiple
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="12" class="mt-2">
                    <v-subheader>Product Detail</v-subheader>
                    <ckeditor
                      v-model="productRequest.product.productDetail"
                    ></ckeditor>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="12" class="mt-2">
                    <v-subheader>Product Warranty</v-subheader>
                    <ckeditor
                      v-model="productRequest.product.productWarranty"
                    ></ckeditor>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="12" class="mt-2">
                    <v-file-input
                      @change="Preview_image"
                      v-model="thumbnailImage"
                      label="Thumbnail Image"
                    >
                    </v-file-input>
                    <v-img :src="thumbImageUrl"></v-img>

                    <v-file-input
                      @change="Preview_image1"
                      v-model="subImage1"
                      label="Image 1"
                    >
                    </v-file-input>
                    <v-img :src="image1Url"></v-img>

                    <v-file-input
                      @change="Preview_image2"
                      v-model="subImage2"
                      label="Image 2"
                    >
                    </v-file-input>
                    <v-img :src="image2Url"></v-img>

                    <v-file-input
                      @change="Preview_image3"
                      v-model="subImage3"
                      label="image 3"
                    >
                    </v-file-input>
                    <v-img :src="image3Url"></v-img>
                  </v-col>
                </v-row>

                <v-row>
                  <v-spacer></v-spacer>
                  <v-col cols="12" sm="3">
                    <v-btn type="submit" color="green" class="white--text"
                      >Create Product</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-container>
        </div>
      </v-window-item>

      <v-window-item :value="3">
        <!-- <h1>{{ testValue.name }}</h1> -->
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-btn color="purple" class="white--text" @click="step -= 2"
              >Go back to user manage</v-btn
            >
          </v-col>
        </v-row>

        <UserDetail />
      </v-window-item>
    </v-window>

    <v-dialog v-model="dialog.status" width="400">
      <v-card>
        <v-card-title class="text-h5"> Notification </v-card-title>

        <v-card-text>
          <h3>{{ dialog.message }}</h3>         
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
  name: "Product",
  components: {},
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

      servicePacks: [],
      categories: [],
      tags: [],
      ckeValue: [],

      thumbImageUrl: "",
      thumbnailImage: null,
      subImage1: null,
      image1Url: "",
      subImage2: null,
      image2Url: "",
      subImage3: null,
      image3Url: "",
      imageList: [this.subImage1, this.subImage2, this.subImage3],

      productRequest: {
        product: {
          productId: "",
          productCode: "",
          name: "",
          price: 0,
          salePrice: 0,
          productServicePack: {
            id: "",
            name: "",
          },
          productDetail: "",
          status: true,
          thumbnailImageUrl: "",
          originalProductLink: "",
          productWarranty: "",
        },
        categoryIdSet: [],
        tagIdSet: [],
      },

      //product list to table
      page: 0,
      totalItems: 0,
      totalPages: 0,
      products: [],
      loading: true,
      options: {},
      headers: [
        { text: "Product Id", value: "productId" },
        { text: "Product Name", value: "name" },
        { text: "Image", value: "image" },
        { text: "Price", value: "price" },
        { text: "Sale Price", value: "salePrice" },
        { text: "Pack", value: "pack" },
        { text: "Action", value: "action" },
      ],
    };
  },
  watch: {
    options: {
      handler() {
        this.getAllProduct();
      },
    },
    deep: true,
  },
  methods: {
    returnToManagePage() {
      this.step = 1;
      this.productRequest.product.productId = "";
      this.productRequest.product.productCode = "";
      this.productRequest.product.name = "";
      this.productRequest.product.price = "";
      this.productRequest.product.salePrice = "";
      this.productRequest.product.productServicePack = "";
      this.productRequest.product.originalProductLink = "";
      this.productRequest.product.productDetail = "";
      this.productRequest.product.productWarranty = "";
      this.thumbImageUrl = "";

      this.productRequest.categoryIdSet = [];
      this.productRequest.tagIdSet = [];
    },

    handleSearchCategory(item) {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;
      //let categoryId = item.categoryId;

      api
        .get(
          "/product/category/" +
            item.categoryId +
            "?pageNo=" +
            pageNumber +
            "&pageSize=" +
            itemsPerPage
        )

        .then((response) => {
          this.loading = false;
          this.products = response.data.products;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },
    handleSearchTag(item) {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;
      //let categoryId = item.categoryId;

      api
        .get(
          "/product/tag/" +
            item.tagId +
            "?pageNo=" +
            pageNumber +
            "&pageSize=" +
            itemsPerPage
        )

        .then((response) => {
          this.loading = false;
          this.products = response.data.products;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },

    reloadWindow() {
      window.location.reload();
    },

    Preview_image() {
      this.thumbImageUrl = URL.createObjectURL(this.thumbnailImage);
    },

    Preview_image1() {
      this.image1Url = URL.createObjectURL(this.subImage1);
    },

    Preview_image2() {
      this.image2Url = URL.createObjectURL(this.subImage2);
    },
    Preview_image3() {
      this.image3Url = URL.createObjectURL(this.subImage3);
    },

    getAllServicePack() {
      api
        .get("/product_service_pack/get_all")
        .then((response) => {
          this.servicePacks = response.data;
        })
        .catch((error) => {
          Promise.reject(error);
        });
    },

    getAllTag() {
      api
        .get("/tag/get_all")
        .then((response) => {
          this.tags = response.data;
        })
        .catch((error) => {
          Promise.reject(error);
        });
    },

    getAllCategory() {
      api
        .get("/category/get_all")
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          Promise.reject(error);
        });
    },

    getAllProduct() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;

      api
        .get("/product?pageNo=" + pageNumber + "&pageSize=" + itemsPerPage)
        .then((response) => {
          this.loading = false;
          this.products = response.data.products;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },

    getProductByName() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;
      let keyword = this.searchKeyword;

      api
        .get(
          "/product/search/name?productName=" +
            keyword +
            "&pageNo=" +
            pageNumber +
            "&pageSize=" +
            itemsPerPage
        )
        .then((response) => {
          this.loading = false;
          this.products = response.data.products;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        });
    },

    updateProduct(item) {
      this.productRequest.product.productId = item.productId;
      this.productRequest.product.productCode = item.productCode;
      this.productRequest.product.name = item.name;
      this.productRequest.product.price = item.price;
      this.productRequest.product.salePrice = item.salePrice;
      this.productRequest.product.productServicePack = {
        id: item.productServicePackId,
        name: item.productServicePackName,
      };
      this.productRequest.product.originalProductLink =
        item.originalProductLink;
      this.productRequest.product.productDetail = item.productDetail;
      this.productRequest.product.productWarranty = item.productWarranty;
      this.thumbImageUrl = item.thumbnailImageUrl;

      this.productRequest.categoryIdSet = item.categoryChilds;
      this.productRequest.tagIdSet = item.tagChilds;

      this.step = 2;
    },

    deleteProduct(item) {
      api
        .delete("/product/" + item.productId)
        .then((response) => {
          this.dialog.status = true;
          this.dialog.message = response.data.message;
        })
        .catch((error) => {
          this.dialog.status = true;
          this.dialog.message = error.response.data.message;
        });
    },

    createProduct() {
      const formData = new FormData();
      formData.append(
        "productRequest",
        new Blob([JSON.stringify(this.productRequest)], {
          type: "application/json",
        })
      );
      formData.append("thumbnailImage", this.thumbnailImage);
      console.log(this.productRequest);
      api
        .post("/product", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response.data);
          this.alertMessage.type = "success";
          this.alertMessage.content = "Save Product Success";
          this.reloadWindow();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
  },
  mounted() {
    this.getAllServicePack();
    this.getAllTag();
    this.getAllCategory();
    this.getAllProduct();
  },
};
</script>

<style lang="scss" scoped>
</style>