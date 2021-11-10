<template>
  <v-container fluid black justify="center">
    <v-row>
      <v-col cols="auto">
        <h1 class="white--text">Change password</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="3">
        <h2 class="white--text">New password:</h2>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          outlined
          color="white"
          type="password"
          background-color="rgb(90, 90, 90)"
          v-model="password"
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col cols="12" sm="3">
        <h2 class="white--text">Confirm password:</h2>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          background-color="rgb(90, 90, 90)"
          outlined
          type="password"
          color="white"
          @input="checkMatch"
          v-model="confirmPassword"
        ></v-text-field>
      </v-col>
      <v-col v-if="matched" cols="12" sm="1">
        <v-icon>✔️</v-icon>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col cols="12" md="7">
        <v-btn class="ma-2" outlined color="white" @click="updatePassword">
          Update Password
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <h1 class="white--text">Account information</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <h2 class="white--text">Avatar:</h2>
      </v-col>
      <v-col cols="12" md="4">
        <div v-if="user.avatarImageUrl">
          <v-img
            :src="user.avatarImageUrl"
            height="200px"
            width="200px"
          ></v-img>
        </div>
        <div v-else>
          <v-img
            :src="url"
            height="200px"
            width="200px"
          ></v-img>
        </div>
        <v-file-input @change="previewImage" v-model="avatarImage" accept="image/*" />
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <v-row>
      <v-col cols="12" md="3">
        <h2 class="white--text">User ID:</h2>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          readonly="true"
          outlined
          color="white"
          :value="user.userId"
          background-color="rgb(90, 90, 90)"
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <h2 class="white--text">Username:</h2>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          readonly="true"
          outlined
          color="white"
          :value="user.username"
          background-color="rgb(90, 90, 90)"
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <h2 class="white--text">First name:</h2>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          outlined
          color="white"
          :value="user.firstName"
          background-color="rgb(90, 90, 90)"
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <h2 class="white--text">Last name:</h2>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          outlined
          color="white"
          :value="user.lastName"
          background-color="rgb(90, 90, 90)"
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <h2 class="white--text">Email:</h2>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          outlined
          color="white"
          :value="user.email"
          background-color="rgb(90, 90, 90)"
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <h2 class="white--text">Phone:</h2>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          outlined
          color="white"
          :value="user.phone"
          background-color="rgb(90, 90, 90)"
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <h2 class="white--text">Identity number:</h2>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          outlined
          color="white"
          :value="user.identityNumber"
          background-color="rgb(90, 90, 90)"
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <h2 class="white--text">Gender:</h2>
      </v-col>
      <v-col cols="12" md="4">
        <v-radio-group row v-model="user.gender">
          <v-radio
            v-for="gender in genderGroup"
            :key="gender.text"
            :label="gender.text"
            :value="gender.value"
          ></v-radio>
        </v-radio-group>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <h2 class="white--text">Marriage status:</h2>
      </v-col>
      <v-col cols="12" md="4">
        <v-radio-group row v-model="user.marriageStatus">
          <v-radio
            v-for="status in marriageStatusGroup"
            :key="status.text"
            :label="status.text"
            :value="status.value"
          ></v-radio>
        </v-radio-group>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <h2 class="white--text">Address:</h2>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          outlined
          color="white"
          :value="user.address"
          background-color="rgb(90, 90, 90)"
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <h2 class="white--text">Job:</h2>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          outlined
          color="white"
          :value="user.job"
          background-color="rgb(90, 90, 90)"
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col cols="12" md="7">
        <v-btn class="ma-2" outlined color="white"> Change </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../../../services/api";
export default {
  name: "Information",
  props: ["user"],
  components: {},
  data: () => ({
    items: ["Male", "Female", "Other"],
    row: null,
    marriageStatusGroup: [
      { text: "Married", value: true },
      { text: "Single", value: false },
    ],
    genderGroup: [
      { text: "Male", value: "MALE" },
      { text: "Female", value: "FEMALE" },
      { text: "Other", value: "OTHER" },
    ],

    password: "",
    confirmPassword: "",
    matched: false,
    avatarImage: null,
    url: '',
  }),

  methods: {
    checkMatch() {
      if (this.password == this.confirmPassword) {
        this.matched = true;
      } else {
        this.matched = false;
      }
    },

    previewImage(){
      this.url = URL.createObjectURL(this.avatarImage)
    },

    updatePassword() {
      if (this.password == "" || this.confirmPassword == "") {
        alert("Please enter password");
      } else {
        if (this.password == this.confirmPassword) {
          let userId = this.$store.state.auth.user.id;

          api
            .put(
              "/user/update_password?userId=" +
                userId +
                "&password=" +
                this.password
            )
            .then((response) => {
              alert(response.data.message);
            })
            .catch((error) => {
              alert(error.response.data.message);
            });
        } else {
          alert("Password not match");
        }
      }
    },
  },
};
</script>

<style>
</style>