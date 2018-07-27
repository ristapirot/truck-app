<template>
    <v-button @click="getTrucks">GET TRUCKS</v-button>
</template>

<script>
  import Api from '../services/Api'

  export default {
    name: 'Home',
    data() {
      
    },
    methods: {
      async getTrucks() {
        const result = await Api().get('/trucks')
        console.log(result)
      }
    }
  }
</script>

<style scoped>

</style>
