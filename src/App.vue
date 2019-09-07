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
$argon-blue: #5e72e4;

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
  
  label {
    position: relative;

    display: block;
    font-size: 2rem;

    .label {
      position: absolute;
      top: 0;
      z-index: 1;
      font-size: 1.25rem;

      color: #888;
    }

    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      background-position: right 75%;
      background-repeat: no-repeat;
      background-image: url("./assets/dropdownArrow.svg");
      padding-right: 1.5rem;

      cursor: pointer;

      option {
        font-size: 1rem;
      }
    }

    input,
    select {
      width: 100%;
      padding-top: 1.25rem;

      background-color: white;

      border: 0;
      border-radius: 0;
      border-bottom: 2px solid black;

      margin-bottom: 1rem;

      &:focus {
        outline: none;
        border-color: $argon-blue;
      }
    }
  }
}
</style>
