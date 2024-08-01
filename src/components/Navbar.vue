<template>
  <nav>
    <img src="/assets/images/vite.svg" alt="Logo" class="logo" />
    <router-link to="/">{{ translate('home') }}</router-link>
    <a v-if="!userStore.isAuthenticated" @click.prevent="openLoginModal">{{ translate('login') }}</a>
    <a v-if="!userStore.isAuthenticated" @click.prevent="openRegisterModal">{{ translate('register') }}</a>
    <router-link to="/passwordRecovery">{{ translate('passwordRecovery') }}</router-link>
    <router-link to="/admin">{{ translate('admin') }}</router-link>
    <a v-if="userStore.isAuthenticated" @click.prevent="logout">{{ translate('logout') }}</a>

    <select @change="changeLanguage" v-model="currentLanguage">
      <option value="en">English</option>
      <option value="fr">Français</option>
      <!-- Ajoutez d'autres langues si nécessaire -->
    </select>

    <Modal v-if="isLoginModalOpen" @close="isLoginModalOpen = false">
      <Login @close="isLoginModalOpen = false" />
    </Modal>

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

const isLoginModalOpen = ref(false);
const isRegisterModalOpen = ref(false);

const openLoginModal = () => {
  isLoginModalOpen.value = true;
}

const openRegisterModal = () => {
  isRegisterModalOpen.value = true;
}

const userStore = useUserStore();
const translationStore = useTranslationStore();

const logout = () => {
  userStore.logout();
}

const currentLanguage = ref(translationStore.getCurrentLanguage());

const translate = (id) => {
  return translationStore.translateString(id);
}

const changeLanguage = (event) => {
  const language = event.target.value;
  translationStore.setCurrentLanguage(language);
  currentLanguage.value = language;
  // Recharger les traductions si nécessaire
  translationStore.fetchTranslations();
}

// Regarder les changements dans la langue actuelle et recharger les traductions
watch(currentLanguage, () => {
  translationStore.fetchTranslations();
});

</script>

<style src="../assets/styles/Navbar.scss"></style>
