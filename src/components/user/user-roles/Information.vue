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
          <v-icon size="200">fas fa-user</v-icon>
        </div>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <v-row v-if="user.vipClassName != ''">
      <v-col cols="12" md="3">
        <h2 class="white--text">Vip Class:</h2>
      </v-col>
      <v-col cols="12" md="4">
        <v-icon size="30" v-if="user.vipClassName=='bronze'" color="#CD7F32" >fab fa-vuejs</v-icon>
        <v-icon size="30" v-if="user.vipClassName=='silver'" color="#757575" >fab fa-vuejs</v-icon>
        <v-icon size="30" v-if="user.vipClassName=='gold'" color="#FFD700" >fab fa-vuejs</v-icon>
        <v-icon size="30" v-if="user.vipClassName=='platinum'" color="#E5E4E2" >fab fa-vuejs</v-icon>

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
          readonly="true"
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
          readonly="true"
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
          readonly="true"
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
          readonly="true"
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
          readonly="true"
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
            readonly="true"
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
            readonly="true"
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
          readonly="true"
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
          readonly="true"
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
        <v-btn
          @click.stop="openUpdateUserInfo"
          class="ma-2"
          outlined
          color="white"
        >
          Change
        </v-btn>
      </v-col>
    </v-row>

    <!-- DIALOG  -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="pa-5">
        <v-card-title> Enter info to update </v-card-title>
        <v-row>
          <v-col cols="12" md="6">
            <h2 class="white--text">Avatar:</h2>
          </v-col>
          <v-col cols="12" md="6">
            <v-img :src="url" height="200px" width="200px"></v-img>

            <v-file-input
              @change="previewImage"
              v-model="userUpdateModel.avatar"
              accept="image/*"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <h2 class="white--text">First name:</h2>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              outlined
              color="white"
              v-model="userUpdateModel.firstName"
              background-color="rgb(90, 90, 90)"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <h2 class="white--text">Last name:</h2>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              outlined
              color="white"
              v-model="userUpdateModel.lastName"
              background-color="rgb(90, 90, 90)"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <h2 class="white--text">Email:</h2>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              outlined
              color="white"
              v-model="userUpdateModel.email"
              background-color="rgb(90, 90, 90)"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <h2 class="white--text">Phone:</h2>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              outlined
              color="white"
              v-model="userUpdateModel.phone"
              background-color="rgb(90, 90, 90)"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <h2 class="white--text">Identity number:</h2>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              outlined
              color="white"
              v-model="userUpdateModel.identityNumber"
              background-color="rgb(90, 90, 90)"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <h2 class="white--text">Gender:</h2>
          </v-col>
          <v-col cols="12" md="6">
            <v-radio-group row v-model="userUpdateModel.gender">
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
          <v-col cols="12" md="6">
            <h2 class="white--text">Marriage status:</h2>
          </v-col>
          <v-col cols="12" md="6">
            <v-radio-group row v-model="userUpdateModel.marriage">
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
          <v-col cols="12" md="6">
            <h2 class="white--text">Address:</h2>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              outlined
              color="white"
              v-model="userUpdateModel.address"
              background-color="rgb(90, 90, 90)"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <h2 class="white--text">Job:</h2>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              outlined
              color="white"
              v-model="userUpdateModel.job"
              background-color="rgb(90, 90, 90)"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col cols="12" md="7">
            <v-btn
              @click.stop="updateUserInfo"
              class="ma-2"
              outlined
              color="white"
            >
              SAVE
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import api from "../../../services/api";
export default {
  name: "Information",
  props: ["user"],
  components: {},
  data: () => ({
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
    url: "",

    dialog: false,

    userUpdateModel: {
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      identityNumber: "",
      gender: "",
      marriage: "",
      address: "",
      job: "",
      avatar: null,
    },
  }),

  methods: {
    checkMatch() {
      if (this.password == this.confirmPassword) {
        this.matched = true;
      } else {
        this.matched = false;
      }
    },

    previewImage() {
      this.url = URL.createObjectURL(this.userUpdateModel.avatar);
    },

    openUpdateUserInfo() {
      this.dialog = true;
      this.userUpdateModel.firstName = this.user.firstName;
      this.userUpdateModel.lastName = this.user.lastName;
      this.userUpdateModel.email = this.user.email;
      this.userUpdateModel.phone = this.user.phone;
      this.userUpdateModel.identityNumber = this.user.identityNumber;
      this.userUpdateModel.gender = this.user.gender;
      this.userUpdateModel.marriage = this.user.marriageStatus;
      this.userUpdateModel.address = this.user.address;
      this.userUpdateModel.job = this.user.job;
    },

    updateUserInfo() {
      this.userUpdateModel.userId = this.user.userId;
      const formData = new FormData();
      formData.append(
        "userUpdateModel",
        new Blob([JSON.stringify(this.userUpdateModel)], {
          type: "application/json",
        })
      );
      if (this.userUpdateModel.avatar != null) {
        formData.append("avatar", this.userUpdateModel.avatar);
      }
      api
        .put("/user/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response.data.message);
          localStorage.removeItem("user");
          this.$router.push("/login");
          alert("update info success, please re-log in");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
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