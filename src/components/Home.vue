<template>
  <div class="home">
   <Header
      title="Your Animated Text Goes Here"
      subtitle="A brief description of your content"
      buttonText="Get Started"
   />
  </div>
</template>

<script>
import Header from "./Header.vue";

export default {
  name: 'Home',
  components: {Header},
};
</script>
<style src="../assets/styles/Home.scss"></style>
