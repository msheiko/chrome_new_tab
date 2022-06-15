<template>
  <header>
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <template v-for="bookmark in bookmarks" :key="bookmark.id">
            <div
              v-if="bookmark.children"
              class="navbar-item has-dropdown is-hoverable"
            >
              <a class="navbar-link"> {{ shortTitle(bookmark.title) }} </a>
              <div class="navbar-dropdown">
                <template  v-for="item in bookmark.children" :key="item.id">
                  <a class="navbar-item" :href="item.url"> {{item.title}} </a>
                </template>
              </div>
            </div>
            <a v-else class="navbar-item" :href="bookmark.url"> {{ shortTitle(bookmark.title) }} </a>
          </template>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <Toggle @change="changeMode" v-model="labales.value" v-bind="labales"></Toggle>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import Toggle from "@vueform/toggle";
import "@vueform/toggle/themes/default.css";

export default {
  components: { Toggle },
  data: () => ({
    labales: {
      onLabel: "Home",
      offLabel: "Work",
      value: localStorage.getItem('mode') === 'true',
    },
    homeBookmarks: [],
    workBookmarks: [],
  }),
  computed:{
    bookmarks(){
        return this.labales.value ? this.homeBookmarks : this.workBookmarks;
    }
  },
  methods: {
    changeMode(value){
      localStorage.setItem('mode', value);
      this.$emit('toggle-mode', value);
    },
    shortTitle(value){
        return value.length > 15 ? value.slice(0, 10) + '...' : value;
    }
  },
  mounted() {
    // eslint-disable-next-line
    chrome.bookmarks.getTree().then((data) => {
      const bookmarks = data.shift().children;
      this.homeBookmarks = bookmarks[0].children;
      this.workBookmarks = bookmarks[1].children;
      console.log(this.workBookmarks, this.homeBookmarks);
    });
  },
};
</script>

<style>
</style>