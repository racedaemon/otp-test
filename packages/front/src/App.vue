<template>
  <header>
  </header>

  <main>
    <OtpRequest :users="users" />
    <PasswordCheck :users="users" />
  </main>
</template>

<script>
import OtpRequest from './components/OtpRequest.vue';
import PasswordCheck from './components/PasswordCheck.vue';

export default {
  components: {
    OtpRequest,
    PasswordCheck
},
  data() {
    return {
      users: []
    }
  },
  async mounted() {
    this.users = (await fetch("http://localhost:3333/api/v1/users").then(res => res.json()))
  }
}
</script>
