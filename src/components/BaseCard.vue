<template>
  <component :is="tag" class="card" :class="`card--${size}`">
    <div class="card-media">
      <slot />
    </div>
    <span class="card-label">{{ label }}</span>
  </component>
</template>

<script setup>
// Общая оболочка карточки: размеры, фон, тень, подпись.
// Ссылка или кнопка определяется через tag, остальные атрибуты (href, @click) пробрасываются.
defineProps({
  tag: { type: String, default: 'a' },
  label: { type: String, required: true },
  size: { type: String, default: 'site', validator: (v) => ['site', 'folder'].includes(v) },
});
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 0 6px;
  border: 0;
  border-radius: var(--card-radius);
  overflow: hidden;
  cursor: pointer;
  font: inherit;
  text-decoration: none;
  background: var(--card-bg);
  color: var(--text-color);
  box-shadow: var(--card-shadow);
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: var(--card-shadow-hover);
}

.card:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}

.card--site {
  flex: 0 0 203px;
  height: 146px;
  font-size: 12px;
}

.card--folder {
  flex: 0 0 260px;
  height: 190px;
  font-size: 14px;
}

.card-media {
  flex: 1;
  min-height: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-label {
  text-align: center;
}

@media (max-width: 480px) {
  .card--site {
    flex-basis: 100%;
  }
}
</style>
