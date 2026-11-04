<template>
  <BaseCard
    tag="button"
    type="button"
    size="folder"
    :label="`${name} · ${sites.length}`"
    aria-haspopup="dialog"
    @click="dialog.open()"
  >
    <div class="preview" :class="{ single: preview.length === 1 }">
      <img v-for="s in preview" :key="s.url" :src="s.image" alt="" />
    </div>
  </BaseCard>

  <FolderDialog ref="dialog" :name="name" :sites="sites" />
</template>

<script setup>
import { computed, useTemplateRef } from 'vue';
import BaseCard from './BaseCard.vue';
import FolderDialog from './FolderDialog.vue';
import { folderPreview } from '../lib/layout.js';

const props = defineProps({
  name: { type: String, required: true },
  sites: { type: Array, required: true },
});

const dialog = useTemplateRef('dialog');
// Одинаковые логотипы показываются один раз
const preview = computed(() => folderPreview(props.sites));
</script>

<style scoped>
.preview {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  width: 112px;
  padding: 10px;
  border-radius: 18px;
  background: rgba(128, 128, 128, 0.2);
}

.preview.single {
  grid-template-columns: 1fr;
  width: 96px;
}

.preview img {
  width: 100%;
  aspect-ratio: 1;
  box-sizing: border-box;
  padding: 4px;
  border-radius: 8px;
  background: var(--icon-bg);
  object-fit: contain;
}
</style>
