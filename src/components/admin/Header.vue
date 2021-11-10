<template>
  <v-app-bar app color="gray" elevate-on-scroll elevation="5">
    <v-app-bar-nav-icon @click="$emit('handleDrawer')"></v-app-bar-nav-icon>

    <v-spacer></v-spacer>
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
        <v-list-item v-for="(item, index) in menus" :key="index">
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
            <span class="ml-4">{{user.username}}</span>
          </v-chip>
        </span>
      </template>
      
      <v-list width="250" class="py-0" flat>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://i.ibb.co/J5MnNBg/icon.png" alt="" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{user.username}} </v-list-item-title>
            <v-list-item-subtitle> Logged In </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="logout">
          <v-list-item-avatar>
            <v-icon>mdi-key</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>
            Change Password
          </v-list-item-title>
        </v-list-item>

        <v-list-item @click="logout" link >
          <v-list-item-avatar>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>
            Logout
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>

export default {
  name: "Header",
  props: ["user"],
  data() {
    return {
      currentUser: null,
      selectedItem: 1,
      menus: [
        { title: "Change Password", icon: "mdi-key" },
        { title: "Logout", icon: "mdi-logout"},
      ],
    };
  },
  methods: {
    logout(){
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>