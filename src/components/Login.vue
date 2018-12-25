<template>
  <div>
    <form class="login" @subimt.prevent="login">
      <h1>Sign in</h1>
      <div>
        <label>Email</label>
        <input required v-model="email" type="email" placeholder="email" />
      </div>
      <div>
        <label>Password</label>
        <input required v-model="password" type="password" placeholder="Password" />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: "",
        password: ""
      }
    },
    methods: {
      login() {
        let email = this.Email
        let password = this.password
        this.$store.dispatch('login', {email, password})
        .then(() => this.$router.push('/'))
        .catch(error => console.log(error))
      }
    }
  }
</script>
