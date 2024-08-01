<template>
  <div class="password-recovery">
    <h1>{{ translate('passwordRecoveryTitle') }}</h1>
  </div>
</template>

<script setup>
import { useTranslationStore } from '../store/translationStore';

const translationStore = useTranslationStore();

const translate = (id) => {
  return translationStore.translateString(id);
};
</script>
