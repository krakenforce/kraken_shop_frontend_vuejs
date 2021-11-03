<template>
  <v-container fluid black justify="center">
    <v-row>
      <v-col cols="12" md="12">
        <v-container fluid black justify="center">
          <v-row dense>
            <v-col cols="12" md="12">
              <v-simple-table dark>
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
              </v-simple-table>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Recharge",
  components: {},
  data() {
    return {};
  },
};
</script>

<style>
</style>