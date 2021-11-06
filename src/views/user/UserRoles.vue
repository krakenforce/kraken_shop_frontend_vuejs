<template>
    <v-row justify="center" no-gutters>
      <v-col cols="12" sm="12">
        <div class="ma-5 pa-5">
          <v-container class="text-center" black justify="center" fill-height fluid>
            <v-row>
              <v-col cols="12" md="12">
                
                <UserRolesComponent />
                <Footer />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>
</template>

<script>
import UserRolesComponent from "../../components/user/UserRolesComponent.vue";
import Footer from "../../components/user/Footer.vue";
export default {
  name: "ProductDetail",
  components: {
    UserRolesComponent,
    Footer,
  },
};
</script>

<style>
</style>