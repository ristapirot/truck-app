<template>
  <div>
    <Header></Header>
    <h1>Trucks in log</h1>
    <ButtonAdd />
  </div>
  
</template>

<script>
  import AuthenticationService from '../services/AuthenticationService'
  import Header from './Header.vue'
  import ButtonAdd from './ButtonAdd.vue'

  export default {
    name: 'Home',
    data() {
      return {

      }
    },
    mounted() {
      if (!(localStorage.getItem('token') && localStorage.getItem('isLogged'))) {
        this.$router.push({name: 'Login'})
      }
    },
    components: {
      Header,
      ButtonAdd
    }
  }
</script>

<style scoped>

</style>
