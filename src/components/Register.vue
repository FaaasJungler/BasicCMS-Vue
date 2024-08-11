<template>
  <div class="register">
    <h1>{{ translate('registerTitle') }}</h1>
    <!-- Form for user registration -->
    <form @submit.prevent="register">
      <!-- Input field for email with placeholder translation -->
      <input type="email" v-model="email" :placeholder="translate('emailPlaceholder')" required />
      <!-- Input field for password with placeholder translation -->
      <input type="password" v-model="password" :placeholder="translate('passwordPlaceholder')" required />
      <!-- Submit button for the registration form -->
      <button type="submit" :disabled="loading">{{ translate('registerButton') }}</button>
    </form>
    <!-- Display error message if there is an error -->
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useUserStore } from '../store/userStore';
import { useTranslationStore } from '../store/translationStore';

// Emit event to close the modal
const emit = defineEmits(['close']);

// Reactive references for email and password input fields
const email = ref('');
const password = ref('');

// Access the user store and translation store
const userStore = useUserStore();
const translationStore = useTranslationStore();

// Function to translate strings based on the current language
const translate = (id) => {
  return translationStore.translateString(id);
};

// Function to handle user registration
const register = () => {
  userStore.register(email.value, password.value);
};

// Computed properties to get loading state and error message from the user store
const loading = computed(() => userStore.loading);
const error = computed(() => userStore.error);

// Watcher to emit close event if registration is successful
watch(() => userStore.isRegisterSuccess, (newVal) => {
  if (newVal) {
    emit('close');
  }
});
</script>

<style src="../assets/styles/Register.scss"></style>
