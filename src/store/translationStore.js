import { defineStore } from 'pinia';
import { collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config.js';

export const useTranslationStore = defineStore('translation', {
    state: () => ({
        translations: {}
    }),
    actions: {
        async fetchTranslations() {
            try {
                const querySnapshot = await getDocs(collection(db, 'translation'));
                const translations = {};
                querySnapshot.forEach((doc) => {
                    translations[doc.id] = doc.data();
                });
                this.translations = translations;
            } catch (error) {
                console.error('Erreur lors de la récupération des traductions:', error);
            }
        },
        translateString(id) {
            const currentLanguage = this.getCurrentLanguage();
            const translations = this.translations;

            if (translations[id] && translations[id][currentLanguage] && translations[id][currentLanguage] !== '') {
                return translations[id][currentLanguage];
            } else {
                this.addMissingTranslation(id);
                return id;
            }
        },
        async addMissingTranslation(id) {
            try {
                const docRef = doc(collection(db, 'translation'), id);
                await setDoc(docRef, { en: '' }, { merge: true });
                if (!this.translations[id]) {
                    this.translations[id] = { en: '' };
                }
            } catch (error) {
                console.error('Erreur lors de l\'ajout de la traduction manquante:', error);
            }
        },
        async addTranslation(id, translation) {
            try {
                const docRef = doc(collection(db, 'translation'), id);
                await setDoc(docRef, translation, { merge: true });
                this.translations[id] = translation;
            } catch (error) {
                console.error('Erreur lors de l\'ajout de la traduction:', error);
            }
        },
        async saveTranslation(id, translation) {
            try {
                const docRef = doc(collection(db, 'translation'), id);
                await updateDoc(docRef, translation);
                this.translations[id] = translation;
            } catch (error) {
                console.error('Erreur lors de la sauvegarde de la traduction:', error);
            }
        },
        setCurrentLanguage(language) {
            localStorage.setItem('currentLanguage', language);
        },
        getCurrentLanguage() {
            return localStorage.getItem('currentLanguage') || 'en';
        }
    }
});
