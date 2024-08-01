<template>
  <div class="admin">
    <h1>{{ translate('adminTitle') }}</h1>
    <TranslationTable />
  </div>
</template>

<script setup>
import { useTranslationStore } from '../../store/translationStore';
import { ref, watch } from 'vue';
import TranslationTable from './TranslationTable.vue';

const translationStore = useTranslationStore();

const translate = (id) => {
  return translationStore.translateString(id);
};

watch(() => translationStore.translations, () => {}, { immediate: true });

</script>

<style src="../../assets/styles/Admin/Admin.scss"></style>
