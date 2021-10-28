<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-img
      src="https://i.ibb.co/6gj9shn/05ddc9513f63b165a2249a75aa54950a.jpg"
      class="pa-4"
    >
      <div class="text-center mt-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64">
          <v-img aspect-ratio="30" src="https://i.ibb.co/J5MnNBg/icon.png">
          </v-img>
        </v-avatar>
        <h2 class="white--text">KrakenShop Admin</h2>
      </div>
    </v-img>

    <v-divider></v-divider>

    <v-list>
      <!--Dash Board-->
      <v-list-item link :to="dashroute">
        <v-list-item-icon>
          <v-icon>fas fa-tachometer-alt</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!--User Manage-->
      <v-list-group>
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon>fas fa-users</v-icon>
          </v-list-item-icon>
          <v-list-item-title>User Manage</v-list-item-title>
        </template>

        <v-list-item v-for="([title, icon, route], i) in userManage"
         :key="i"
         link
         :to="route">
          <v-list-item-title>{{title}}</v-list-item-title>
          <v-list-item-icon>
              <v-icon >{{icon}}</v-icon>
            </v-list-item-icon>
        </v-list-item>
      </v-list-group>

      <!--Product Manage-->
      <v-list-group>
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon>fab fa-product-hunt</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Product Manage</v-list-item-title>
        </template>

        <v-list-item v-for="([title, icon, route], i) in productManage"
         :key="i"
         :to="route"
         link>
          <v-list-item-title>{{title}}</v-list-item-title>
          <v-list-item-icon>
              <v-icon >{{icon}}</v-icon>
            </v-list-item-icon>
        </v-list-item>
      </v-list-group>

      <!--Order Manage-->
      <v-list-group>
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon>fas fa-file-invoice-dollar</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Order Manage</v-list-item-title>
        </template>

        <v-list-item v-for="([title, icon, route], i) in orderManage"
         :key="i"
         :to="route"
         link>
          <v-list-item-title>{{title}}</v-list-item-title>
          <v-list-item-icon>
              <v-icon >{{icon}}</v-icon>
            </v-list-item-icon>
        </v-list-item>
      </v-list-group>

      <!-- CRM -->
      <v-list-group>
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon>fab fa-intercom</v-icon>
          </v-list-item-icon>
          <v-list-item-title>CRM</v-list-item-title>
        </template>

        <v-list-item v-for="([title, icon, route], i) in crm"
         :key="i"
         :to="route"
         link>
          <v-list-item-title>{{title}}</v-list-item-title>
          <v-list-item-icon>
              <v-icon >{{icon}}</v-icon>
            </v-list-item-icon>
        </v-list-item>
      </v-list-group>

      <!-- Statistic -->
      <v-list-group>
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon>fas fa-chart-line</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Statistics</v-list-item-title>
        </template>

        <v-list-item v-for="([title, icon], i) in statistics"
         :key="i"
         link>
          <v-list-item-title>{{title}}</v-list-item-title>
          <v-list-item-icon>
              <v-icon >{{icon}}</v-icon>
            </v-list-item-icon>
        </v-list-item>
      </v-list-group>

      <!-- Marketing -->
      <v-list-group>
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon>fas fa-ad</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Marketing</v-list-item-title>
        </template>

        <v-list-item v-for="([title, icon, router], i) in marketing"
         :key="i"
         :to="router"
         link>
          <v-list-item-title>{{title}}</v-list-item-title>
          <v-list-item-icon>
              <v-icon >{{icon}}</v-icon>
            </v-list-item-icon>
        </v-list-item>
      </v-list-group>




    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["drawer"],
  data() {
    return {
      dashroute: "/admin",
      userManage: [
        ["User", "fas fa-user", "/admin/user-list"],
        ["VIP", "fab fa-vuejs", "/admin/vip-user"],
      ],
      productManage: [
        ["Product", "fab fa-product-hunt", "/admin/product-manage"],
        ["Category", "fas fa-cube", "/admin/category-manage"],
        ["Tag", "fas fa-tags", "/admin/tag-manage"],
        ["Service Pack", "fas fa-box", "/admin/service-pack-manage"],
      ],
      orderManage:[
        ["Order", "fas fa-file-invoice-dollar", "/admin/order-manage"],
        ["Transaction", "fas fa-money-check-alt", "/admin/transaction-manage"],
        ["Payment", "fab fa-paypal", "/admin/payment-manage"]
      ],
      crm:[
        ["Review", "far fa-thumbs-up" ,"/admin/review-manage"],
        ["Feedback", "far fa-comment-dots","/admin/feedback-manage"],
        ["Comment", "fas fa-comments", "/admin/comment-manage"],
      ],
      statistics: [
        ["Sales", "fas fa-chart-line"],
        ["Product", "fab fa-product-hunt"],
        ["User", "fas fa-user"]
      ],
      marketing: [
        ["Sale Promote", "fas fa-user","/admin/sale-promote"],
        ["Banner", "fas fa-user" , "/admin/banner"],
      ]
    };
  },
};
</script>

<style lang="scss" scoped>
</style>