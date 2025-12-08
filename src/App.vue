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
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  background: rgb(167, 167, 167);
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
  color: rgb(100, 100, 100);
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
