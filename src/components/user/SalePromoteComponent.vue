<template>
  <v-container class="text-left ml-10">
    <v-carousel
      cycle
      height="20"
      hide-delimiters
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(item, i) in salePromote" :key="i" link :to="item.contentUrl">
        <p class="yellow--text">{{item.title}}</p>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
export default {
  name: "SalePromoteComponent",
  props: ["salePromote"],
  data() {
    return {
      
    };
  },
};
</script>

<style lang="scss" scoped>
</style>