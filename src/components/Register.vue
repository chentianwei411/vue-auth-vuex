<template>
  <div>
    <h4>Register</h4>
    <form @subimt.prevent="register">
      <div>
        <label for="name">name</label>
        <input id="name" type="text" v-model="name" required autofocus />
      </div>
      <div>
        <label for="email">E-mail address</label>
        <input id="email" type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" required />
      </div>
      <div>
        <label for="password-confirm">Confirm Password</label>
        <input id="password-confirm" type="password" v-model="password_confirmation" required>
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name : "",
        email : "",
        password : "",
        password_confirmation : "",
        is_admin : null
      }
    },
    methods: {
      register() {
        let data = {
          name: this.name,
          email: this.email,
          password: this.password,
          is_admin: this.is_admin
        }
        this.$store.dispatch('register', data)
        .then(() => this.$router.push('/'))
        .catch(error => console.log(error))
      }
    }
  }
</script>
