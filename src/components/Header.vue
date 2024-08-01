<<template>
  <header class="hero">
    <div class="hero-content">
      <h1 class="hero-title">{{ title }}</h1>
      <p class="hero-subtitle">{{ subtitle }}</p>
      <a href="#" class="hero-button" @click.prevent="showCover">{{ buttonText }}</a>
    </div>
    <div v-if="coverVisible" class="cover" @mousemove="updateCursor">
      <div class="cursor-spot" :style="cursorStyle"></div>
    </div>
    <img v-if="coverVisible" @click="hideCover" class="close-button" :style="randomPositionStyle" src="/assets/images/judgment.png" alt="Close" />
    <h2 v-if="coverVisible" class="disappointed" >{{ translate('disappointedGuy') }}</h2>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTranslationStore } from '../store/translationStore';

const props = defineProps({
  title: String,
  subtitle: String,
  buttonText: String
});

const translationStore = useTranslationStore();

const translate = (id) => {
  return translationStore.translateString(id);
};

const coverVisible = ref(false);
const cursorX = ref(0);
const cursorY = ref(0);

const randomTop = ref(0);
const randomLeft = ref(0);

const showCover = () => {
  coverVisible.value = true;
  window.addEventListener('mousemove', updateCursor);
  setRandomPosition();
};

const hideCover = () => {
  coverVisible.value = false;
  window.removeEventListener('mousemove', updateCursor);
};

const updateCursor = (event) => {
  cursorX.value = event.clientX;
  cursorY.value = event.clientY;
};

const cursorStyle = computed(() => ({
  top: `${cursorY.value - 30}px`,
  left: `${cursorX.value - 30}px`,
}));

const setRandomPosition = () => {
  randomTop.value = Math.random() * 80 + 10;
  randomLeft.value = Math.random() * 80 + 10;
};

const randomPositionStyle = computed(() => ({
  top: `${randomTop.value}vh`,
  left: `${randomLeft.value}vw`,
}));

</script>

<style src="../assets/styles/Header.scss"></style>
