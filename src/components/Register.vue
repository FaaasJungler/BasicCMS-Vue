<template>
  <div class="register">
    <h1>{{ translate('registerTitle') }}</h1>
    <form @submit.prevent="register">
      <input type="email" v-model="email" :placeholder="translate('emailPlaceholder')" required />
      <input type="password" v-model="password" :placeholder="translate('passwordPlaceholder')" required />
      <button type="submit" :disabled="loading">{{ translate('registerButton') }}</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useUserStore } from '../store/userStore';
import { useTranslationStore } from '../store/translationStore';

const emit = defineEmits(['close']);

const email = ref('');
const password = ref('');

const userStore = useUserStore();
const translationStore = useTranslationStore();

const translate = (id) => {
  return translationStore.translateString(id);
};

const register = () => {
  userStore.register(email.value, password.value);
};

const loading = computed(() => userStore.loading);
const error = computed(() => userStore.error);

watch(() => userStore.isRegisterSuccess, (newVal) => {
  if (newVal) {
    emit('close');
  }
});
</script>

<style src="../assets/styles/Register.scss"></style>
