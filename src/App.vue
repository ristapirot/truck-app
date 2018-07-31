<template>
  <v-app id="inspire">
    <v-content>
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    created() {
      this.$store.dispatch('initTrucks')
      this.$store.dispatch('initTrailers')
      this.$store.dispatch('initEmployees')
      this.$store.dispatch('initFleets')
      this.$store.dispatch('initInvoices')
    }
  }
</script>

