<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-carousel cycle>
          <v-carousel-item
            v-for="item in homepageBanners"
            :key="item.id"
            :src="item.imageUrl"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Carousel",
  props:['homepageBanners', 'itemNumber'],

  data() {
    return {
    };
  },
};
</script>
<style scoped>
</style>
