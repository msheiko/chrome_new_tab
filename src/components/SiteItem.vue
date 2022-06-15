<template>
  <a class="box" :href="site.url">
    <div class="card-image">
      <img :src="site.image" alt="" />
    </div>
    <div class="card-action">
      <span href="#">{{ site.title }}</span>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    site: Object,
  },
  mounted(){
  }
};
</script>

<style scoped>
.box {
  display: block;
  height: 180px;
  overflow: hidden;
  flex: 0 0 22%;
}
.card-image{
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box:hover img{
  transform: scale(1.1);
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