<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit" :disabled="loading">Register</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'; // Ajout de computed
import { useUserStore } from '../store/userStore';

const emit = defineEmits(['close']);

const email = ref('');
const password = ref('');

const userStore = useUserStore();
const register = () => {
  userStore.register(email.value, password.value);
}

const loading = computed(() => userStore.loading);
const error = computed(() => userStore.error);

watch(() => userStore.isRegisterSuccess, (newVal) => {
  if (newVal) {
    emit('close');
  }
});
</script>

<style src="../assets/styles/Register.scss"></style>
