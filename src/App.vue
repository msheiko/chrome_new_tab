<template>
  <main>
    <TransitionGroup name="site-list" tag="div" class="sites-container">
      <template v-for="item in items" :key="item.key">
        <GroupItem v-if="item.group" :name="item.group" :sites="item.sites" />
        <SiteItem v-else :site="item.site" />
      </template>
    </TransitionGroup>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import SiteItem from './SiteItem.vue';
import GroupItem from './GroupItem.vue';
import allSites from './data.json';

// Сайты с одинаковым group схлопываются в одну папку на месте первого из них
const items = computed(() => {
  const result = [];
  const groups = new Map();
  for (const site of allSites) {
    if (!site.group) {
      result.push({ key: site.url, site });
    } else if (groups.has(site.group)) {
      groups.get(site.group).sites.push(site);
    } else {
      const entry = { key: `group:${site.group}`, group: site.group, sites: [site] };
      groups.set(site.group, entry);
      result.push(entry);
    }
  }
  return result;
});
</script>

<style>
:root {
  --bg-color: rgb(167, 167, 167);
  --text-color: rgb(65, 65, 65);
  --text-color-secondary: rgb(100, 100, 100);
  --card-bg: #ffffff;
  --icon-bg: #e4e7eb;
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
    --icon-bg: #ffffff;
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
