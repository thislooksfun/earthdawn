<template>
  <div class="character-list">
    Character List
    
    <ol>
      <li v-for="(char, uuid) in characters" :key="uuid">
        <router-link :to="`/character/${uuid}`" :class="{ selected: $route.params.uuid == uuid }"> {{ char.name }} </router-link>
      </li>
      <li>
        <router-link :to="`/`"> Home </router-link>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      characters: this.$store.state.Characters.characters
    }
  }
}
</script>

<style>
.selected {
  color: red;
}
</style>