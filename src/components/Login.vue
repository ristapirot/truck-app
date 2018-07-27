<template>
  <form class="loginForm">
      <h1>Login</h1>
    <v-text-field
      v-model="email"
      label="E-mail"
      data-vv-name="email"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="Password"
      data-vv-name="name"
      required
    ></v-text-field>

    <v-btn @click="login">submit</v-btn>
  </form>
</template>

<script>
    import AuthenticationService from '../services/AuthenticationService'

  export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async login() {
           const response = await AuthenticationService.login({
               email: this.email,
               password: this.password
           })
           this.$router.push({name: 'Home'})
        }
    }
  }
</script>

<style scoped>
    .loginForm {
        width: 60%;
        margin: 20% auto;
    }

    h1 {
        margin: 5% auto;
    }
</style>
