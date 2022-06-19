<template>
  <nav-bar @toggle-mode="changeMode"/>
  <main class="container is-dark">
    <site-item v-for="(site, index) in sites" :site="site" :key="index" />
  </main>
</template>

<script>
import SiteItem from "@/components/SiteItem";
import NavBar from "@/components/NavBar";
import "bulma/css/bulma.min.css";
export default {
  name: "App",
  components: { SiteItem, NavBar },
  data: () => ({
    mode: localStorage.getItem('mode') === 'true',
    allSites: [],
  }),
  methods:{
    changeMode(mode){
        this.mode = mode;
    },
  },
  computed:{
    sites(){
        return this.allSites.filter( s=> s.home === this.mode);
    }
  },
  async mounted() {
    // eslint-disable-next-line
    const url = chrome.runtime.getURL("data.json");
    const response = await fetch(url);
    const sites = await response.json()
    this.allSites = sites;
    
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  height: 100vh;
}
main {
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 10px;
}
</style>
