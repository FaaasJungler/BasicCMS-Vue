<template>
  <header class="hero">
    <div class="hero-content">
      <h1 class="hero-title">{{ title }}</h1>
      <p class="hero-subtitle">{{ subtitle }}</p>
      <a href="#" class="hero-button">{{ buttonText }}</a>
    </div>
  </header>
</template>

<script>

export default {
  name: 'Header',
  props: {
    title: String,
    subtitle: String,
    buttonText: String
  }
};

</script>
<style src="../assets/styles/Header.scss"></style>
