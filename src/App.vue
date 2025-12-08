<template>
  <Toggle
    class="toggle-button"
    @change="changeMode"
    v-model="mode"
    v-bind="labels"
  />
  <main>
    <div v-if="sites.length === 0" class="empty-state">
      <p>Нет сайтов в режиме "{{ mode ? 'Home' : 'Work' }}"</p>
    </div>
    <site-item v-else v-for="site in sites" :site="site" :key="site.url" />
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import SiteItem from "./SiteItem.vue";
import "@vueform/toggle/themes/default.css";
import Toggle from "@vueform/toggle";
import json from "./data.json";

const getSavedMode = () => {
  try {
    return localStorage.getItem("mode") === "true";
  } catch {
    return false;
  }
};

const savedMode = getSavedMode();
const mode = ref(savedMode);
const allSites = ref(json);

const labels = {
  onLabel: "Home",
  offLabel: "Work",
};

const sites = computed(() => {
  return allSites.value.filter((s) => s.home === mode.value);
});

const changeMode = (value) => {
  try {
    localStorage.setItem("mode", value);
    mode.value = value;
  } catch (e) {
     
    console.error("Failed to save mode to localStorage:", e);
    mode.value = value;
  }
};
</script>

<style>
:root {
  --bg-color: rgb(167, 167, 167);
  --text-color: rgb(65, 65, 65);
  --text-color-secondary: rgb(100, 100, 100);
  --card-bg: #ffffff;
  --card-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: rgb(30, 30, 30);
    --text-color: rgb(220, 220, 220);
    --text-color-secondary: rgb(150, 150, 150);
    --card-bg: rgb(45, 45, 45);
    --card-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px 0px,
      rgba(0, 0, 0, 0.5) 0px 2px 16px 0px;
  }
}

body {
  margin: 0;
  padding: 0;
  height: 100vh;
  background: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

main {
  padding-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 30px;
  column-gap: 50px;
}

.toggle-button {
  position: absolute;
  right: 10px;
  top: 10px;
}

.empty-state {
  width: 100%;
  text-align: center;
  padding: 60px 20px;
  color: var(--text-color-secondary);
  font-size: 18px;
}

@media (max-width: 768px) {
  main {
    padding: 20px 10px;
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .box {
    flex: 0 0 100%;
  }
}
</style>
