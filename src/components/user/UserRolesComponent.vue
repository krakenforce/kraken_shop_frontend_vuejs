<template>
  <v-card class="overflow-hidden black" justify="center">
    <v-container justify="center" fluid black>
      <v-row class="mb-1">
        <v-col cols="12" sm="12">
          <v-card>
            <v-img
              src="../../assets/user/img-product.png"
              max-height="500"
              class="grey darken-4"
            ></v-img>
          </v-card>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12" sm="9">
          <v-card>
            <v-tabs color="red accent-4" centered background-color="black">
              <v-tab class="white--text">Activity</v-tab>
              <v-tab class="white--text">Information</v-tab>
              <v-tab class="white--text">Transaction history</v-tab>
              <v-tab class="white--text">Recharge</v-tab>
              <v-tab class="white--text">Key bunker</v-tab>

              <v-tab-item>
                <Activity />
              </v-tab-item>
              <v-tab-item>
                <Information />
              </v-tab-item>
              <v-tab-item>
                <TransactionHistory />
              </v-tab-item>
              <v-tab-item>
                <Recharge />
              </v-tab-item>
              <v-tab-item>
                <KeyBunker />
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card color="black lighten-4" flat height="1535px" tile>
            <v-toolbar dense outlined color="#333333">
              <v-toolbar-title class="yellow--text text-h7">Quyền lợi Member VIP</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text class="text-h7 font-weight-bold grey white--text">
              - VIP BRONZE: Được tặng 1 điểm WONGPOINT cho mỗi 100k trong đơn
              hàng.<hr/>
              - VIP SILVER: Được tặng 2 điểm WONGPOINT cho mỗi 100k trong đơn
              hàng.<hr/>
              - VIP GOLD: Được tặng 2 điểm WONGPOINT cho mỗi 100k trong đơn
              hàng.<hr/>
              +Được ưu tiên xử lý đơn và nạp tiền.<hr/>
              - VIP DIAMOND : Được tặng 3 điểm WONGPOINT cho mỗi 100k trong đơn
              hàng.<hr/>
              +Được ưu tiên hỗ trợ xử lý, sửa lỗi game với bộ phận kỹ thuật
              riêng.<hr/>
              +Được ưu tiên xử lý đơn và nạp tiền. ( Hệ thống điểm WONGPOINT
              không áp dụng với sản phẩm steam wallet code )<hr/>
              Và nhiều ưu đãi hấp dẫn khác. Xem chi tiết tại đây<hr/>
            </v-card-text>
          </v-card>

        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import Activity from "../user/user-roles/Activity.vue";
import Information from "../user/user-roles/Information.vue";
import TransactionHistory from "../user/user-roles/TransactionHistory.vue";
import Recharge from "../user/user-roles/Recharge.vue";
import KeyBunker from "../user/user-roles/KeyBunker.vue";

export default {
  name: "UserRolesComponent",
  components: {
    Activity,
    Information,
    TransactionHistory,
    Recharge,
    KeyBunker,
  },

  data: () => ({

  }),
};
</script>
<style scoped>
</style>
