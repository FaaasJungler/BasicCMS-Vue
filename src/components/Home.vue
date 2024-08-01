<template>
  <div class="home">
    <Header
        :title="translate('headerTitle')"
        :subtitle="translate('headerSubtitle')"
        :buttonText="translate('headerButtonText')"
    />
  </div>
</template>

<script setup>
import { useTranslationStore } from '../store/translationStore';
import { ref, watch } from 'vue';
import Header from './Header.vue';

const translationStore = useTranslationStore();

const translate = (id) => {
  return translationStore.translateString(id);
};

watch(() => translationStore.translations, () => {}, { immediate: true });

</script>

<style src="../assets/styles/Home.scss"></style>
