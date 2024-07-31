<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useUserStore } from '../store/userStore';

const emit = defineEmits(['close']);

const email = ref('');
const password = ref('');

const userStore = useUserStore();
const login = () => {
  userStore.login(email.value, password.value);
}

const loading = computed(() => userStore.loading);
const error = computed(() => userStore.error);

watch(() => userStore.isLoginSuccess, (newVal) => {
  if (newVal) {
    emit('close');
  }
});
</script>

<style src="../assets/styles/Login.scss"></style>
