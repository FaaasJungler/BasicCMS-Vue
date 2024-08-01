<template>
  <div class="app">
    <Navbar />
    <div class="main-container">
      <router-view />
    </div>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<style scoped>
</style>