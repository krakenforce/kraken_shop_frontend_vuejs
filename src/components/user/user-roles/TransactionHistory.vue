<template>
  <v-container fluid black justify="center">
    <v-row>
      <v-col cols="12" md="12">
        <v-card>
          <v-tabs color="blue accent-4" centered background-color="black">
            <v-tab class="white--text">Purchase history</v-tab>
            <v-tab class="white--text">Card recharge history</v-tab>
            <v-tab class="white--text">Transfer history</v-tab>

            <v-tab-item>
              <v-container fluid black justify="center">
                <v-row>
                  <v-col cols="12" md="3">
                    <h2 class="white--text">Purchase history:</h2>
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="12">
                    <v-data-table
                      :page="1"
                      :pageCount="totalPages"
                      :headers="headers"
                      :items="purchaseHistory"
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
            </v-tab-item>

            <v-tab-item>
              <v-container fluid black justify="center">
                <v-row>
                  <v-col cols="12" md="3">
                    <h2 class="white--text">Card recharge history:</h2>
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="12">
                    <v-data-table
                      :page="1"
                      :pageCount="totalPages"
                      :headers="headers"
                      :items="cardRechargeHistory"
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
                      ></v-data-table>
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>

            <v-tab-item>
              <v-container fluid black justify="center">
                <v-row>
                  <v-col cols="12" md="3">
                    <h2 class="white--text">Transfer history:</h2>
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="12">
                    <v-data-table
                      :page="1"
                      :pageCount="totalPages"
                      :headers="headers"
                      :items="transferHistory"
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
                      ></v-data-table>
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TransactionHistory",
  components: {},
  data() {
    return {
      //table
      page: 0,
      totalItems: 0,
      totalPages: 0,
      purchaseHistory: [],
      cardRechargeHistory:[],
      transferHistory:[],
      loading: true,
      options: {},
      headers: [
        { text: "No", value: "no" },
        { text: "Bill number", value: "billNumber" },
        { text: "Value", value: "value" },
        { text: "Time", value: "time" },
        { text: "Action", value: "action" },
      ],

    };
  },
};
</script>

<style>
</style>