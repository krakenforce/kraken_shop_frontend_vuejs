<template>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-10">
            <v-card-title primary-title>
                <h1 class="red--text">Top up fail, Please try again 😭</h1>
            </v-card-title>
        </v-card>
      </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'PaymentCancel',
        methods: {
            redirectToHomePage(){
                this.$router.push("/")
            }
        },
        mounted() {
            setTimeout(() => {
                localStorage.removeItem("sum");
                this.redirectToHomePage();
            },3000)
        }
    }

</script>

<style lang="scss" scoped>

</style>