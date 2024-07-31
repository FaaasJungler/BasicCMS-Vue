<template>
  <nav>
    <img src="/assets/images/vite.svg" alt="Logo" class="logo" />
    <router-link to="/">Home</router-link>
    <a v-if="!userStore.isAuthenticated" @click.prevent="openLoginModal">Login</a>
    <a v-if="!userStore.isAuthenticated" @click.prevent="openRegisterModal">Register</a>
    <router-link to="/passwordRecovery">Password Recovery</router-link>
    <router-link to="/admin">Admin</router-link>
    <a v-if="userStore.isAuthenticated" @click.prevent="logout">Logout</a>

    <Modal v-if="isLoginModalOpen" @close="isLoginModalOpen = false">
      <Login @close="isLoginModalOpen = false" />
    </Modal>

    <Modal v-if="isRegisterModalOpen" @close="isRegisterModalOpen = false">
      <Register @close="isRegisterModalOpen = false" />
    </Modal>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../store/userStore';
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

const logout = () => {
  userStore.logout();
}
</script>

<style src="../assets/styles/Navbar.scss"></style>
