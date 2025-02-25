// RegisterView.vue
<template>
  <div class="register-container">
    <h2>Register</h2>
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm.vue';
export default {
  components: { RegisterForm }
}
</script>