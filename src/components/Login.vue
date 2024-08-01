<template>
  <div class="login">
    <h1>{{ translate('loginTitle') }}</h1>
    <form @submit.prevent="login">
      <input type="email" v-model="email" :placeholder="translate('emailPlaceholder')" required />
      <input type="password" v-model="password" :placeholder="translate('passwordPlaceholder')" required />
      <button type="submit">{{ translate('loginButton') }}</button>
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

const login = () => {
  userStore.login(email.value, password.value);
};

const loading = computed(() => userStore.loading);
const error = computed(() => userStore.error);

watch(() => userStore.isLoginSuccess, (newVal) => {
  if (newVal) {
    emit('close');
  }
});
</script>

<style src="../assets/styles/Login.scss"></style>
