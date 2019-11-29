<template>
  <div id="app" :class="themeClass">
    <div class="sidebar">
      <character-list />
    </div>
    <div class="main">
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<script>
import { remote } from "electron";
import CharacterList from "./views/CharacterList";

export default {
  components: {
    CharacterList,
  },
  data() {
    return { themeClass: "dark" };
  },
  methods: {
    updateTheme() {
      const useDark = remote.nativeTheme.shouldUseDarkColors;
      this.themeClass = useDark ? "dark" : "light";
    },
  },
  created() {
    remote.nativeTheme.on("updated", this.updateTheme);
  },
  mounted() {
    this.updateTheme();
  },
};
</script>

<style lang="scss">
$argon-blue: #5e72e4;

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

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

  // Global styles

  h1 {
    margin: 0;
  }

  label:not(.inline) {
    position: relative;

    display: block;
    font-size: 2rem;

    .label {
      position: absolute;
      top: 0;
      z-index: 1;
      font-size: 1.25rem;

      color: var(--text-secondary);
    }

    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      background-position: right 75%;
      background-repeat: no-repeat;
      background-image: url("./assets/dropdownArrow.svg");
      padding-right: 1.5rem;

      color: var(--text-primary);

      cursor: pointer;

      option {
        font-size: 1rem;
      }
    }

    input,
    select {
      width: 100%;
      padding-top: 1.25rem;

      background-color: var(--background-primary);

      border: 0;
      border-radius: 0;
      border-bottom: 2px solid var(--color-mid-1);

      margin-bottom: 1rem;

      &:focus {
        outline: none;
        border-color: $argon-blue;
      }
    }
  }

  table {
    &,
    th,
    td {
      border: 1px solid var(--table-primary);
    }

    th,
    td {
      padding: 0.25rem 0.5rem;
    }
  }
}
</style>
