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
              <!-- <v-tab class="white--text">Activity</v-tab> -->
              <v-tab class="white--text">Information</v-tab>
              <v-tab class="white--text">history</v-tab>
              <v-tab class="white--text">Recharge</v-tab>
              <v-tab class="white--text">Key bunker</v-tab>

              <!-- <v-tab-item>
                <Activity />
              </v-tab-item> -->
              <v-tab-item>
                <Information :user="user" />
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
              <v-toolbar-title class="yellow--text text-h7">Member VIP benefits</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text class="text-h7 font-weight-bold grey white--text">
              - VIP BRONZE: 1% discount of total bill value.<hr/>
              - VIP SILVER: 2% discount of total bill value.<hr/>
              - VIP GOLD: 3% discount of total bill value.<hr/>
              +Priority order processing and top-up.<hr/>
              - VIP PLATINUM : 5% discount of total bill value.<hr/>
              +Priority is given to support in handling and fixing game errors with their own technical department..<hr/>
              +Priority order processing and top-up.<hr/>
              And many other attractive offers. See details here
            </v-card-text>
          </v-card>

        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
//import Activity from "../user/user-roles/Activity.vue";
import Information from "../user/user-roles/Information.vue";
import TransactionHistory from "../user/user-roles/TransactionHistory.vue";
import Recharge from "../user/user-roles/Recharge.vue";
import KeyBunker from "../user/user-roles/KeyBunker.vue";


export default {
  name: "UserRolesComponent",
  components: {
    Information,
    TransactionHistory,
    Recharge,
    KeyBunker,
  },
  props: ["user"],

  data: () => ({
    tabHeaders: ["ACTIVITY", "INFOMATION", "TRANSACTION HISTORY", "RECHART", "KEY BUNKER"]
  }),
};
</script>
<style scoped>
</style>
