<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-10">
          <v-window v-model="step">
            <!-- SIGN IN -->
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-card-text class="mt-12">
                    <h4 class="text-center">Login to Kraken Shop</h4>
                    <h6 class="text-center grey--text">
                      Log in to your account so you can go with us <br />
                      and enjoy
                    </h6>
                    <v-card-text v-if="lAlert.type">
                      <v-alert dense :type="lAlert.type">
                        {{ lAlert.text }}
                      </v-alert>
                    </v-card-text>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="8">
                        <v-text-field
                          label="Username"
                          type="text"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          class="mt-16"
                          prepend-icon="fas fa-user"
                          v-model="username"
                        />

                        <v-text-field
                          label="Password"
                          type="password"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          prepend-icon="fas fa-lock"
                          v-model="password"
                        />
                        <v-row class="text-center">
                          <v-col cols="12" sm="6">
                            <span
                              class="caption blue--text"
                              @click="goToHomePage"
                              >Homepage</span
                            >
                          </v-col>
                          <v-col cols="12" sm="6">
                            <span
                              class="caption blue--text"
                              @click="goToWindowItem(3)"
                              >Forget password?</span
                            >
                          </v-col>
                        </v-row>
                        <v-btn
                          color="blue"
                          @click="handleLogin()"
                          dark
                          block
                          tile
                          class="mt-2"
                          >Login</v-btn
                        >
                        <div v-if="loadingCircle" class="text-center">
                          <v-progress-circular
                            indeterminate
                            color="primary"
                          ></v-progress-circular>
                        </div>

                        <h6 class="text-center grey--text mt-4 mb-3">
                          Or log in using
                        </h6>
                        <div
                          class="
                            d-flex
                            justify-space-around
                            align-center
                            mx-0
                            mb-16
                          "
                        >
                          <v-btn depressed outlined color="grey">
                            <v-icon color="red">fab fa-google</v-icon>
                          </v-btn>
                          <v-btn depressed outlined color="grey">
                            <v-icon color="blue">fab fa-facebook-f</v-icon>
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
                <v-col cols="12" sm="6" class="blue rounded-bl-xl">
                  <div style="text-align: center; padding: 180px 0px">
                    <v-card-text class="white--text">
                      <h3 class="text-center">Don't have an account yet ?</h3>
                      <h6 class="text-center">
                        Let's get you all set up so you can start creating
                        <br />
                        your account.
                      </h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step++">SIGN UP</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>

            <!-- SIGN UP -->
            <v-window-item :value="2">
              <v-row>
                <v-col cols="12" sm="6" class="green rounded-bl-xl">
                  <div style="text-align: center; padding: 180px 0px">
                    <v-card-text class="white--text">
                      <h3 class="text-center">Already have an account ?</h3>
                      <h6 class="text-center">
                        Let's get you all set up so you can start logging in
                        <br />
                        your account.
                      </h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step--">SIGN IN</v-btn>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-card-text class="mt-12">
                    <h4 class="text-center">Sign up for an Account</h4>
                    <h6 class="text-center grey--text">
                      Let's get you all set up so you can start creation
                      <br />
                      your Account
                    </h6>
                    <v-card-text v-if="rAlert.type">
                      <v-alert dense :type="rAlert.type">
                        {{ rAlert.text }}
                      </v-alert>
                    </v-card-text>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="10">
                        <v-text-field
                          label="Username"
                          type="text"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          class="mt-16"
                          prepend-icon="fas fa-user"
                          v-model="rUsername"
                        />

                        <v-text-field
                          label="Email"
                          type="text"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          prepend-icon="far fa-envelope"
                          v-model="rEmail"
                        />

                        <v-text-field
                          label="Password"
                          type="password"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          prepend-icon="fas fa-lock"
                          v-model="rPassword"
                        />

                        <v-text-field
                          label="Confirm Password"
                          type="password"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          prepend-icon="fas fa-lock"
                          v-model="rConfirmPassword"
                        />
                        <v-row>
                          <v-col cols="12" sm="7">
                            <v-checkbox
                              label="I accept website policy"
                              class="mt-n1"
                              color="blue"
                              v-model="rAcceptPolicy"
                            ></v-checkbox>
                          </v-col>
                          <v-col cols="12" sm="5">
                            <span class="caption blue--text ml-n4">
                              Terms & Conditions</span
                            >
                          </v-col>
                        </v-row>
                        <v-btn
                          color="green"
                          @click="handleRegister()"
                          dark
                          block
                          tile
                          >Sign up</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>

            <!--FORGET PASSWORD-->
            <v-window-item :value="3">
              <v-row>
                <v-col cols="12" sm="6" class="red rounded-bl-xl">
                  <div style="text-align: center; padding: 180px 0px">
                    <v-card-text class="white--text">
                      <h3 class="text-center">Got your Password</h3>
                      <h6 class="text-center">
                        Let's get you sign in
                        <br />
                        your account.
                      </h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="goToWindowItem(1)"
                        >SIGN IN</v-btn
                      >
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-card-text class="mt-12">
                    <h4 class="text-center">Enter info to reset password</h4>
                    <h6 class="text-center grey--text">
                      Let's get you all set up so you can start creation
                      <br />
                      your Account
                    </h6>
                    <v-card-text v-if="fpAlert.type">
                      <v-alert dense :type="fpAlert.type">
                        {{ fpAlert.text }}
                      </v-alert>
                    </v-card-text>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="10">
                        <v-text-field
                          label="Email"
                          type="text"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          class="mt-16"
                          prepend-icon="fas fa-user"
                          v-model="fpEmail"
                        />

                        <v-btn
                          color="red"
                          dark
                          block
                          tile
                          @click="handleForgetPassword"
                          >Reset Your Password</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthService from "../services/AuthService";
