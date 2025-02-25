// LoginView.vue
<template>
  <div class="login-container">
    <h2>Login</h2>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';
export default {
  components: { LoginForm }
}
</script>