<template>
  <nav>
    <img src="/assets/images/vite.svg" alt="Logo" class="logo" />
    <router-link to="/">{{ translate('home') }}</router-link>
    <!-- Show login link if the user is not authenticated -->
    <a v-if="!userStore.isAuthenticated" @click.prevent="openLoginModal">{{ translate('login') }}</a>
    <!-- Show register link if the user is not authenticated -->
    <a v-if="!userStore.isAuthenticated" @click.prevent="openRegisterModal">{{ translate('register') }}</a>
    <router-link to="/passwordRecovery">{{ translate('passwordRecovery') }}</router-link>
    <router-link to="/admin">{{ translate('admin') }}</router-link>
    <!-- Show logout link if the user is authenticated -->
    <a v-if="userStore.isAuthenticated" @click.prevent="logout">{{ translate('logout') }}</a>

    <!-- Language selection dropdown -->
    <select @change="changeLanguage" v-model="currentLanguage">
      <option value="en">English</option>
      <option value="fr">Français</option>
    </select>

    <!-- Login modal -->
    <Modal v-if="isLoginModalOpen" @close="isLoginModalOpen = false">
      <Login @close="isLoginModalOpen = false" />
    </Modal>

    <!-- Register modal -->
    <Modal v-if="isRegisterModalOpen" @close="isRegisterModalOpen = false">
      <Register @close="isRegisterModalOpen = false" />
    </Modal>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useUserStore } from '../store/userStore';
import { useTranslationStore } from '../store/translationStore';
import Modal from './Modal.vue';
import Login from './Login.vue';
import Register from './Register.vue';

// State variables for controlling modals
const isLoginModalOpen = ref(false);
const isRegisterModalOpen = ref(false);

// Function to open the login modal
const openLoginModal = () => {
  isLoginModalOpen.value = true;
}

// Function to open the register modal
const openRegisterModal = () => {
  isRegisterModalOpen.value = true;
}

const userStore = useUserStore();
const translationStore = useTranslationStore();

// Function to log out the user
const logout = () => {
  userStore.logout();
}

// State variable for the current language
const currentLanguage = ref(translationStore.getCurrentLanguage());

// Function to translate strings based on the current language
const translate = (id) => {
  return translationStore.translateString(id);
}

// Function to change the language
const changeLanguage = (event) => {
  const language = event.target.value;
  translationStore.setCurrentLanguage(language);
  currentLanguage.value = language;
  translationStore.fetchTranslations();
}

// Watcher to fetch translations whenever the language changes
watch(currentLanguage, () => {
  translationStore.fetchTranslations();
});

</script>

<style src="../assets/styles/Navbar.scss"></style>
