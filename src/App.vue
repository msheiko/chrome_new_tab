<template>
  <Toggle
    class="toggle-button"
    @change="changeMode"
    v-model="lables.value"
    v-bind="lables"
  />
  <main>
    <site-item v-for="(site, index) in sites" :site="site" :key="index" />
  </main>
</template>

<script>
import SiteItem from "./SiteItem";
import "@vueform/toggle/themes/default.css";
import Toggle from "@vueform/toggle";
import json from "./data.json";

export default {
  name: "App",
  components: { SiteItem, Toggle },
  data: () => ({
    mode: localStorage.getItem("mode") === "true",
    allSites: json,
    lables: {
      onLabel: "Home",
      offLabel: "Work",
      value: localStorage.getItem("mode") === "true",
    },
  }),
  methods: {
    changeMode(value) {
      localStorage.setItem("mode", value);
      this.mode = value;
    },
  },
  computed: {
    sites() {
      return this.allSites.filter((s) => s.home === this.mode);
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  background: rgb(167, 167, 167);
}
main {
  padding-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 30px;
  column-gap: 50px;
}
.toggle-button {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
