<template>
  <button type="button" class="box folder" @click="open = true">
    <div class="card-image">
      <div class="folder-grid" :class="{ single: preview.length === 1 }">
        <img v-for="s in preview" :key="s.url" :src="s.image" :alt="s.title" />
      </div>
    </div>
    <div class="card-action">
      <span>{{ name }} · {{ sites.length }}</span>
    </div>
  </button>

  <Teleport to="body">
    <Transition name="folder">
      <div v-if="open" class="overlay" @click.self="open = false">
        <div class="panel" role="dialog" :aria-label="name">
          <h2>{{ name }}</h2>
          <div class="panel-sites">
            <SiteItem v-for="s in sites" :key="s.url" :site="s" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue';
import SiteItem from './SiteItem.vue';

const props = defineProps({
  name: { type: String, required: true },
  sites: { type: Array, required: true },
});

const open = ref(false);
// Если у всех сайтов одинаковый логотип, показываем его один раз
const preview = computed(() => {
  const unique = [...new Map(props.sites.map((s) => [s.image, s])).values()];
  return unique.slice(0, 4);
});

const onKeydown = (e) => {
  if (e.key === 'Escape') open.value = false;
};

watch(open, (value) => {
  if (value) window.addEventListener('keydown', onKeydown);
  else window.removeEventListener('keydown', onKeydown);
});

onUnmounted(() => window.removeEventListener('keydown', onKeydown));
</script>

<style scoped>
.box {
  display: block;
  flex: 0 0 260px;
  height: 190px;
  padding: 0;
  border: 0;
  cursor: pointer;
  overflow: hidden;
  border-radius: 5px;
  font-family: 'Fira Code', system-ui, sans-serif;
  font-size: 14px;
  background: var(--card-bg);
  color: var(--text-color);
  box-shadow: var(--card-shadow);
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.box:hover {
  box-shadow: var(--card-shadow-hover);
}

.card-image {
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.folder-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  width: 112px;
  padding: 10px;
  border-radius: 18px;
  background: rgba(128, 128, 128, 0.2);
}

.folder-grid.single {
  grid-template-columns: 1fr;
  width: 96px;
}

.folder-grid img {
  width: 100%;
  aspect-ratio: 1;
  box-sizing: border-box;
  padding: 4px;
  border-radius: 8px;
  background: #fff;
  object-fit: contain;
}

.card-action span {
  display: block;
  text-align: center;
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
}

.panel {
  max-width: 760px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px 32px 32px;
  border-radius: 28px;
  background: rgba(128, 128, 128, 0.35);
  backdrop-filter: blur(24px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
}

.panel h2 {
  margin: 0 0 20px;
  text-align: center;
  font: 600 18px 'Fira Code', system-ui, sans-serif;
  color: #fff;
}

.panel-sites {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
}

.folder-enter-active,
.folder-leave-active {
  transition: opacity 0.25s ease;
}

.folder-enter-active .panel,
.folder-leave-active .panel {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.folder-enter-from,
.folder-leave-to {
  opacity: 0;
}

.folder-enter-from .panel,
.folder-leave-to .panel {
  transform: scale(0.6);
}
</style>
