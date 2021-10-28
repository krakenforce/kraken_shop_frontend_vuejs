<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-10">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-card-text class="mt-12">
                    <h4 class="text-center">Login to Kraken Shop</h4>
                    <h6 class="text-center grey--text">
                      Log in to your account so you can go with us <br />
                      and enjoy
                    </h6>
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
                        <v-row>
                          <v-col cols="12" sm="7">
                            <v-checkbox
                              label="Remember me"
                              class="mt-n1"
                              color="blue"
                            ></v-checkbox>
                          </v-col>
                          <v-col cols="12" sm="5">
                            <span class="caption blue--text"
                              >Forget password?</span
                            >
                          </v-col>
                        </v-row>
                        <v-btn color="blue" @click="handleLogin()" dark block tile>Login</v-btn>
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
            <v-window-item :value="2">
              <v-row>
                <v-col cols="12" sm="6" class="blue rounded-bl-xl">
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
                          v-model="username"
                        />

                        <v-text-field
                          label="Email"
                          type="text"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          prepend-icon="far fa-envelope"
                          v-model="email"
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

                        <v-text-field
                          label="Confirm Password"
                          type="password"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          prepend-icon="fas fa-lock"
                          v-model="confirmPassword"
                        />
                        <v-row>
                          <v-col cols="12" sm="7">
                            <v-checkbox
                              label="I accept website policy"
                              class="mt-n1"
                              color="blue"
                            ></v-checkbox>
                          </v-col>
                          <v-col cols="12" sm="5">
                            <span class="caption blue--text ml-n4">
                              Terms & Conditions</span
                            >
                          </v-col>
                        </v-row>
                        <v-btn color="blue" @click="handleRegister()" dark block tile>Sign up</v-btn>
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
import AuthService from '../services/AuthService'
//import router from '../router'

export default {
  name: "Login",
  data() {
    return {
      step: 1,
      username: '',
      password: '',
      email: '',
      confirmPassword: '',
    };
  },
  methods: {
    handleLogin(){
      AuthService.login(this.username, this.password); 
    },
    handleRegister(){
      AuthService.register(this.username, this.email, this. password);
    
    }
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