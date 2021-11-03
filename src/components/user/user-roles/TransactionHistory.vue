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
                    <v-simple-table dark>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-center text-h5">STT</th>
                            <th class="text-center text-h5">Số hóa đơn</th>
                            <th class="text-center text-h5">Giá trị</th>
                            <th class="text-center text-h5">Thời gian</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in desserts1" :key="item.name">
                            <td>{{ item.STT1 }}</td>
                            <td>{{ item.SHD1 }}</td>
                            <td>{{ item.GT1 }}</td>
                            <td>{{ item.TG1 }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
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
                    <v-simple-table dark>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-center text-h5">STT</th>
                            <th class="text-center text-h5">Số hóa đơn</th>
                            <th class="text-center text-h5">Giá trị</th>
                            <th class="text-center text-h5">Thời gian</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in desserts2" :key="item.name">
                            <td>{{ item.STT2 }}</td>
                            <td>{{ item.SHD2 }}</td>
                            <td>{{ item.GT2 }}</td>
                            <td>{{ item.TG2 }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
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
                    <v-simple-table dark>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-center text-h5">STT</th>
                            <th class="text-center text-h5">Số hóa đơn</th>
                            <th class="text-center text-h5">Giá trị</th>
                            <th class="text-center text-h5">Thời gian</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in desserts3" :key="item.name">
                            <td>{{ item.STT3 }}</td>
                            <td>{{ item.SHD3 }}</td>
                            <td>{{ item.GT3 }}</td>
                            <td>{{ item.TG3 }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
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
      desserts1: [
        {
          STT1: "title",
          SHD1: "NaN",
          GT1: "NaN",
          TG1: "NaN",
        },
      ],
      desserts2: [
        {
          STT2: "title",
          SHD2: "NaN",
          GT2: "NaN",
          TG2: "NaN",
        },
      ],
      desserts3: [
        {
          STT3: "title",
          SHD3: "NaN",
          GT3: "NaN",
          TG3: "NaN",
        },
      ],
    };
  },
};
</script>

<style>
</style>