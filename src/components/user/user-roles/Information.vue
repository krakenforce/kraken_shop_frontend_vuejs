<template>
  <v-container fluid black justify="center">
    <v-row>
      <v-col cols="auto">
        <h1 class="white--text">Change password</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <h2 class="white--text">New password:</h2>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          outlined
          color="white"
          background-color="rgb(90, 90, 90)"
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <h2 class="white--text">Confirm password:</h2>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          background-color="rgb(90, 90, 90)"
          outlined
          color="white"
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col cols="12" md="7">
        <v-btn class="ma-2" outlined color="white"> Change </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <h1 class="white--text">Account information</h1>
      </v-col>
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
        <v-radio-group row>
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
        <v-radio-group row>
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
export default {
  name: "Information",
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
  }),
};
</script>

<style>
</style>