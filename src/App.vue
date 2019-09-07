<template>
  <div id="app">
    <div class="sidebar">
      <character-list />
    </div>
    <div class="main">
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<script>
import CharacterList from './views/CharacterList'
export default {
  components: {
    CharacterList
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-columns: 15rem auto;
  grid-template-rows: auto;
  grid-template-areas: "sidebar main";
  

  .sidebar {
    height: 100vh;
    grid-area: sidebar;
  }

  .main {
    grid-area: main;
  }
}
</style>
