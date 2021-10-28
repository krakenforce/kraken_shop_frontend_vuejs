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
          <v-col cols="12" sm="3">
            <v-text-field label="Product Search" />
          </v-col>
          <v-col cols="12" sm="2">
            <v-combobox
              placeholder="Select Category"
              outlined
              dense
              :items="categories"
              @change="handleSearchCategory()"
            ></v-combobox>
          </v-col>
          <v-col cols="12" sm="2">
            <v-combobox
              placeholder="Select Tag"
              outlined
              dense
              :items="tags"
              @change="handleSearchCategory()"
            ></v-combobox>
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
              :headers="headers"
              :items="desserts"
              :items-per-page="5"
              @click:row="handleClick"
            ></v-data-table>
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item :value="2">
        <h1>ADD NEW PRODUCT</h1>
        <v-btn color="blue" class="white--text" @click="step--"
          >Go back to product manage</v-btn
        >
        <div>
          <v-container>
            <v-card elevation="15" class="pa-10">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field label="Product Code" type="text" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field label="Product Name" type="text" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Price"
                    append-icon="fas fa-dollar-sign"
                    type="text"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Sale Price"
                    append-icon="fas fa-dollar-sign"
                    type="text"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-select
                    prepend-icon="fas fa-user"
                    v-model="e6"
                    :items="items"
                    :menu-props="{ maxHeight: '400' }"
                    label="Select Service Pack for Product"
                    multiple
                    hint="Pick account role"
                    persistent-hint
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field label="Product Original Link" type="text" />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6"> 
                    <v-select
                    v-model="value"
                    :items="categories"
                    chips
                    label="Category"
                    multiple
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="value"
                    :items="tags"
                    chips
                    label="Tags"
                    multiple
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" class="mt-2">
                  <v-subheader>Product Detail</v-subheader>
                  <ckeditor value="hello world"></ckeditor>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" class="mt-2">
                  <v-subheader>Product Warranty</v-subheader>
                  <ckeditor v-model="ckeValue" value="hello world"></ckeditor>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" class="mt-2">
                  <v-file-input
                    @change="Preview_image"
                    v-model="image"
                    label="Thumbnail Image"
                  >
                  </v-file-input>
                  <v-img :src="url"></v-img>

                  <v-file-input
                    @change="Preview_image"
                    v-model="image"
                    label="Image 1"
                  >
                  </v-file-input>
                  <v-img :src="url"></v-img>

                  <v-file-input
                    @change="Preview_image"
                    v-model="image"
                    label="Image 2"
                  >
                  </v-file-input>
                  <v-img :src="url"></v-img>

                  <v-file-input
                    @change="Preview_image"
                    v-model="image"
                    label="image 3"
                  >
                  </v-file-input>
                  <v-img :src="url"></v-img>
                </v-col>
              </v-row>

              <v-row>
                <v-spacer></v-spacer>
                <v-col cols="12" sm="3">
                  <v-btn color="green" class="white--text"
                    >Create Product</v-btn
                  >
                </v-col>
              </v-row>
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
  </v-container>
</template>

<script>
export default {
  name: "Product",
  components: {},
  data() {
    return {
      step: 1,
      categories: ["Steam", "Epic"],
      tags: ["Action", "RPG"],
      ckeValue: [],
      url: null,
      image: null,
    };
  },
  methods: {
    handleSearchCategory() {
      alert("change success");
    },
    handleOnChange() {
      alert(this.ckeValue);
    },
    Preview_image() {
      this.url = URL.createObjectURL(this.image);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>