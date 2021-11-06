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
  data() {
    return {
      currentUser: null,
    }
  },
  methods: {
    handleClick(){
      this.$store.test.dispatch('increment')
    }

  },
  computed: {
    count(){
      console.log(this.$store.test.state.count)
      return this.$store.test.state.count
    }
  }

};
</script>

<style lang="scss" scoped>
</style>