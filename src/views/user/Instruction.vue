<template>
  <v-container justify="center">
    <v-row justify="center" no-gutters>
      <v-col cols="12" sm="12">
        <div class="ma-5 pa-5">
          <v-container class="text-center" black justify="center" fill-height>
            <v-row>
              <v-col cols="auto">
                <InstructionComponent />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12">
                <Footer />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import InstructionComponent from "../../components/user/InstructionComponent.vue";
import Footer from "../../components/user/Footer.vue";
export default {
  name: "Instruction",
  components: {
  
    InstructionComponent,
    Footer,
  },
};
</script>

<style>
</style>