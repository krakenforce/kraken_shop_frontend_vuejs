<template>
  <v-app-bar app color="gray" elevate-on-scroll elevation="5">
    <v-app-bar-nav-icon @click="$emit('handleDrawer')"></v-app-bar-nav-icon>

    <v-spacer></v-spacer>
    <!-- <v-row>
      <v-col sm="9" cols="12">
        <v-form class="mt-5">
          <v-text-field rounded outlined dense placeholder="Search Here" />
        </v-form>
      </v-col>
      <v-col sm="2" cols="12">
        <v-btn color="blue" class="mt-5" icon outlined>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-col>
    </v-row> -->

    <v-spacer></v-spacer>

    <!--Notification-->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <span
          v-bind="attrs"
          v-on="on"
          style="cursor: pointer"
          class="mx-5 "
        >
          <v-badge offset-x="10" offset-y="10" color="red" content="12">
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </span>
      </template>

      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- User Info -->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <span
          v-bind="attrs"
          v-on="on"
          style="cursor: pointer"
          class="mx-5 mr-10"
        >
          <v-chip link>
            <v-badge dot bottom offset-y="10" offset-x="10" color="green">
              <v-avatar size="40">
                <img src="https://i.ibb.co/J5MnNBg/icon.png" alt="" />
              </v-avatar>
            </v-badge>
            <span class="ml-4">Username</span>
          </v-chip>
        </span>
      </template>
      <v-list width="250" class="py-0" flat>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://i.ibb.co/J5MnNBg/icon.png" alt="" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title> Admin </v-list-item-title>
            <v-list-item-subtitle> Logged In </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="(menu, index) in menus" :key="index" link>
          <v-list-item-avatar>
            <v-icon> {{ menu.icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>
            {{ menu.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      selectedItem: 1,
      menus: [
        { title: "Profile", icon: "mdi-account" },
        { title: "Change Password", icon: "mdi-key" },
        { title: "Logout", icon: "mdi-logout" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>