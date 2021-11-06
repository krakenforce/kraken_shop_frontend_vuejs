<template>
  <div>
    <v-data-table
      :page="1"
      :pageCount="totalPages"
      :items="vipUserClasses"
      :options.sync="options"
      :server-items-length="totalItems"
      :loading="loading"
      class="elevation-1"
      :headers=""
      @click:row=""
    ></v-data-table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props:{
      headers,
  }
};
</script>

<style lang="scss" scoped>
</style>