<template>
  <ModeToggle
    v-model="isHome"
    class="toggle-button"
    :on-label="HOME_LABEL"
    :off-label="WORK_LABEL"
  />
  <main>
    <Transition name="fade" mode="out-in">
      <div v-if="sites.length === 0" key="empty" class="empty-state">
        <p>Нет сайтов в режиме "{{ isHome ? HOME_LABEL : WORK_LABEL }}"</p>
      </div>
      <TransitionGroup v-else name="site-list" tag="div" class="sites-container">
        <SiteItem v-for="site in sites" :key="site.url" :site="site" />
      </TransitionGroup>
    </Transition>
  </main>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import ModeToggle from './ModeToggle.vue';
import SiteItem from './SiteItem.vue';
import allSites from './data.json';

const STORAGE_KEY = 'mode';
const HOME_LABEL = 'Home';
const WORK_LABEL = 'Work';

const loadMode = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

const isHome = ref(loadMode());

watch(isHome, (value) => {
  try {
    localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // Режим просто не сохранится между вкладками
  }
});

const sites = computed(() => allSites.filter((s) => s.home === isHome.value));
</script>

<style>
:root {
  --bg-color: rgb(167, 167, 167);
  --text-color: rgb(65, 65, 65);
  --text-color-secondary: rgb(100, 100, 100);
  --card-bg: #ffffff;
  --card-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  --card-shadow-hover: rgba(14, 30, 37, 0.2) 0px 4px 8px 0px,
    rgba(14, 30, 37, 0.4) 0px 4px 20px 0px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: rgb(30, 30, 30);
    --text-color: rgb(220, 220, 220);
    --text-color-secondary: rgb(150, 150, 150);
    --card-bg: rgb(70, 70, 70);
    --card-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px 0px,
      rgba(0, 0, 0, 0.5) 0px 2px 16px 0px;
    --card-shadow-hover: rgba(0, 0, 0, 0.45) 0px 4px 8px 0px,
      rgba(0, 0, 0, 0.7) 0px 4px 20px 0px;
  }
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

main {
  padding-top: 40px;
  position: relative;
  min-height: 200px;
}

.sites-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 24px;
  column-gap: 40px;
}

.toggle-button {
  position: absolute;
  right: 10px;
  top: 10px;
  transition: transform 0.2s ease;
  z-index: 10;
}

.toggle-button:hover {
  transform: scale(1.05);
}

.empty-state {
  width: 100%;
  text-align: center;
  padding: 60px 20px;
  color: var(--text-color-secondary);
  font-size: 18px;
}

/* Анимации переключения */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Анимации для списка сайтов */
.site-list-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.site-list-leave-active {
  transition: all 0.3s ease;
  position: absolute;
}

.site-list-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(-20px);
}

.site-list-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

.site-list-move {
  transition: transform 0.4s ease;
}

@media (max-width: 768px) {
  main {
    padding: 40px 10px 20px;
  }
}
</style>
