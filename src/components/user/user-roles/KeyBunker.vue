<template>
  <v-container fluid black justify="center">
    <v-row>
      <v-col cols="12" md="12">
        <v-container fluid black justify="center">
          <v-row dense>
            <v-col cols="12" md="12">
              <!-- <v-simple-table dark>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-center text-h5">STT</th>
                      <th class="text-center text-h5">Mã hóa đơn</th>
                      <th class="text-center text-h5">Sản phẩm</th>
                      <th class="text-center text-h5">Code</th>
                      <th class="text-center text-h5">Ngày nhận</th>
                      <th class="text-center text-h5">Ngày xem</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in desserts" :key="item.name">
                      <td>{{ item.STT }}</td>
                      <td>{{ item.MHD }}</td>
                      <td>{{ item.SP }}</td>
                      <td>{{ item.Code }}</td>
                      <td>{{ item.NN }}</td>
                      <td>{{ item.NX }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table> -->
              <v-data-table
              :page="1"
              :pageCount="totalPages"
              :headers="headers"
              :items="keyBunker"
              :options.sync="options"
              :server-items-length="totalItems"
              :loading="loading"
              class="elevation-1"
              v-model="selectedUser"
              ref="dataTable"
            >
              <!-- <template v-slot:item.action="{ item }">
                <v-btn color="primary" @click="onButtonClick(item)">
                  <v-icon>fas fa-edit</v-icon>
                </v-btn>
                <v-btn color="red" @click="onButtonClick()">
                  <v-icon>fas fa-trash</v-icon>
                </v-btn>
              </template> -->
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
export default {
  name: "KeyBunker",
  components: {},
  data() {
    return {
      //table
      page: 0,
      totalItems: 0,
      totalPages: 0,
      transactionsHistory: [],
      loading: true,
      options: {},
      headers: [
        { text: "No", value: "no" },
        { text: "Bill code", value: "billCode" },
        { text: "Product", value: "product" },
        { text: "Code", value: "code" },
        { text: "Received date", value: "receivedDate" },
        { text: "Viewing date", value: "viewingDate" },
        { text: "Action", value: "action" },
      ],
    };
  },
};
</script>

<style>
</style>