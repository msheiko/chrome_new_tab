<template>
  <a class="box" :href="site.url" rel="noopener noreferrer">
    <div class="card-image">
      <img
        v-if="!imageError"
        :src="site.image"
        :alt="site.title"
        loading="lazy"
        @error="imageError = true"
      />
      <div v-else class="image-placeholder">
        {{ site.title.charAt(0).toUpperCase() }}
      </div>
    </div>
    <div class="card-action">
      <span>{{ site.title }}</span>
    </div>
  </a>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  site: {
    type: Object,
    required: true,
  },
});

const imageError = ref(false);
</script>

<style scoped>
.box {
  display: block;
  flex: 0 0 203px;
  height: 146px;
  overflow: hidden;
  border-radius: 5px;
  font-family: 'Fira Code', system-ui, sans-serif;
  text-decoration: none;
  font-size: 12px;
  background: var(--card-bg);
  color: var(--text-color);
  box-shadow: var(--card-shadow);
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease,
    transform 0.2s ease;
}

.box:hover {
  box-shadow: var(--card-shadow-hover);
}

.card-image {
  height: 82%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-image img {
  display: block;
  max-width: 70%;
  max-height: 70%;
  box-sizing: border-box;
  padding: 8px;
  border-radius: 14px;
  background: var(--icon-bg);
  object-fit: contain;
  transition: transform 0.3s ease;
}

.box:hover img {
  transform: scale(1.05);
}

.card-action {
  padding-bottom: 6px;
}

.card-action span {
  display: block;
  text-align: center;
}

.image-placeholder {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: bold;
}

@media (max-width: 480px) {
  .box {
    flex-basis: 100%;
  }
}
</style>
