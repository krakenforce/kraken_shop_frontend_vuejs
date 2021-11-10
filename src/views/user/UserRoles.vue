<template>
    <v-row justify="center" no-gutters>
      <v-col cols="12" sm="12">
        <div class="ma-5 pa-5">
          <v-container class="text-center" black justify="center" fill-height fluid>
            <v-row>
              <v-col cols="12" md="12">              
                <UserRolesComponent :user="this.user" />
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
import api from '../../services/api'
export default {
  name: "ProductDetail",
  components: {
    UserRolesComponent,
    Footer,
  },
  data() {
    return {
      user: null,
    }
  },
  methods: {
    getUser(){
      let currentUser = this.$store.state.auth.user;
      api.get('/user/' + currentUser.id)
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          Promise.reject(error);
        })
      console.log(this.user);
    }
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style>
</style>