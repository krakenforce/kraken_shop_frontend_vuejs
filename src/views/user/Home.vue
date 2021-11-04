<template>
  <v-container id="abc">
    <v-main >
      <div>
          <router-view></router-view>
      </div>  
    </v-main>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  components: {
    
  },
};
</script>

<style lang="scss" scoped>
</style>