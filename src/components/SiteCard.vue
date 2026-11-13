<template>
  <BaseCard :href="site.url" :label="site.title" rel="noopener noreferrer">
    <img
      v-if="!imageFailed"
      class="logo"
      :src="site.image"
      :alt="site.title"
      loading="lazy"
      @error="imageFailed = true"
    />
    <div v-else class="placeholder" aria-hidden="true">{{ initial }}</div>
  </BaseCard>
</template>

<script setup>
import { computed, ref } from 'vue';
import BaseCard from './BaseCard.vue';

const props = defineProps({
  site: { type: Object, required: true },
});

const imageFailed = ref(false);
const initial = computed(() => props.site.title.charAt(0).toUpperCase());
</script>

<style scoped>
.logo {
  display: block;
  max-width: 70%;
  max-height: 70%;
  box-sizing: border-box;
  padding: 8px;
  background: var(--icon-bg);
  object-fit: contain;
  transition: transform 0.3s ease;
}

.card:hover .logo {
  transform: scale(1.05);
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 65px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 26px;
  font-weight: bold;
}
</style>
