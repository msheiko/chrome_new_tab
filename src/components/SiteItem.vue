<template>
  <a class="box" :href="site.url">
    <div class="card-image">
      <img :src="site.image" alt="" />
    </div>
    <div class="card-action">
      <span>{{ site.title }}</span>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    site: Object,
  }
};
</script>

<style scoped>
.box {
  display: block;
  height: 180px;
  overflow: hidden;
  flex: 0 0 22%;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}
.card-image{
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box:hover{
  text-decoration: none;
}
.box:hover img{
  transform: scale(1.05);
  transition: transform 0.3s ease;
}
.card-image img{
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
  text-decoration: none;
  text-transform: uppercase;
}
</style>