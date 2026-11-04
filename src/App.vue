<template>
  <main class="grid">
    <template v-for="entry in layout" :key="entry.key">
      <FolderCard v-if="entry.type === 'folder'" :name="entry.name" :sites="entry.sites" />
      <SiteCard v-else :site="entry.site" />
    </template>
  </main>
</template>

<script setup>
import SiteCard from './components/SiteCard.vue';
import FolderCard from './components/FolderCard.vue';
import sites from './data/sites.json';
import { buildLayout } from './lib/layout.js';

// Данные статичны и вшиты в бандл, поэтому реактивность не нужна
const layout = buildLayout(sites);
</script>

<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px 40px;
  padding: 40px 0;
}

@media (max-width: 768px) {
  .grid {
    padding: 40px 10px 20px;
  }
}
</style>
