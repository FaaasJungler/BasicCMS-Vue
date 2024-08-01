<template>
  <div>
    <h2>{{ translate('translations') }}</h2>
    <table>
      <thead>
      <tr>
        <th>{{ translate('id') }}</th>
        <th v-for="language in sortedLanguages" :key="language">{{ language }}</th>
        <th>
          <button @click="addLanguage">+</button>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><input v-model="newTranslation.id" :placeholder="translate('newId')" /></td>
        <td v-for="language in sortedLanguages" :key="language">
          <input v-model="newTranslation[language]" :placeholder="`New ${language}`" />
        </td>
        <td>
          <button @click="addNewTranslation">{{ translate('add') }}</button>
        </td>
      </tr>
      <tr v-for="(translation, id) in sortedTranslations" :key="id">
        <td>{{ id }}</td>
        <td v-for="language in sortedLanguages" :key="language">
          <input v-model="translations[id][language]" @blur="saveTranslation(id, language)" />
        </td>
        <td>
          <button @click="saveTranslation(id)">{{ translate('save') }}</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTranslationStore } from '../../store/translationStore';

const translationStore = useTranslationStore();

onMounted(() => {
  translationStore.fetchTranslations().then(() => {
    ensureAllLanguages();
  });
});

const translations = ref({});
const newTranslation = ref({ id: '' });

const loadTranslations = () => {
  translations.value = { ...translationStore.translations };
};

onMounted(loadTranslations);

const languages = ref([]);

const updateLanguages = () => {
  const allTranslations = translations.value;
  const firstTranslation = Object.values(allTranslations)[0];
  if (firstTranslation) {
    languages.value = Object.keys(firstTranslation);
  }
};

const ensureAllLanguages = () => {
  updateLanguages();

  // Ensure all translations have all languages
  const allLanguages = new Set(languages.value);
  Object.values(translations.value).forEach(translation => {
    Object.keys(translation).forEach(lang => {
      allLanguages.add(lang);
    });
  });

  languages.value = Array.from(allLanguages);

  // Update each translation to include all languages
  Object.keys(translations.value).forEach(id => {
    languages.value.forEach(lang => {
      if (!translations.value[id][lang]) {
        translations.value[id][lang] = '';
      }
    });
  });
};

const sortedLanguages = computed(() => {
  return languages.value.slice().sort();
});

const sortedTranslations = computed(() => {
  const allTranslations = translations.value;
  return Object.keys(allTranslations)
      .sort()
      .reduce((acc, key) => {
        acc[key] = allTranslations[key];
        return acc;
      }, {});
});

const translate = (id) => {
  return translationStore.translateString(id);
};

const addNewTranslation = async () => {
  const id = newTranslation.value.id.trim();
  if (!id) return;

  const newTrans = {};
  languages.value.forEach((lang) => {
    newTrans[lang] = newTranslation.value[lang] || '';
  });

  await translationStore.addTranslation(id, newTrans);
  newTranslation.value = { id: '' };
  loadTranslations();
  ensureAllLanguages();
};

const addLanguage = () => {
  const newLang = prompt(translate('enterNewLanguageCode'));
  if (newLang && !languages.value.includes(newLang)) {
    languages.value.push(newLang);
    Object.keys(translations.value).forEach((id) => {
      translations.value[id][newLang] = '';
    });
    newTranslation.value[newLang] = '';
  }
};

const saveTranslation = async (id, language = null) => {
  if (language) {
    await translationStore.saveTranslation(id, { [language]: translations.value[id][language] });
  } else {
    await translationStore.saveTranslation(id, translations.value[id]);
  }
};

</script>