import api from "../services/api";
//import router from '../router'

export default {
  name: "Login",
  data() {
    return {
      loadingCircle: false,
      step: 1,
      username: "",
      password: "",
      email: "",
      confirmPassword: "",

      //Login
      lAlert: {
        type: "",
        text: "",
      },

      //Register
      rUsername: "",
      rEmail: "",
      rPassword: "",
      rConfirmPassword: "",
      rAcceptPolicy: "",
      rAlert: {
        type: "",
        text: "",
      },

      // Forgot Password
      fpEmail: "",
      fpAlert: {
        type: "",
        text: "",
      },
    };
  },
  methods: {
    goToHomePage(){
      this.$router.push("/")
    },

    clearAlert(alert) {
      setTimeout(() => {
        alert.type = "";
        alert.text = "";
      }, 3000);
    },

    handleForgetPassword() {
      if (this.fpEmail == "") {
        this.fpAlert.type = "error";
        this.fpAlert.text = "Please enter email address";
        this.clearAlert(this.fpAlert);
      } else {
        let forgetPasswordRequest = { email: "" };
        forgetPasswordRequest.email = this.fpEmail;
        api
          .post("/auth/forgot_password", forgetPasswordRequest)
          .then((response) => {
            this.fpAlert.type = "success";
            this.fpAlert.text = response.data.message;
            this.clearAlert(this.fpAlert);
          })
          .catch((error) => {
            this.fpAlert.type = "error";
            this.fpAlert.text = error.response.data.message;
            this.clearAlert(this.fpAlert);
          });
      }
    },

    handleLogin() {
      AuthService.login(this.username, this.password);
      let currentUser;
      setTimeout(() => {
        currentUser = JSON.parse(localStorage.getItem("user"));
      }, 500);
      setTimeout(() => {
        if (currentUser) {
          let roleList = currentUser.roles;
          if (roleList.indexOf("ROLE_ADMIN") !== -1) {
            this.$router.push("/admin");
          } else {
            this.$router.push("/");
          }
        }
      }, 500);
    },

    handleRegister() {
      if (
        this.rUsername == "" ||
        this.rEmail == "" ||
        this.rPassword == "" ||
        this.rConfirmPassword == ""
      ) {
        this.rAlert.type = "error";
        this.rAlert.text = "Please Enter All Field";
        this.clearAlert(this.rAlert);
      } else {
        if (this.rPassword != this.rConfirmPassword) {
          this.rAlert.type = "error";
          this.rAlert.text = "Password not matched, try again";
          this.clearAlert(this.rAlert);
        } else {
          let signUpRequest = { username: "", password: "", email: "" };
          signUpRequest.username = this.rUsername;
          signUpRequest.password = this.rPassword;
          signUpRequest.email = this.rEmail;
          api
            .post("/auth/signup", signUpRequest)
            .then((response) => {
              this.rAlert.type = "success";
              this.rAlert.text = response.data.message;
              this.clearAlert(this.rAlert);
              this.step = 1;
            })
            .catch((error) => {
              this.rAlert.type = "error";
              this.rAlert.text = error.response.data.message;
              this.clearAlert(this.rAlert);
            });
        }
      }
    },

    goToWindowItem(value) {
      this.step = value;
    },
  },
  props: {
    source: String,
  },
};
</script>

<style  scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}
.v-application .rounded-bl-xl {
  border-bottom-right-radius: 300px !important;
}
</style>