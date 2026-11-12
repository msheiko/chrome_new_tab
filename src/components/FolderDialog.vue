<template>
  <!--
    Нативный <dialog> через showModal(): верхний слой без z-index и Teleport,
    закрытие по Esc, фокус внутри окна и неактивный фон — силами браузера.
  -->
  <dialog ref="el" class="dialog" :aria-label="name" @click.self="close">
    <div class="panel">
      <h2>{{ name }}</h2>
      <div class="sites">
        <SiteCard v-for="s in sites" :key="s.url" :site="s" />
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { useTemplateRef } from 'vue';
import SiteCard from './SiteCard.vue';

defineProps({
  name: { type: String, required: true },
  sites: { type: Array, required: true },
});

const el = useTemplateRef('el');

const open = () => el.value.showModal();
// Клики по ::backdrop приходят на сам <dialog>; .panel занимает всё его содержимое,
// поэтому @click.self срабатывает только вне панели
const close = () => el.value.close();

defineExpose({ open, close });
</script>

<style scoped>
.dialog {
  max-width: min(760px, calc(100vw - 40px));
  max-height: 90vh;
  padding: 0;
  border: 0;
  border-radius: 28px;
  background: rgba(128, 128, 128, 0.35);
  backdrop-filter: blur(24px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  color: #fff;
  opacity: 0;
  transform: scale(0.6);
  transition:
    opacity 0.25s ease,
    transform 0.3s var(--ease-spring),
    overlay 0.3s allow-discrete,
    display 0.3s allow-discrete;
}

.dialog[open] {
  opacity: 1;
  transform: none;
}

.dialog::backdrop {
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
  opacity: 0;
  transition:
    opacity 0.25s ease,
    overlay 0.3s allow-discrete,
    display 0.3s allow-discrete;
}

.dialog[open]::backdrop {
  opacity: 1;
}

@starting-style {
  .dialog[open] {
    opacity: 0;
    transform: scale(0.6);
  }

  .dialog[open]::backdrop {
    opacity: 0;
  }
}

.panel {
  padding: 24px 32px 32px;
}

h2 {
  margin: 0 0 20px;
  text-align: center;
  font: 600 18px var(--font);
}

.sites {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
}

.sites :deep(.logo) {
  background: none;
}

@media (prefers-reduced-motion: reduce) {
  .dialog,
  .dialog::backdrop {
    transition: none;
  }
}
</style>
