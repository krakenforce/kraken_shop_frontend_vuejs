<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card elevation="10" class="pa-10 mt-10" color="dark" opacity="20">
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
                  <v-card-text v-if="alert.type">
                    <v-alert dense :type="alert.type">
                      {{ alert.text }}
                    </v-alert>
                  </v-card-text>
                  <v-row align="center" justify="center">
                    <v-col cols="12" sm="12">
                      <v-form @submit.prevent="resetPassword">
                        <v-text-field
                          type="password"
                          outlined
                          dense
                          color="blue"
                          class="mt-16"
                          prepend-icon="fas fa-lock"
                          v-model="password"
                        >
                          <template #label>
                            <span class="red--text"><strong>* </strong></span
                            >Password
                          </template>
                        </v-text-field>
                        <v-text-field
                          label="Confirm Password"
                          type="password"
                          outlined
                          dense
                          color="blue"
                          class="mt-16"
                          prepend-icon="fas fa-lock"
                          v-model="rePassword"
                        >
                          <template #label>
                            <span class="red--text"><strong>* </strong></span
                            >Confirm Password
                          </template>
                        </v-text-field>

                        <span @click="goToHomePage()" class="blue--text"
                          >Go to HomePage</span
                        >
                        <v-spacer></v-spacer>
                        <v-btn color="green" dark block tile type="submit"
                          >Update Password</v-btn
                        >
                      </v-form>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import api from "../services/api"

export default {
  name: "ForgotPassword",
  data() {
    return {
      password: "",
      rePassword: "",
      alert: {
        type: "",
        text: "",
      },
    };
  },
  methods: {
    goToLogin: function () {
      this.$router.push("/login");
    },

    checkPasswordMatch() {
      if (this.password != this.rePassword) {
        this.alert.type = "error";
        this.alert.text = "Your confirm password not match, try again.";
        this.clearAlert();
        return false;
      } else {
        return true;
      }
    },

    clearAlert() {
      setTimeout(() => {
        this.alert.type = "";
        this.alert.text = "";
      }, 3000);
    },

    resetPassword() {
      let token = this.$route.query.token;
      if (this.password == "" || this.confirmPassword == "") {
        this.alert.type = "error";
        this.alert.text = "Please enter all field, try again.";
        this.clearAlert();
      } else {
        if (this.checkPasswordMatch()) {
          let resetPasswordRequest = { token: "", password: "" };
          resetPasswordRequest.token = token;
          resetPasswordRequest.password = this.password;
          api
            .post("/auth/reset_password", resetPasswordRequest)
            .then(() => {
              this.alert.type = "success";
              this.alert.text = "Reset Password was successfully, Please Login";
              localStorage.removeItem("user");
              setTimeout(() => {
                this.goToLogin();
              }, 2000)
            })
            .catch(() => {
              this.alert.type = "error";
              this.alert.text = "Error occur, try again";
              this.clearAlert();
            });
        }
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>