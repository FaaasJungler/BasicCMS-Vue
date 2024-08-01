<template>
  <footer>
    <p>&copy; {{ translate('footerText') }}</p>
  </footer>
</template>

<script setup>
import { useTranslationStore } from '../store/translationStore';

const translationStore = useTranslationStore();

const translate = (id) => {
  return translationStore.translateString(id);
};
</script>

<style src="../assets/styles/Footer.scss"></style>
