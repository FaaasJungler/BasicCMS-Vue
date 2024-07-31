<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal">
      <button class="close-button" @click="close">X</button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close']);

const close = () => {
  emit('close');
}
</script>

<style src="../assets/styles/Modal.scss"></style>
