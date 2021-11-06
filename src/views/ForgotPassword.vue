<template>
  <v-container>
    <v-card elevation="20" class="pa-10 mt-10" color="transparent">
      <v-window>
        <v-window-item :value="3">
          <v-row>
            <v-col cols="12" sm="12">
              <v-card-text class="mt-12">
                <h4 class="text-center">Enter your new Password</h4>
                <h6 class="text-center grey--text">
                  Let's get you all set up so you can start creation
                  <br />
                  your Account
                </h6>
                <v-row align="center" justify="center">
                  <v-col cols="12" sm="10">
                    <v-text-field
                      label="Password"
                      type="password"
                      outlined
                      dense
                      color="blue"
                      autocomplete="false"
                      class="mt-16"
                      prepend-icon="fas fa-lock"
                      v-model="paramUrl"
                    />
                    <v-text-field
                      label="Confirm Password"
                      type="password"
                      outlined
                      dense
                      color="blue"
                      autocomplete="false"
                      class="mt-16"
                      prepend-icon="fas fa-lock"
                      
                    />
                    <span @click="goToHomePage()" class="blue--text">Go to HomePage</span>
                    <v-spacer></v-spacer>
                    <v-btn color="green" dark block tile
                      >Update your Password</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ForgotPassword",
  data() {
      return {
        paramUrl : '',
        username: 'toanngo'
      }
  },
  methods: {
      goToHomePage: function(){
          this.$router.push("/");
      },

      testResetToken(){
      this.paramUrl =  this.$router.query.resetToken
      console.log(this.paramUrl);
    }
  },
  mounted() {
    this.testResetToken();
  },
};
</script>

<style lang="scss" scoped>
</style>