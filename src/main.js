// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './store';
import { initializeAuthObserver } from './store/userStore';
import { useTranslationStore } from './store/translationStore';
import './assets/styles/styles.scss';

const app = createApp(App);

app.use(pinia);
app.use(router);

const translationStore = useTranslationStore();

initializeAuthObserver();
translationStore.fetchTranslations().then(() => {
    app.mount('#app');
})
