<template>
  <label class="mode-toggle">
    <input v-model="model" type="checkbox" role="switch" />
    <span class="track">
      <span class="label">{{ model ? onLabel : offLabel }}</span>
      <span class="handle" />
    </span>
  </label>
</template>

<script setup>
const model = defineModel({ type: Boolean, required: true });

defineProps({
  onLabel: { type: String, required: true },
  offLabel: { type: String, required: true },
});
</script>

<style scoped>
.mode-toggle {
  display: inline-block;
  cursor: pointer;
  font-family: system-ui, sans-serif;
  user-select: none;
}

input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.track {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 56px;
  height: 22px;
  padding: 0 3px;
  box-sizing: border-box;
  border-radius: 11px;
  background: #e5e7eb;
  color: #374151;
  transition: background-color 0.3s ease, color 0.3s ease;
}

input:checked + .track {
  flex-direction: row-reverse;
  background: #10b981;
  color: #fff;
}

input:focus-visible + .track {
  outline: 2px solid #10b981;
  outline-offset: 2px;
}

.label {
  flex: 1;
  padding: 0 4px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
}

.handle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
</style>
