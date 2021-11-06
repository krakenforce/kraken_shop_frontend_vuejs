<template>
    <v-row justify="center" no-gutters>
      <v-col cols="12" sm="12" md="11">
        <div class="ma-5 pa-5">
          <v-container class="text-center" black justify="center" fill-height>
            <v-row>
              <v-col cols="12" sm="12">
                <ContactComponent />
                <Footer />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>
</template>

<script>
import ContactComponent from '../../components/user/ContactComponent.vue'
import Footer from "../../components/user/Footer.vue";
export default {
  name: "Homepage",
  components: {
    ContactComponent,
    Footer,
  },
};
</script>

<style>
</style>