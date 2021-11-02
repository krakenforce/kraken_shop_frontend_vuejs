<template>
    <v-container>
        <v-row justify="center">
            <v-col >
                <v-carousel  cycle>
                    <v-carousel-item
                        v-for="(item,i) in items"
                        :key="i"
                        :src="item.src"
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
    name: 'Carousel',

   data () {
      return {
        items: [
          {
            src: require("../../assets/user/img-carousel1.jpg"),
          },
          {
            src: require("../../assets/user/img-carousel2.jpg"),
          },
          {
            src: require("../../assets/user/img-carousel3.jpg"),
          },
        ],
      }
    },
  }
</script>
<style scoped>

</style>
