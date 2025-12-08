<template>
  <a class="box" :href="site.url" target="_blank" rel="noopener noreferrer">
    <div class="card-image">
      <img 
        v-if="!imageError"
        :src="site.image" 
        :alt="site.title" 
        loading="lazy"
        @error="handleImageError"
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

const handleImageError = () => {
  imageError.value = true;
};
</script>

<style scoped>
.box {
  display: block;
  height: 180px;
  overflow: hidden;
  flex: 0 0 22%;
  border-radius: 5px;
  font-family: 'Fira Code', sans-serif;
  text-decoration: none;
  font-size: 12px;
  background: #ffffff;
  color: rgb(65, 65, 65);
  flex: 0 0 250px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}
.card-image {
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box:hover {
  text-decoration: none;
}
.box:hover img {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}
.card-image img {
  display: block;
  height: auto;
  width: auto;
  max-width: 70%;
  max-height: 100%;
  transform: scale(1);
}
.card-action span {
  display: block;
  text-align: center;
}
.image-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
}
</style>